<template>
  <div id="app">
    <div v-if="isConnected">
      <!-- desktop section!-->
      <section
        class="section desksection"
        style="background-image: linear-gradient(to bottom, rgba(245, 246, 252, 0.3), rgba(117, 19, 93, 0.4)), url('main-bg.jpg'); width: auto; height: 100vh; background-repeat: no-repeat;
    background-size: cover; padding: 0px;"
      >
        <div class="columns is-vcentered">
          <div class="column is-4 is-offset-1 text-left" style="padding: 40vh 20px;">
            <img src="/shamir-logo.png" style="width: 50%;" />
            <h1 class="title is-1" style="color: white; padding-top: 40px;">Scrypta Shamir Backup</h1>
            <p style="font-size: 28px; color: white">
              <i>"sit back and relax with your secret."</i>
            </p>
          </div>
        </div>
      </section>
      <!-- desktop section!-->

      <!-- mobile section!-->
      <section
        class="section mobilesection"
        style="background-image: linear-gradient(to bottom, rgba(245, 246, 252, 0.3), rgba(117, 19, 93, 0.4)), url('main-bg.jpg'); width: 100%; height: 50vh; background-repeat: no-repeat;
    background-size: cover; padding: 0px;"
      >
        <div class="columns is-vcentered">
          <div class="column is-4 is-offset-1 text-center" style="padding: 5vh;  20px;">
            <img src="/shamir-logo.png" style="width: 50%;" />
            <h1 class="title is-1" style="color: white; padding-top: 40px;">Scrypta Shamir Backup</h1>
            <p style="font-size: 28px; color: white">
              <i>"sit back and relax with your secret."</i>
            </p>
          </div>
        </div>
      </section>
      <!-- mobile section!-->

      <div class="notification is-warning" id="turnoff" style="font-size: 22px;">
        It seems you're online, please turn off your connection
        <br />or put the device in
        <strong>airplane mode</strong> to continue. Wait a few seconds!
      </div>
      <section class="section" id="bghome">
        <div class="columns is-vcentered" style="padding-top:100px; justify-content: center;">
          <div class="column is-4 is-offset-1" style="text-align: left; padding-top: 60px;">
            <h1 style="font-size: 40px;">Splitting the Secret</h1>
            <br />
            <p style="text-align: justify; font-size: 22px; ">
              Based on Shamir’s Secret Sharing, a cryptographic algorithm created by Adi Shamir, Scrypta Shamir Backup is a method of splitting a secret (in digital text form) into multiple unique shares.
              <br />
              <br />To recover the secret, a specified number of shares has to be collected and used. This security standard is the key to defeat the two greatest risks involved with protecting your seeds / passphrase / private-keys: theft and destruction. Start now with the extra security of Scrypta Shamir Backup!
            </p>
          </div>
          <div class="column is-5 is-offset-1">
            <img src="/secret.png" />
          </div>
        </div>
      </section>

      <section class="section" style="padding-top: 100px">
        <h1 class="title is-1 text-center" style="font-size: 50px;">How to use</h1>
        <p class="subtitle is-3">
          <i>
            Three simple step to create, share
            <br />and keep your secrets safe.
          </i>
        </p>
      </section>

      <section class="section">
        <div
          class="columns id-desktop is-vcentered"
          style="padding-top:100px; justify-content: center;"
        >
          <div class="column is-5">
            <img src="/secret-share.png" style="width: 120%" />
          </div>
          <div class="column is-4 is-offset-1" style="text-align: left; padding-top: 60px;">
            <h1 style="font-size: 40px;">CREATE</h1>
            <br />
            <p style="text-align: justify; font-size: 22px; ">
              Turn off your connection or put the device in airplane mode. Write your secret.
              <br />
              <br />Choose how many recovery shares you want to generate, and decide how many of them you want to use for recovery.
            </p>
          </div>
        </div>
      </section>
      <section class="section" style="margin-bottom: 80px;">
        <div
          class="columns is-desktop is-vcentered"
          style="padding-top:100px; justify-content: center;"
        >
          <div class="column is-3 is-offset-1" style="text-align: left; padding-top: 60px;">
            <h1 style="font-size: 40px;">SHARE</h1>
            <br />
            <p
              style="text-align: justify; font-size: 22px; "
            >Distribute those shares however you want, among people or secure locations.</p>
          </div>
          <div class="column is-6 is-offset-1">
            <img src="/secretshare3.png" style="width: 60%" />
          </div>
        </div>
      </section>
      <section
        class="section"
        style="background: linear-gradient(to right, #ff0066 0%, #000099 100%);"
      >
        <div
          class="columns is-desktop is-vcentered"
          style="padding-top:100px; justify-content: center;"
        >
          <div class="column is-5">
            <img src="/relax.png" />
          </div>
          <div class="column is-4 is-offset-1" style="text-align: left; padding-top: 60px;">
            <h1 style="font-size: 40px; color: white;">RELAX</h1>
            <br />
            <p style="text-align: justify; font-size: 22px; color: white;">
              Relax now knowing that your “secrets” are secured by Scrypta Shamir Backup.
              <br />
              <br />
              <i>
                The number of shares can range from 1 to a maximum of 100.
                The threshold is the predetermined number of shares necessary to recover a secret.
              </i>
            </p>
          </div>
        </div>
      </section>

      <section class="section" style="padding-top: 100px">
        <h1 class="align-text: center" style="font-size: 50px;">Trustworthy application</h1>
        <div
          class="columns is-centered is-variable is-1-mobile is-0-tablet is-3-desktop is-8-widescreen is-2-fullhd"
          style="margin-top: 100px;"
        >
          <div class="column is-3">
            <div class="box" id="box-mod">
              <div class="media-center">
                <img src="/no-wifi.png" style="width: 60%" />
              </div>
              <div class="media-content text-center" style="font-size: 22px">
                <br />This web dApp works only on offline mode to prevent any leak of information.
              </div>
            </div>
          </div>
          <div class="column is-3">
            <div class="box" id="box-mod">
              <div class="media-center">
                <img src="/shield.png" style="width: 60%" />
              </div>
              <div class="media-content text-center" style="font-size: 22px">
                <br />
                <br />Secure offline backup of recovery shares.
              </div>
            </div>
          </div>
          <div class="column is-3">
            <div class="box" id="box-mod">
              <div class="media-center">
                <img src="/thief.png" style="width: 60%" />
              </div>
              <div class="media-content text-center" style="font-size: 22px">
                <br />
                <br />Eliminated risk of theft or loss.
                <br />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        class="section"
        style="margin-top: 100px; background: linear-gradient(to right, #34153C 0%, #4D4875 100%); "
      >
        <div class="columns is-desktop is-vcentered">
          <div class="column is-3 is-offset-1">
            <h1 class="title is-1 text-left" style="color: white;">F.A.Q.</h1>
          </div>
        </div>

        <div class="columns is-desktop is-vcentered">
          <div class="column is-3 is-offset-1 text-left">
            <h1
              class="title is-3"
              style="color: white;"
            >What happens if some of the shares get lost or stolen?</h1>
            <p
              class="subtitle is-4"
              style="color: lightgray;"
            >Individual shares do not leak any information about the shared secret, as long as the number of compromised shares does not reach the required threshold.</p>
            <br />
            <br />
            <h1
              class="title is-3"
              style="color: white;"
            >What happens if I lose so many recovery shares?</h1>
            <p
              class="subtitle is-4"
              style="color: lightgray;"
            >If you can’t meet the required threshold, your seed / passphrase /pivate keys will become unrecoverable.</p>
            <a
              class="button is-rounded is-large"
              href="https://en.scrypta.wiki/utilities/shamir-backup.html"
              style="margin-top: 40px; margin-bottom: 40px; color: #4D4875;"
            >
              <strong>MORE INFO</strong>
            </a>
          </div>
          <div class="column is-4 is-offset-3">
            <img src="/faq.png" />
          </div>
        </div>
      </section>

      <footer
        class="footer"
        style="background: linear-gradient(to right, #34153C 0%, #4D4875 100%);"
      >
        <div class="content has-text-centered">
          <p style="color: white;">
            <a href="http://shamir.scryptachain.org/">Scrypta Shamir Backup</a> open-source project by
            <a href="https://scrypta.foundation">
              <strong>Scrypta Foundation</strong>
            </a> .
          </p>
        </div>
      </footer>

      <b-icon style="opacity:0" icon="home" size="is-medium"></b-icon>
    </div>
    <div v-if="!isConnected">
      <b-navbar>
        <template slot="brand">
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
            <img src="/logo.png" />
          </b-navbar-item>
        </template>
        <template slot="start">
          <b-navbar-item href="/#/">Create</b-navbar-item>
          <b-navbar-item href="/#/recover">Recover</b-navbar-item>
          <b-navbar-item v-if="!wallet" href="/#/login">Login</b-navbar-item>
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
const axios = require("axios");
export default {
  data() {
    return {
      scrypta: new ScryptaCore(true),
      address: "",
      wallet: "",
      isConnecting: false,
      isConnected: true,
      axios: axios,
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
      let check_backup = localStorage.getItem("sid_backup");
      if (
        check_backup !== null &&
        check_backup !== undefined &&
        check_backup === app.address
      ) {
        app.backup = true;
      }
      app.isLogging = false;
    } else {
      app.isLogging = false;
    }
    app.check_online_status();
    setInterval(function() {
      app.check_online_status();
    }, 5000);
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
              localStorage.setItem("SID", dataKey);
              let exp = dataKey.split(":");
              localStorage.setItem("sid_backup", exp[0]);
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
    downloadBackup() {
      const app = this;
      app.$buefy.dialog.prompt({
        message: `Enter wallet password`,
        inputAttrs: {
          type: "password"
        },
        trapFocus: true,
        onConfirm: async password => {
          let SID = localStorage.getItem("SID");
          let key = await app.scrypta.readKey(password, SID);
          if (key !== false) {
            var a = document.getElementById("downloadid");
            app.backup = true;
            localStorage.setItem("sid_backup", app.address);
            var file = new Blob([SID], { type: "sid" });
            a.href = URL.createObjectURL(file);
            a.download = app.address + ".sid";
            var clickEvent = new MouseEvent("click", {
              view: window,
              bubbles: true,
              cancelable: false
            });
            a.dispatchEvent(clickEvent);
          } else {
            app.$buefy.toast.open({
              message: "Wrong password!",
              type: "is-danger"
            });
          }
        }
      });
    },
    async check_online_status() {
      const app = this;
      try {
        app.isConnecting = true;
        let check = await app.axios.get(
          "https://idanodejs01.scryptachain.org/wallet/getinfo"
        );
        if (check.data.blocks !== undefined) {
          app.isConnected = true;
        } else {
          app.isConnected = false;
        }
        app.isConnecting = false;
      } catch (e) {
        app.isConnected = false;
        app.isConnecting = false;
      }
    }
  }
};
</script>

<style>
@media screen and (max-width: 767px) {
  .desksection {
    display: none !important;
  }
}

@media screen and (min-width: 768px) {
  .mobilesection {
    display: none !important;
  }
}

#box-mod {
  border-radius: 30px;
  color: #004391;
}

#box-mod:hover {
  border-radius: 30px;
  background-color: #eff3fc;
  color: #00397b;
}

#app {
  font-family: "Sen";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: url("/home-bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
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
#turnoff {
  position: sticky;
  top: 0px;
}
</style>