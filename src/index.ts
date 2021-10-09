import inquirer from 'inquirer';
import patterns from './patterns';

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
