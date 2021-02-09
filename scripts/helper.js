const { resolve } = require('path')
const { exec, test } = require('shelljs')

function getNpmBin(cwd) {
    const options = { silent: true }
    if (cwd) {
        options.cwd = cwd
    }

    return exec("npm bin", options)
        .toString()
        .trim()
}

/**
 * Execute command in in local node_modules directory
 * @param commandAndArgs command with arguments
 */
function asyncExec(commandAndArgs, options) {
    const [command, ...args] = commandAndArgs.split(" ")
    const cwd = options ? options.cwd : undefined
    const npmBin = resolve(getNpmBin(cwd), command)
    const realCommand = test("-e", npmBin) ? `${npmBin} ${args.join(" ")}` : commandAndArgs
    console.log(`> ${realCommand}`)
    return new Promise((resolve, reject) => {
        const cb = (code, stdout, stderr) => {
            if (code !== 0) {
                reject(stderr)
            } else {
                resolve(stdout)
            }
        }

        options ? exec(realCommand, options, cb) : exec(realCommand, cb);
    })
}

exports.asyncExec = asyncExec;