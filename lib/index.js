const secrets = require('secrets.js-grempe')
const ScryptaCore = require('@scrypta/core')
const scrypta = new ScryptaCore
const fs = require('fs')
const { UV_FS_O_FILEMAP } = require('constants')

var create = async function create(shares = 10, threshold = 5, password = ''){
    let pwd = new Date().getTime().toString()
    if (password !== '') {
        pwd = password
    }
    let address = await scrypta.createAddress(pwd, false)
    let { key, prv, pub } = address
    console.log('CREATED NEW BACKUP FOR ADDRESS ' + pub + ' DIVIDED IN ' + shares + ' SHARES AND THRESHOLD ' + threshold)
    let wallet = JSON.stringify({key, prv})
    if (password !== ''){
        wallet = await scrypta.cryptData(wallet, password)
        console.info('ENCRYPTED WITH PASSPHRASE ' + password)
    }
    let pwHex = secrets.str2hex(wallet)
    let dir = './backups'
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    let shareList = secrets.share(pwHex, shares, threshold)
    let dirPath = dir + '/' + pub

    shareList.forEach((share, index) => {
        if (!fs.existsSync(dirPath)){
            fs.mkdirSync(dirPath)
        }
        fs.writeFileSync(dirPath + '/shamir_backup_' + index, share)
    })
}

var restore = async function restore(path, password = ''){
    console.log('RESTORING FROM ' + path)
    fs.readdir(path, async (err, files) => {
        let shares = files.map((file) => {
            if (file.indexOf('shamir_backup') > -1) {
                return fs.readFileSync(path + '/' + file, { encoding: 'utf8' })
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