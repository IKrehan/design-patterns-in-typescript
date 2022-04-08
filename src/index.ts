import inquirer from 'inquirer';
import {readdirSync} from 'fs';

const patterns = readdirSync('src/patterns')
  .filter((dir) => !dir.includes('.ts'))
  .map((dir) => ({
      name: dir[0].toUpperCase() + dir.slice(1).toLowerCase(),
      value: require(`./patterns/${dir}`).default,
  }))

inquirer
.prompt({
  type: 'list',
  name: 'pattern',
  message: 'Choose one of the following patterns to run.',
  choices: patterns
})
.then((result) => {
  console.log('Running...\n')
  result.pattern()
})
.catch((err: any) => {
  if (err.isTtyError) {
    console.error("Prompt couldn't be rendered in the current environment")
  } else {
    console.error(err)
  }
});
