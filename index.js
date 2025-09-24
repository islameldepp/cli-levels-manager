#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'node:fs';
import inquirer from 'inquirer';
const program = new Command();

const questions = [
  { type: 'input', name: 'levels', message: 'whats your level?' },
  { type: 'input', name: 'price', message: 'whats your price?' },
];
const filepath = './levels.json';

program
  .name('eldepp-comeback')
  .description('CLI to more reacap levels')
  .version('1.0.0');

program
  .command('add')
  .alias('a')
  .description('Add a level')
  .action(() => {
    inquirer.prompt(questions).then((answers) => {
      console.log(answers);
      if (fs.existsSync(filepath)) {
        fs.readFile(filepath, 'utf8', (err, fileContent) => {
          if (err) {
            console.log(err);
            process.exit();
          }
          console.log(fileContent);
          const fileContentAsjson = JSON.parse(fileContent);
          fileContentAsjson.push(answers);
          fs.writeFile(
            filepath,
            JSON.stringify(fileContentAsjson),
            'utf8',
            () => {
              console.log('add levels done');
            }
          );
        });
      } else {
        fs.writeFile(filepath, JSON.stringify([answers]), 'utf8', () => {
          console.log('add levels done');
        });
      }
    });
  });

program
  .command('list')
  .alias('l')
  .description('list all levels')
  .action(() => {
    fs.readFile(filepath, 'utf8', (err, contect) => {
      if (err) {
        console.log(err);
        process.exit();
      } else {
        console.table(JSON.parse(contect));
      }
    });
  });

program.parse(process.argv);
