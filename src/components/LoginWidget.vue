<template>
  <div class="account-profile">
    <div id="identity--modal"></div>
    <div class="account-profile--avatar" @click="openWidget">
      <img src="../assets/logo.png" alt="" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "LoginWidget",
  mounted() {
    this.initializeIdentity("#identity--modal");
  },
  methods: {
    ...mapActions(["initializeIdentity", "openWidget"])
  }
};
</script>

<style lang="scss" scoped>
.account-profile {
  position: fixed;
  height: 30px;
  width: 30px;
  z-index: 10000;
  left: 0;
  top: 0;
  padding: 1em;
  &--avatar {
    display: block;
    border-radius: 50%;
    padding: 0.5em;
    background: #c0ffff;
    height: 32px;
    width: 32px;
    cursor: pointer;
    & img {
      width: 32px;
    }
  }
}
</style>
