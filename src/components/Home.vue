<template>
  <div class="home">
    <div id="firebaseui-auth-container" />
  </div>
</template>

<script>
import { EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

const uiConfig = {
  signInSuccessUrl: "#/loggedin",
  signInOptions: [
    EmailAuthProvider.PROVIDER_ID,
    GoogleAuthProvider.PROVIDER_ID,
  ],
  tosUrl: "http://example.com",
  privacyPolicyUrl: "http://example.com",
  signInFlow: "redirect",
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      console.log("signInSuccessWithAuthResult:", authResult, redirectUrl);
      return true;
    },
    uiShown: function () {
      console.log("uiShown");
    },
  },
};

export default {
  name: "Home",
  data: function () {
    return {
      fbUI: {},
    };
  },
  methods: {
    initFBUI: function () {
      const uiReference = firebaseui.auth.AuthUI.getInstance("demoUI");
      console.log("uiReference ", uiReference);
      this.fbUI =
        uiReference !== null
          ? uiReference
          : new firebaseui.auth.AuthUI(this.$fbAuth, "demoUI");
      console.log("this.fbUI", this.fbUI);
    },
    startAuthUI: function () {
      console.log("ui.isPendingRedirect()", this.fbUI.isPendingRedirect());
      this.fbUI.start("#firebaseui-auth-container", uiConfig);
      console.log("this.fbUI started");
    },
  },
  mounted() {
    this.initFBUI();
    this.startAuthUI();
  },
};
</script>

<style scoped></style>
