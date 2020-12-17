import { mapGetters, mapActions, mapMutations, mapState } from 'vuex';

export default {

  computed: {
    ...mapState(['isLogin']),

    ...mapGetters({
      getLoginInfo: 'getLoginInfo',
    }),
  },

  methods: {
    ...mapActions({
      dispatchIsLoginAction: 'isLoginAction',
    }),

    ...mapMutations({
      setLoginName: 'setLoginName',
    }),
  },

};
