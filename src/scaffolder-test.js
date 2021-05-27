import {promises as fs} from 'fs';
import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';
import scaffold from './scaffolder';

suite('scaffolder', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(fs, 'writeFile');
  });

  teardown(() => sandbox.restore());

  test('that the presentation is scaffolded', async () => {
    const projectRoot = any.string();

    const {dependencies, scripts} = await scaffold({projectRoot});

    assert.calledWith(fs.writeFile, `${projectRoot}/slides.md`, '');
    assert.deepEqual(dependencies, ['@slidev/cli', '@slidev/theme-default']);
    assert.deepEqual(
      scripts,
      {
        dev: 'slidev',
        build: 'slidev build',
        export: 'slidev export'
      }
    );
  });
});
