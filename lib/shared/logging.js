/**
 * @fileoverview Handle logging for node-create
 * @author csokolove
 */

/**
 * Cover for console.log
 * @param  {...any} args The elements to log.
 * @returns {void}
 */
export function info(...args) {
    console.log(...args);
}

/**
 * Cover for console.error
 * @param  {...any} args The elements to log.
 * @returns {void}
 */
export function error(...args) {
    console.error(...args);
}