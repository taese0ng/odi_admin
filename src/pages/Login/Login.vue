<template>
  <q-page padding class="q-pt-xl container row items-center login">
    <div class="col-12 row justify-center items-center">
      <div class="col-10 col-md-6">
        <q-card class="my-card q-pa-md maxContainer-lg q-mx-auto">
          <q-card-section>
            <div class="text-h4 text-center q-pb-md">odi Admin Web</div>
            <div class="row justify-center items-center">
              <q-form class="col-12">
                <q-input style="padding: 4px 0" label="ID" standout="bg-indigo-4 text-white" v-model="userId" ref="id"/>
                <q-input style="padding: 4px 0" label="Password" type="password" standout="bg-indigo-4 text-white"
                         v-model="userPassword" ref="pw"
                         @keyup.enter="onClickLogin"/>
                <q-btn outline style="margin-top: 8px; font-weight: 600" color="blue-gray-8" label="로그인"
                       class="full-width" @click="onClickLogin"/>
                <router-link :to="{name:'signUp'}">
                  <template>
                    <q-btn outline style="margin-top: 8px; font-weight: 600" 
                     class="full-width" color="blue-gray-8" label="회원가입"/>
                  </template>
                </router-link>
                <router-link :to="{name:'findPassword'}">
                  <template>
                    <q-btn outline style="margin-top: 8px; font-weight: 600" 
                     class="full-width" color="blue-gray-8" label="비밀번호찾기"/>
                  </template>
                </router-link>
              </q-form>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <Alert v-if="isAlert" :msg="msg" @closeAlert="isAlert = false"/>
  </q-page>
</template>

<script>
// mixin
import rootStoreHelper from 'src/mixins/rootStoreHelper';
import Alert from 'components/Alert/Alert';
import { Cookies } from'quasar';

export default {
  name: 'Login',
  mixins: [rootStoreHelper],
  components: {
    Alert,
  },
  data () {
    return {
      userId: '',
      userPassword: '',
      isAlert: false,
      msg: '',
    };
  },
  methods: {
    async onClickLogin () {
      if (!this.userId.trim()) {
        this.$refs.id.focus();
        this.msg = '사용자 ID를 입력해주세요!';
        this.isAlert = true;
        return false;
      }
      if (!this.userPassword.trim()) {
        this.$refs.pw.focus();
        this.msg = '비밀번호를 입력해주세요!';
        this.isAlert = true;
        return false;
      } else{
        const option = {
          expires: '10h',
          path: '/',
        };
        Cookies.set('access_token', 'token', option);
        this.$store.commit('setLoginName', { name: 'test' });
        this.$router.push({ 
          name: 'normalList', 
          query: { opt: 'name', search: '', page: 1, size: 10 }, 
        });
      }
      // const apiResult = await API.login();
      // console.log(apiResult);
      //
      // if(apiResult.status === 200) {
      //   console.log(apiResult.data);
      //   localStorage.setItem('token', 'tokenValue');
      //   this.dispatchIsLoginAction({ isLogin: true });
      //   this.$router.push({
      //     path: '/clientManagement/list?opt=name&search=&page=1&size=10',
      //   });
      // } else {
      //   console.log(apiResult.status);
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
@import './Login.scss';

a{
  text-decoration: none;
  color: black;
}
</style>
