<template>
  <div>
    <div>logged in</div>
    <div><button v-on:click="logOut">Log Out</button></div>
  </div>
</template>

<script>
import { signOut } from "firebase/auth";
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
  },
};
</script>
