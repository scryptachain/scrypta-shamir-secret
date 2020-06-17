<template>
  <div class="hello">
    <b-button v-on:click="addShare" type="is-primary">ADD SHARE</b-button><hr>
    <div style="position:relative" v-for="(share, index) in shares" v-bind:key="index">
      <b-field :label="'Share #' + index">
        <b-input v-model="shares[index]"></b-input>
      </b-field>
      <b-button v-on:click="removeShare(index)" type="is-primary" size="is-small" style="position:absolute;top:35px;right:5px"><b-icon icon="backspace" size="is-small"></b-icon></b-button>
    </div>
    <b-field label="Write a password to decrypt the data (optional)">
      <b-input type="password" v-model="decryptPassword"></b-input>
    </b-field>
    <b-button v-on:click="recoverData" type="is-primary" expanded size="is-large">RECOVER SECRET</b-button>
    <pre v-if="result">{{ result }}</pre>
  </div>
</template>


<script>
  let ScryptaCore = require('@scrypta/core')
  const secrets = window.secrets

  export default {
    name: 'Backup',
    data(){ 
      return {
        scrypta: new ScryptaCore(true),
        address: '',
        wallet: '',
        isWriting: false,
        decryptPassword: '',
        result: '',
        shares: ['']
      }
    },
    methods: {
      async recoverData(){
        const app = this
        let shares = []
        for(let x in app.shares){
          if(app.shares[x] !== ''){
            shares.push(app.shares[x])
          }
        }
        let recover = secrets.combine(shares)
        app.result = secrets.hex2str(recover)
        if (app.decryptPassword !== ''){
          recover = await app.scrypta.decryptData(app.result, app.decryptPassword)
          app.result = recover
        }
      },
      addShare(){
        this.shares.push('')
      },
      removeShare(index){
        const app = this
        let temp = []
        for(let x in app.shares){
          if(parseFloat(x) !== parseFloat(index)){
            temp.push(app.shares[x])
          }
        }
        app.shares = temp
      }
    }
  }
</script>