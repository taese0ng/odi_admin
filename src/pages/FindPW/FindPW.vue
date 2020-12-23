<template>
  <q-page padding>
    <Header :title="title"/>

    <q-card flat bordered class="q-mt-md maxContainer-md q-mx-auto">
      <q-card-section>
        <div class="row">
          <div class="col-9 q-mb-md q-pr-md">
            <div class="text-grey">
              <q-input label-slot filled dense v-model="phone"
                color="blue-grey-9" ref="phone" :disable="phoneAble">
                <template v-slot:label>
                  <div class="row all-pointer-events items-center necessary">
                    전화번호
                  </div>
                </template>
                <template v-if="phone" v-slot:append>
                  <q-icon name="close" @click.stop="phone = ''" class="cursor-pointer"/>
                </template>
              </q-input>
            </div>
          </div>
          
          <div class="col-3 text-center q-mb-md self-center">
              <q-btn color='primary' label="인증번호요청" class="btn-sm" 
               :disable="!passwordAble" @click='requestNum'/>
          </div>
        </div>

        <div class="row">
          <div class="col-9 q-mb-md q-pr-md">
              <div class="text-grey">
                  <q-input label-slot filled dense v-model="certified"
                           color="blue-grey-9" ref="certified" :disable="certifiedAble">
                    <template v-slot:label>
                      <div class="row all-pointer-events items-center necessary">
                        인증번호 <span class="q-ml-sm text-red">{{timer}}</span>
                      </div>
                    </template>

                    <template v-if="certified" v-slot:append>
                      <q-icon name="close" @click.stop="certified = ''" class="cursor-pointer"/>
                    </template>
                  </q-input>
                </div>
          </div>

          <div class="col-3 text-center q-mb-md self-center">
              <q-btn :disable="certifiedAble" color='primary' label="인증하기" class="btn-sm" @click="authenticate"/>
          </div>
        </div>

        <div v-if="!passwordAble" class="row">
            <div class="col-12 q-mb-md">        
                <div class="row">
                    <div class="col-6 q-pr-xs">
                        <div class="text-grey">
                            <q-input type="password" label-slot filled dense v-model="password"
                                color="blue-grey-9" ref="password" :disable="passwordAble">
                                <template v-slot:label>
                                    <div class="row all-pointer-events items-center necessary">
                                        새로운 비밀번호
                                    </div>
                                </template>
                                <template v-if="password" v-slot:append>
                                    <q-icon name="close" @click.stop="password = ''" class="cursor-pointer"/>
                                </template>
                            </q-input>
                        </div>
                    </div>

                    <div class="col-6 q-pl-xs">
                        <div class="text-grey">
                        <q-input type="password" label-slot filled dense v-model="passwordConfirm"
                                color="blue-grey-9" ref="passwordConfirm" :disable="passwordAble">
                            <template v-slot:label>
                            <div class="row all-pointer-events items-center necessary">
                                비밀번호 확인
                            </div>
                            </template>
                            <template v-if="passwordConfirm" v-slot:append>
                            <q-icon name="close" @click.stop="passwordConfirm = ''" class="cursor-pointer"/>
                            </template>
                        </q-input>
                        </div>
                    </div>
                </div>

            </div>
          
        </div>
      </q-card-section>

      <q-card-actions class="row items-center justify-end q-pa-sm">
        <q-btn color="blue-grey-8" class="btn-sm" @click="onClickModify">
          비밀번호 변경
        </q-btn>
        <q-btn color="blue-grey-8" class="btn-sm" @click="onClickCancel">
          취소
        </q-btn>
      </q-card-actions>

    </q-card>

    <Confirm v-if="isConfirm" :msg="msg" :confirmMethod="confirmMethod" @closeConfirm="closeConfirm"/>
    <Alert v-if="isAlert" :msg="msg" @closeAlert="isAlert = false"/>
    <Dialog :isOpen="isDialog" @closeDialog="isDialog=false"/>
  </q-page>
</template>

<script>
import Header from 'components/Header/Header';
import Confirm from 'components/Confirm/Confirm';
import Alert from 'components/Alert/Alert';
import Dialog from 'components/Dialog/Dialog';
import defaultProfile from 'assets/defaultProfile.png';
import API from 'src/repositories/FindPW/FindPWAPI';

export default {
  name: 'FindPW',

  components: {
    Header,
    Confirm,
    Alert,
    Dialog,
  },

  data () {
    return {
      title: '비밀번호 찾기',
      
      password: '',
      passwordConfirm: '',
      phone: '',
      certified: '',

      isDialog: false,
      isConfirm: false,
      isAlert: false,
      msg: '',
      confirmMethod: null,

      timer: '3:00',
      phoneAble: false,
      certifiedAble: true,
      passwordAble: true,
    };
  },

  methods: {
    onClickModify () {
      this.msg = '비밀번호를 변경 하시겠습니까?';
      this.confirmMethod = this.modifyPassword;
      this.isConfirm = true;
    },

    async modifyPassword() {
      if(!this.password || !this.passwordConfirm || this.password !== this.passwordConfirm) {
        this.msg = '비밀번호를 확인해주세요!';
        this.isAlert = true;
      } else {
        const body = {
          reg_type: 'business',
          phonenum: this.phone,
          password: this.password,
        };
        const apiResult = await API.changePassword(body);
        if(apiResult.status === 200 && apiResult.statusText === 'OK') {
          console.log(apiResult);
        } else {
          console.log(apiResult.response);
        }
      }
    },

    onClickCancel () {
      this.$router.back();
    },

    closeConfirm () {
      this.isConfirm = false;
    },

    requestNum() {
      this.phoneAble = true;
      this.certifiedAble = false;
    },

    authenticate() {
      this.certifiedAble = true;
      this.passwordAble = false;
    },

  },
};
</script>

<style scoped>

</style>
