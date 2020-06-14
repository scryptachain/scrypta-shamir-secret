const secrets = require('secrets.js-grempe')
const ScryptaCore = require('@scrypta/core')
const scrypta = new ScryptaCore
const fs = require('fs')

async function backup(){
    let address = await scrypta.createAddress('123456', false)
    console.log(address)
    var pw = address.prv
    console.log('CREATED NEW ADDRESS ' + address.pub)
    var pwHex = secrets.str2hex(pw)
    var dir = './backups'
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    var shares = secrets.share(pwHex, 10, 5)

    for(let x in shares){
        let share = shares[x]
        if (!fs.existsSync(dir + '/' + address.pub)){
            fs.mkdirSync(dir + '/' + address.pub)
        }
        fs.writeFileSync(dir + '/' + address.pub + '/shamir_backup_' + x, share)
    }
}

backup()