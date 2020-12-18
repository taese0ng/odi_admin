import { mapGetters, mapActions, mapMutations, mapState } from 'vuex';

export default {

  computed: {
    ...mapState(['isLogin']),

    ...mapGetters({
      getLoginInfo: 'getLoginInfo',
      getCafeName: 'getCafeName',
      getBusinessName: 'getBusinessName',
    }),
  },

  methods: {
    ...mapActions({
      dispatchIsLoginAction: 'isLoginAction',
      dispatchGetSrl: 'dispatchGetSrl',
      dispatchGetUserInfo: 'dispatchGetUserInfo',
    }),

    ...mapMutations({
      setIsLogin: 'setIsLogin',
    }),
  },

};
