#!/usr/bin/env node
const chalk = require('chalk')
const figlet = require('figlet')
var ScryptaSSS = require('../lib/index.js')
var args = process.argv.splice(process.execArgv.length + 2)
var command = args[0];
const console = require('better-console')
const inquirer = require('../lib/inquirer.js')

async function init(){
    console.log(
        chalk.yellow(
            figlet.textSync('Scrypta Shamir', { horizontalLayout: 'full' })
        )
    )

    if(command === 'create'){
        let params = await inquirer.askCreateParams();
        let { shares, threshold, password } = params;
        ScryptaSSS.create(shares, threshold, password)
    }else if(command === 'secure'){
        const params = await inquirer.askSecureData();
        let { data, shares, threshold, password } = params;
        ScryptaSSS.secure(data, shares, threshold, password)
    }else if(command === 'restore'){
        let path = './'
        if(args[1].indexOf('--path=') !== -1){
            path = args[1].replace('--path=','')
        }
        let restorePassword = ''
        if(args[2] !== undefined && args[2].indexOf('--password=') !== -1){
            restorePassword = args[2].replace('--password=','')
        }
        ScryptaSSS.restore(path, restorePassword)
    }
}

init()