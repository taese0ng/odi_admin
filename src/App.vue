<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import rootStoreHelper from 'src/mixins/rootStoreHelper';
import { Cookies } from 'quasar';

export default {
  name: 'App',
  
  mixins: [rootStoreHelper],

  created() {
    if(Cookies.get('access_token')) {
      this.dispatchGetSrl();
      this.dispatchGetUserInfo();
    }
  },
};
</script>
