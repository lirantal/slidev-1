import {promises as fs} from 'fs';
import deepmerge from 'deepmerge';
import scaffoldTesting from './testing-scaffolder';

export default async function ({projectRoot}) {
  const [testingResults] = await Promise.all([
    scaffoldTesting({projectRoot}),
    fs.writeFile(
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
    )
  ]);

  return deepmerge(
    {
      dependencies: ['@slidev/cli', '@slidev/theme-default'],
      scripts: {
        dev: 'slidev',
        build: 'slidev build',
        export: 'slidev export'
      }
    },
    testingResults
  );
}
