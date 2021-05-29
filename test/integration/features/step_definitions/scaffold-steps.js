import {promises as fs} from 'fs';
import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';

Then('the expected files are generated', async function () {
  assert.equal(
    await fs.readFile(`${process.cwd()}/slides.md`, 'utf-8'),
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
});

Then('the scripts are defined', async function () {
  assert.include(
    this.results.scripts,
    {
      dev: 'slidev',
      build: 'slidev build',
      export: 'slidev export'
    }
  );
});

Then('the framework dependencies are installed', async function () {
  assert.deepEqual(this.results.dependencies, ['@slidev/cli', '@slidev/theme-default']);
});
