import {promises as fs} from 'fs';

export default async function ({projectRoot}) {
  await fs.writeFile(`${projectRoot}/slides.md`, '');

  return {
    dependencies: ['@slidev/cli', '@slidev/theme-default'],
    scripts: {
      dev: 'slidev',
      build: 'slidev build',
      export: 'slidev export'
    }
  };
}
