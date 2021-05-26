import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';
import {fileExists} from '@form8ion/core';

Then('the expected files are generated', async function () {
  assert.isTrue(await fileExists(`${process.cwd()}/slides.md`));
});

Then('the scripts are defined', async function () {
  assert.deepEqual(
    this.results.scripts,
    {
      dev: 'slidev',
      build: 'slidev build',
      export: 'slidev export'
    }
  );
});
