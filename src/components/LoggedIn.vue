<template>
  <div>
    <div>logged in</div>
    <div><button v-on:click="getUserInfo">User Info</button></div>
    <div><button v-on:click="logOut">Log Out</button></div>
  </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
export default {
  name: "LoggedIn",
  methods: {
    logOut: function () {
      signOut(this.$fbAuth)
        .then(() => {
          console.log("sign out successfull");
          this.$router.push({ path: "/" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getUserInfo: function () {
      const auth = getAuth();
      const user = auth.currentUser;
      console.log("getUserInfo: user", user);
      if (user !== null) {
        user.providerData.forEach((profile) => {
          console.log("Sign-in provider: " + profile.providerId);
          console.log("  Provider-specific UID: " + profile.uid);
          console.log("  Name: " + profile.displayName);
          console.log("  Email: " + profile.email);
          console.log("  Photo URL: " + profile.photoURL);
        });
      }
    },
  },
};
</script>
