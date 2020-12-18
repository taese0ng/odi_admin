<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import rootStoreHelper from 'src/mixins/rootStoreHelper';
export default {
  name: 'App',
  
  mixins: [rootStoreHelper],

  created() {
    this.dispatchGetSrl();
    this.dispatchGetUserInfo();
  },
};
</script>
