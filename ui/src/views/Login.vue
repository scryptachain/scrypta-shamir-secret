<template>
  <div class="login">
    <section class="hero">
      <div class="hero-body" style="padding: 0;">
        <div class="container" id="create" style="margin-top:50px;">
          <div class="card">
            <div style="padding: 50px 20px;">
              <h1 class="title is-1">Start Now</h1>
              <br />
              <h2 class="subtitle">
                <br />You need a Scrypta Identity to enter the platform.
                <br />
                <br />Use <a href="https://id.scryptachain.org/" target="_blank">Scrypta ID Extension</a> or <a href="https://web.manent.app" target="_blank">create a new wallet</a>.
                <br />
                <br />
                <b-upload v-model="file" v-on:input="loadWalletFromFile" drag-drop>
                  <section class="section">
                    <div class="content has-text-centered">
                      <p>Drag and drop your .sid here or click to upload</p>
                    </div>
                  </section>
                </b-upload>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
let ScryptaCore = require("@scrypta/core");

export default {
  data() {
    return {
      scrypta: new ScryptaCore(true),
      address: "",
      wallet: "",
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
      window.location='/#/'
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
    logout() {
      localStorage.setItem("SID", "");
      location.reload();
    }
  }
};
</script>

<style>
  .login{
    padding: 20px;
  }
</style> 