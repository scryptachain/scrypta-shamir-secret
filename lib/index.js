const secrets = require('secrets.js-grempe')
const ScryptaCore = require('@scrypta/core')
const scrypta = new ScryptaCore
const fs = require('fs')
const crypto = require('crypto')
const PDFDocument = require('pdfkit')
var QRCode = require('qrcode')

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

    shareList.forEach(async (share, index) => {
        if (!fs.existsSync(dirPath)){
            fs.mkdirSync(dirPath)
        }
        fs.writeFileSync(dirPath + '/shamir_backup_' + index, share)
        await createPdf(dirPath + '/shamir_backup_' + index, share, index)
    })
}

var secure = async function secure(data, shares = 10, threshold = 5, password = ''){
    console.log('SECURING RECEIVED DATA `' + data + '` DIVIDED IN ' + shares + ' SHARES AND THRESHOLD ' + threshold)
    if (password !== ''){
        data = await scrypta.cryptData(data, password)
        console.info('ENCRYPTED WITH PASSPHRASE ' + password)
    }

    let pwHex = secrets.str2hex(data)
    let dir = './backups'
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    let hash = crypto.createHash("sha256").update(data).digest("hex")
    console.info('HASH OF THE DATA IS ' + hash)
    
    let shareList = secrets.share(pwHex, shares, threshold)
    let dirPath = dir + '/' + hash

    shareList.forEach(async (share, index) => {
        if (!fs.existsSync(dirPath)){
            fs.mkdirSync(dirPath)
        }
        fs.writeFileSync(dirPath + '/shamir_backup_' + index, share)
        await createPdf(dirPath + '/shamir_backup_' + index, share, index)
    })
}

var restore = async function restore(path, password = ''){
    console.log('RESTORING FROM ' + path)
    fs.readdir(path, async (err, files) => {
        let shares = files.map((file) => {
            if (file.indexOf('shamir_backup') > -1 && file.indexOf('.pdf') === -1) {
                return fs.readFileSync(path + '/' + file, { encoding: 'utf8' })
            }
        })
        shares = shares.filter(function( element ) {
            return element !== undefined;
        })
        let restoredhex = secrets.combine(shares)
        let restored = secrets.hex2str(restoredhex)
        if(password !== ''){
            console.log('DECRYPTING DATA WITH PASSWORD')
            restored = await scrypta.decryptData(restored, password)
            if(restored !== false){
                try{
                    restored = JSON.parse(restored)
                    console.log(restored)
                }catch(e){
                    console.log(restored)
                }
            }else{
                console.error('PASSWORD IS INVALID!')
            }
        }else{
            console.log(restored)
        }
    })
      
}

function createPdf(dirPath, data, share){
    return new Promise(response => {
        const doc = new PDFDocument({ margin: 80 }).font('Courier')
        doc.pipe(fs.createWriteStream(dirPath + '.pdf'))
        doc.fontSize(24)
        doc.text('Shamir Backup #' + share, { align: 'center' })
        doc.fontSize(14)
        doc.text("\n\n\n\nThis is the share #" + share + " of a secret. If you've this share please be sure to keep it in a safe place. You can restore it by reading the following QR Code.", { align: 'justify' })
        QRCode.toDataURL(data, { errorCorrectionLevel: 'M', margin: 1}, function (err, shareQR) {
            doc.image(shareQR, 60, 240, {width: 495})
            doc.end()
            response(true)
        })
    })
}

exports.create = create
exports.restore = restore
exports.secure = secure