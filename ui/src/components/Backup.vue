<template>
  <div class="hello">
    <div v-if="results.length === 0">
      <h3>Tune backup's settings</h3>
      <div class="columns">
        <div class="column">
          <b-field label="Shares">
            <b-numberinput v-model="shares" min="3" max="100"></b-numberinput>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Threshold">
            <b-numberinput v-model="threshold" min="2" :max="shares"></b-numberinput>
          </b-field>
        </div>
      </div>
      <h3>Choose what to backup</h3>
      <div v-if="!isWallet">
        <b-button v-if="wallet" type="is-primary" v-on:click="backupWallet" expanded size="is-large">BACKUP WALLET</b-button>
        <div v-if="wallet" style="position:relative">
          <hr>
          <div style="background:#fff; padding:5px; width:30px; height:35px; z-index:19; position:absolute; left:50%; margin-left:-10px; top:-16px;">or</div>
        </div>
        <b-field label="Write a secret to backup">
          <b-input type="password" v-model="dataToBackup"></b-input>
        </b-field>
      </div>
      <div v-if="isWallet">You're creating a backup for your address <b>{{ address }}</b></div>
      <hr>
      <h3>Add extra security passphrase</h3>
      <b-field label="Write a password to encrypt the data (optional)">
        <b-input type="password" v-model="encryptPassword"></b-input>
      </b-field>
      <b-button v-on:click="backupData" type="is-primary" expanded size="is-large">CREATE BACKUP</b-button>
    </div>
    <div v-if="results.length > 0">
      <div class="columns">
        <div class="column">
          <b-button v-on:click="downloadPdf" type="is-primary" expanded size="is-large">DOWNLOAD PDF</b-button>
        </div>
        <div class="column">
          <b-button v-on:click="downloadTxt" type="is-primary" expanded size="is-large">DOWNLOAD TXT</b-button>
        </div>
      </div>
      <div v-for="(result, index) in results" v-bind:key="result">
        <div class="card" style="width:50%; float:left; display:inline-block;">
          <div class="card-content">
            <p class="title" style="margin-bottom:0px;">
              Share #{{index}}
            </p>
            <qrcode :value="result" :options="{ width: 350 }"></qrcode>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  h3{ font-weight:bold; font-size:18px; margin-bottom:20px;}
</style>

<script>
  let ScryptaCore = require('@scrypta/core')
  const secrets = window.secrets
  const PDFDocument = window.PDFDocument
  var QRCode = require('qrcode')
  const blobStream = require('blob-stream')

  export default {
    name: 'Backup',
    data(){ 
      return {
        scrypta: new ScryptaCore(true),
        address: '',
        wallet: '',
        isWallet: false,
        encryptPassword: '',
        dataToBackup: '',
        shares: 10, 
        threshold: 5,
        results: []
      }
    },
    async mounted() {
      const app = this;
      app.wallet = await app.scrypta.importBrowserSID();
      app.wallet = await app.scrypta.returnDefaultIdentity();
      if (app.wallet.length > 0) {
        let SIDS = app.wallet.split(":");
        app.address = SIDS[0];
        let identity = await app.scrypta.returnIdentity(app.address);
        app.wallet = identity
        app.isLogging = false;
      } else {
        app.isLogging = false;
      }
    },
    methods: {
      async backupData(){
        const app = this
        if(app.dataToBackup !== ''){
          let data = app.dataToBackup
          if (app.encryptPassword !== ''){
              data = await app.scrypta.cryptData(data, app.encryptPassword)
          }
          let pwHex = secrets.str2hex(data)
          let shareList = secrets.share(pwHex, app.shares, app.threshold)
          app.results = shareList
          app.encryptPassword = ''
          app.dataToBackup = ''
        }else{
          app.$buefy.toast.open({
            message: "Please write something first.",
            type: "is-danger"
          })
        }
      },
      backupWallet(){
        const app = this
        app.$buefy.dialog.prompt({
          message: `Enter wallet password`,
          inputAttrs: {
            type: "password"
          },
          trapFocus: true,
          onConfirm: async password => {
            let key = await app.scrypta.readKey(password, app.wallet.wallet)
            if (key !== false) {
              app.isWallet = true
              app.dataToBackup = key.prv
            } else {
              app.$buefy.toast.open({
                message: "Wrong password!",
                type: "is-danger"
              });
            }
          }
        });
      },
      async downloadPdf(){
        const app = this
        const doc = new PDFDocument({ margin: 80 }).font('Courier')
        const stream = doc.pipe(blobStream())

        for(let x in app.results){
          let share = app.results[x]
          doc.fontSize(24)
          doc.text('Shamir Backup #' + x, { align: 'center' })
          doc.fontSize(14)
          doc.text("\n\n\n\nThis is the share #" + x + " of a secret. If you've this share please be sure to keep it in a safe place. You can restore it by reading the following QR Code.", { align: 'justify' })
          let shareQR = await QRCode.toDataURL(share, { errorCorrectionLevel: 'M', margin: 1})
          doc.image(shareQR, 60, 240, {width: 495})
          if(x < (app.results.length -1 )){
            doc.addPage()
          }
        }
        doc.end()
        stream.on('finish', function() {
          const url = stream.toBlobURL('application/pdf');
          window.location = url;
        })
      },
      downloadTxt(){
        const app = this
        let text = ''
        for(let x in app.results){
          let share = app.results[x]
          text += "\n" + share
        }
        var data = new Blob([text], {type: 'text/plain'})
        let url = window.URL.createObjectURL(data)
        var a = document.createElement("a")
        a.href = url
        a.setAttribute("download", 'scrypta_shamir_backup.txt')
        a.click()
      }
    }
  }
</script>