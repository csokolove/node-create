/**
 * @fileoverview Utility for executing NPM commands.
 * @author csokolove
 */

import fs from 'fs';

import path from 'path';
import * as log from '../shared/logging.js';

/**
 * Find the closest package.json file, starting at process.cwd (by default),
 * and working up to root.
 * @param {string} [startDir=process.cwd()] Starting directory
 * @returns {string} Absolute path to closest package.json file
 */
 function findPackageJson(startDir) {
    let dir = path.resolve(startDir || process.cwd());

    do {
        const pkgFile = path.join(dir, "package.json");

        if (!fs.existsSync(pkgFile) || !fs.statSync(pkgFile).isFile()) {
            dir = path.join(dir, "..");
            continue;
        }
        return pkgFile;
    } while (dir !== path.resolve(dir, ".."));
    return null;
}