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
      console.log(
        "callbacks: signInSuccessWithAuthResult:",
        authResult,
        redirectUrl
      );
      return true;
    },
    signInFailure: function (error) {
      console.log("callbacks: signInFailure:", error);

      return error;
    },
    uiShown: function () {
      console.log("callbacks: uiShown");
    },
  },
};
let fbUI = {};

export default {
  name: "Home",
  data: function () {
    return {};
  },
  methods: {
    initFBUI: function () {
      const uiReference = firebaseui.auth.AuthUI.getInstance("demoUI");
      //console.log("uiReference ", uiReference);
      fbUI =
        uiReference !== null
          ? uiReference
          : new firebaseui.auth.AuthUI(this.$fbAuth, "demoUI");
      //console.log("fbUI", fbUI);
    },
    startAuthUI: function () {
      console.log(
        "startAuthUI: ui.isPendingRedirect()",
        fbUI.isPendingRedirect()
      );
      fbUI.start("#firebaseui-auth-container", uiConfig);
      console.log("startAuthUI: fbUI started");
    },
  },
  mounted() {
    this.initFBUI();
    this.startAuthUI();
  },
};
</script>

<style scoped></style>
