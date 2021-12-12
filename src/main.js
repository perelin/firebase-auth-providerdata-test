import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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

function registerOnAuthStateChanged(fbAuth) {
  onAuthStateChanged(
    fbAuth,
    (user) => {
      if (user) {
        console.log("onAuthStateChanged: user found");
        console.log("onAuthStateChanged: user.providerData", user.providerData);
        console.log("onAuthStateChanged: user", user);
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

const fbApp = initializeApp(firebaseConfig);
const fbAuth = getAuth(fbApp);
registerOnAuthStateChanged(fbAuth);
app.config.globalProperties.$fbApp = fbApp;
app.config.globalProperties.$fbAuth = fbAuth;
