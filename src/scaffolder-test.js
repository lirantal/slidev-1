import {promises as fs} from 'fs';
import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';
import * as testingScaffolder from './testing-scaffolder';
import scaffold from './scaffolder';

suite('scaffolder', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(fs, 'writeFile');
    sandbox.stub(testingScaffolder, 'default');
  });

  teardown(() => sandbox.restore());

  test('that the presentation is scaffolded', async () => {
    const projectRoot = any.string();
    const testingDevDependencies = any.listOf(any.word);
    const testingScripts = any.simpleObject();
    testingScaffolder.default
      .withArgs({projectRoot})
      .resolves({devDependencies: testingDevDependencies, scripts: testingScripts});

    const {dependencies, devDependencies, scripts} = await scaffold({projectRoot});

    assert.calledWith(
      fs.writeFile,
      `${projectRoot}/slides.md`,
      `---
theme: default

# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://source.unsplash.com/collection/94734566/1920x1080

# apply any windi css classes to the current slide
class: 'text-center'

# https://sli.dev/custom/highlighters.html
highlighter: prism

# some information about the slides, markdown enabled
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
---`
    );
    assert.deepEqual(dependencies, ['@slidev/cli', '@slidev/theme-default']);
    assert.deepEqual(devDependencies, testingDevDependencies);
    assert.deepEqual(
      scripts,
      {
        dev: 'slidev',
        build: 'slidev build',
        export: 'slidev export',
        ...testingScripts
      }
    );
  });
});
