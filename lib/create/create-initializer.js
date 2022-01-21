/**
 * @fileoverview Create initialization wizard.
 * @author csokolove
 */

import path from 'path';
import fs from 'fs';
import enquirer from 'enquirer';
import semver from 'semver';
import { info } from '../shared/logging.js';
import * as CreateFile from './create-file.js';
// import * as npmUtils from 'npm-utils.js';
async function writeFile() {
    const response = await promptUser();
    projectStructure(response.purpose, response.name, response.description, response.license)
    await fs.writeFileSync('package-test.json', JSON.stringify(response))
}

/**
 * @todo Import all licenses, and choose based on index name
 */
import { } from '../shared/licenses';
async function projectStructure(expr, name, desc, lic, author) {
    switch(expr) {
        case 'library':
            await fs.writeFileSync('README-test.md', `# ${name}\n${desc}\n\n## Usage\nPrerequisites: [Node.JS](https://nodejs.org)\n\n\n\n## License\n${lic} © [${author}](https://github.com/csokolove)`);
            await fs.writeFileSync('LICENSE-test')
    }
}

async function promptUser() {
    return enquirer.prompt([
        {
            type: 'select',
            name: 'purpose',
            message: 'What is the purpose of this project?',

            initial: 1,
            choices: [
                { message: 'Private with no distro', name: 'private' },
                { message: 'Public with distro', name: 'public' },
                { message: 'For a library/package', name: 'library' }
            ]
        },
        {
            type: 'input',
            name: 'name',
            message: `package name: (${path.basename(process.cwd())}) `
        },
        {
            type: 'input',
            name: 'version',
            message: `version: (1.0.0) `
        },
        {
            type: 'input',
            name: 'description',
            message: `description: `
        },
        {
           type: 'input',
           name: 'git_repository',
           message: `git repository: `
        },
        {
            type: 'input',
            name: 'author',
            message: `author: `
        },
        {
            type: 'select',
            name: 'license',
            message: `license: `,
            initial: 1,
            choices: [
                { message: 'The Unlicense', name: 'unlicense' },
                { message: 'MIT License', name: 'mit' },
                { message: 'GNU GPLv3', name: 'gnu_gplv3' },
                { message: 'BSD 3-Clause "New" or "Revised" License', name: 'bsd_3_clause_new'},
                { message: 'Apache License 2.0', name: 'apache_2_0' },
            ]
        }
    ])
}

function nodeCreate() {
    return writeFile()
}

export {
    nodeCreate
};