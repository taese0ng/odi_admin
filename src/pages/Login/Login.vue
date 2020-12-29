<template>
  <q-page padding class="q-pt-xl container row items-center">
    <div class="col-12 row justify-center items-center">
      <div class="col-10 col-md-6">
        <q-card class="my-card q-pa-md maxContainer-lg q-mx-auto">
          <q-card-section>
            <div class="text-h4 text-center q-pb-xl">
              <q-img :src="logoImg" style="width:50%; max-width:400px; min-width:200px"/>
            </div>
            <div class="row justify-center items-center">
              <q-form class="col-12">
                <q-input style="padding: 4px 0" label="ID" standout="bg-brown-3 text-white" v-model="userId" ref="id"/>
                <q-input style="padding: 4px 0" label="Password" type="password" standout="bg-brown-3 text-white"
                         v-model="userPassword" ref="pw"
                         @keyup.enter="onClickLogin"/>
                <q-btn style="margin-top: 28px; font-weight: 600" color="brown-13" label="로그인"
                       class="full-width" @click="onClickLogin"/>
                
              </q-form>
              <div class="col-12">
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
              </div>
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
import API from 'src/repositories/Login/LoginAPI';
import { access } from 'fs';

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
      logoImg: require('assets/odi_logo.png'),
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
        const body = {
          reg_type: 'business',
          id: this.userId,
          password: this.userPassword,
        };
        const apiResult = await API.login(body);

        if(apiResult.status === 200) {
          // console.log(apiResult);
          if(apiResult.data.result === 'success') {
            const option = {
              expires: '10h',
              path: '/',
            };
            Cookies.set('access_token', apiResult.data.token, option);
            this.$router.push({ 
              name: 'statistics', 
            });
          } else {
            this.msg = '로그인에 실패하였습니다.';
            this.isAlert = true;
            this.$refs.id.focus();
          }
        } else {
          this.msg = '통신에 문제가 발생하였습니다.';
          this.isAlert = true;
          console.log(apiResult.response);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
a{
  text-decoration: none;
  color: black;
}
</style>
