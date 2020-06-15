const secrets = require('secrets.js-grempe')
const ScryptaCore = require('@scrypta/core')
const scrypta = new ScryptaCore
const fs = require('fs')
const { UV_FS_O_FILEMAP } = require('constants')

var create = async function create(shares = 10, threshold = 5, password = ''){
    let pwd = new Date().getTime().toString()
    if(password !== ''){
        pwd = password
    }
    let address = await scrypta.createAddress(pwd, false)
    console.log('CREATED NEW BACKUP FOR ADDRESS ' + address.pub + ' DIVIDED IN ' + shares + ' SHARES AND THRESHOLD ' + threshold)

    let wallet = JSON.stringify({key: address.key, prv: address.prv})
    if(password !== ''){
        wallet = await scrypta.cryptData(wallet, password)
        console.info('ENCRYPTED WITH PASSPHRASE ' + password)
    }
    var pwHex = secrets.str2hex(wallet)
    var dir = './backups'
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    var shares = secrets.share(pwHex, shares, threshold)

    for(let x in shares){
        let share = shares[x]
        if (!fs.existsSync(dir + '/' + address.pub)){
            fs.mkdirSync(dir + '/' + address.pub)
        }
        fs.writeFileSync(dir + '/' + address.pub + '/shamir_backup_' + x, share)
    }
}

var restore = async function restore(path, password = ''){
    console.log('RESTORING FROM ' + path)
    fs.readdir(path, async (err, files) => {
        let shares = []
        files.forEach(file => {
            if(file.indexOf('shamir_backup') !== -1){
                let share = fs.readFileSync(path + '/' + file, { encoding: 'utf8' })
                shares.push(share)
            }
        })
        let restoredhex = secrets.combine(shares)
        let restored = secrets.hex2str(restoredhex)
        if(password !== ''){
            console.log('DECRYPTING DATA WITH PASSWORD')
            restored = await scrypta.decryptData(restored, password)
            if(restored !== false){
                restored = JSON.parse(restored)
                console.log(restored)
            }else{
                console.error('PASSWORD IS INVALID!')
            }
        }else{
            console.log(restored)
        }
    })
      
}

exports.create = create
exports.restore = restore