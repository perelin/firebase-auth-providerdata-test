import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import App from "./App.vue";

const routes = [
  { path: "/", component: () => import("./components/Home") },
  { path: "/loggedin", component: () => import("./components/LoggedIn") },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const firebaseConfig = {
  apiKey: "AIzaSyCtlxWq7Wyk_4FRnXz2E-UZLVzCKco0iPk",
  authDomain: "codesandbox-test-833fd.firebaseapp.com",
  projectId: "codesandbox-test-833fd",
  storageBucket: "codesandbox-test-833fd.appspot.com",
  messagingSenderId: "337667455065",
  appId: "1:337667455065:web:cb4cc36af9c7c8f7721948",
};

function registerOnAuthStateChanged() {
  firebase.auth().onAuthStateChanged(
    (user) => {
      if (user) {
        console.log("onAuthStateChanged: user found");
        console.log(user.providerData);
        console.log(user);
      } else {
        console.log("onAuthStateChanged: no user found");
      }
    },
    function (error) {
      console.log("onAuthStateChanged:", error);
    }
  );
}

const app = createApp(App);
app.use(router);
app.mount("#app");

const fbApp = firebase.initializeApp(firebaseConfig);
const fbAuth = fbApp.auth();
registerOnAuthStateChanged();
app.config.globalProperties.$fbApp = fbApp;
app.config.globalProperties.$fbAuth = fbAuth;
