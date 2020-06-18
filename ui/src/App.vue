<template>
  <div id="app">
    <offline @detected-condition="handleConnectivityChange"></offline>
    <div v-if="isOnline" style="padding:40vh 20px;">
      <img src="/logo.png" style="width:50px;">
      <h1>Scrypta Shamir Backup</h1>
      <p>It seems you're online, please turn off your connection<br>or put the device in airplane mode to continue.</p>
      <b-icon style="opacity:0" icon="home" size="is-medium"></b-icon>
    </div>
    <div v-if="!isOnline">
      <b-navbar>
        <template slot="brand">
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
            <img src="/logo.png" />
          </b-navbar-item>
        </template>
        <template slot="start">
          <b-navbar-item href="/#/">Create</b-navbar-item>
          <b-navbar-item href="/#/recover">Recover</b-navbar-item>
        </template>
      </b-navbar>
      <router-view />
      <div style="margin-top:30px; width:100%; overflow:hidden"></div>
      <hr />Scrypta Shamir Backup
      <a
        href="https://github.com/scryptachain/scrypta-shamir-secret"
        target="_blank"
      >open-source</a> project by
      <a href="https://scrypta.foundation" target="_blank">Scrypta Foundation</a>.
      <br />
      <br />
    </div>
  </div>
</template>

<script>
let ScryptaCore = require("@scrypta/core");
import offline from 'v-offline';

export default {
  components: {
    offline
  },
  data() {
    return {
      scrypta: new ScryptaCore(true),
      address: "",
      wallet: "",
      isOnline: true,
      isLogging: true,
      file: [],
      isCreating: false,
      backup: false,
      isUpdating: false,
      showCreateModal: false,
      password: "",
      passwordrepeat: ""
    };
  },
  async mounted() {
    const app = this;
    app.wallet = await app.scrypta.importBrowserSID();
    app.wallet = await app.scrypta.returnDefaultIdentity();
    if (app.wallet.length > 0) {
      let SIDS = app.wallet.split(":");
      app.address = SIDS[0];
      let identity = await app.scrypta.returnIdentity(app.address);
      app.wallet = identity;
      let check_backup = localStorage.getItem('sid_backup')
      if(check_backup !== null && check_backup !== undefined && check_backup === app.address){
        app.backup = true
      }
      app.isLogging = false;
    } else {
      app.isLogging = false;
    }
  },
  methods: {
    loadWalletFromFile() {
      const app = this;
      const file = app.file;
      const reader = new FileReader();
      reader.onload = function() {
        var dataKey = reader.result;

        app.$buefy.dialog.prompt({
          message: `Enter wallet password`,
          inputAttrs: {
            type: "password"
          },
          trapFocus: true,
          onConfirm: async password => {
            let key = await app.scrypta.readKey(password, dataKey);
            if (key !== false) {
              app.scrypta.importPrivateKey(key.prv, password);
              localStorage.setItem("SID", dataKey)
              let exp = dataKey.split(':')
              localStorage.setItem("sid_backup", exp[0])
              location.reload();
            } else {
              app.$buefy.toast.open({
                message: "Wrong password!",
                type: "is-danger"
              });
            }
          }
        });
      };
      reader.readAsText(file);
    },
    showCreate() {
      const app = this;
      app.showCreateModal = true;
    },
    logout() {
      localStorage.setItem("SID", "");
      location.reload();
    },
    async createUser() {
      const app = this;
      if (app.password !== "") {
        if (app.passwordrepeat === app.password) {
          app.isCreating = true;
          setTimeout(async function() {
            let id = await app.scrypta.createAddress(app.password, true);
            let identity = await app.scrypta.returnIdentity(id.pub);
            app.address = id.pub;
            app.wallet = identity;
            localStorage.setItem("SID", id.walletstore);
            app.showCreateModal = false;
            app.password = "";
            app.passwordrepeat = "";
            let tx = await app.scrypta.post("/init", {
              address: id.pub,
              airdrop: true
            });
            if (tx.airdrop_tx === false) {
              app.$buefy.toast.open({
                message: "Sorry, airdrop was not successful!",
                type: "is-danger"
              });
            }
            app.isCreating = false;
          }, 500);
        } else {
          app.$buefy.toast.open({
            message: "Passwords doesn't matches.",
            type: "is-danger"
          });
        }
      } else {
        app.$buefy.toast.open({
          message: "Write a password first!",
          type: "is-danger"
        });
      }
    },
    downloadBackup(){
      const app = this
      app.$buefy.dialog.prompt({
        message: `Enter wallet password`,
        inputAttrs: {
          type: "password"
        },
        trapFocus: true,
        onConfirm: async password => {
          let SID = localStorage.getItem('SID')
          let key = await app.scrypta.readKey(password, SID);
          if (key !== false) {
            var a = document.getElementById("downloadid");
            app.backup = true
            localStorage.setItem('sid_backup', app.address)
            var file = new Blob(
              [SID],
              { type: "sid" }
            );
            a.href = URL.createObjectURL(file);
            a.download = app.address + ".sid";
            var clickEvent = new MouseEvent("click", {
              view: window,
              bubbles: true,
              cancelable: false
            });
            a.dispatchEvent(clickEvent);
          }else{
            app.$buefy.toast.open({
              message: "Wrong password!",
              type: "is-danger"
            });
          }
        }
      })
    },
    handleConnectivityChange(status) {
      this.isOnline = status
    }
  }
};
</script>

<style>
  #app {
    font-family: "Sen";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>