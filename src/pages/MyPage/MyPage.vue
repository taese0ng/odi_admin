<template>
  <q-page padding>
    <Header :title="title"/>

    <q-card flat bordered class="q-mt-md maxContainer-md q-mx-auto">
      <q-card-section>
        <div class="row">
          <!-- <div class="col-12 q-mb-md">
            <div class="row q-col-gutter-y-sm">
              <div class="col-12 text-center" v-if="imgSrc">
                  <q-img :src="imgSrc" style="max-width:500px"/>
              </div>
              <div class="col-12">
                  <q-file
                      dense
                      color="blue-grey-9"
                      v-model="img"
                      filled
                      label-slot
                      accept=".jpg, image/*"
                      @input="inputImg"
                      @rejected="onRejected"
                  >
                    <template v-slot:label>
                      <div class="necessary">
                        프로필사진
                      </div>
                    </template>
                  </q-file>
              </div>
            </div>
          </div> -->

          <div class="col-12 q-mb-md">
            <div class="text-grey">
              <q-input label-slot filled dense v-model="id"
              color="blue-grey-9" ref="id" disable>
                <template v-slot:label>
                  <div class="row all-pointer-events items-center">
                    아이디
                  </div>
                </template>
              </q-input>
            </div>
          </div>

          <div class="col-12 q-mb-md" v-if="!checkedPassword">
            <div class="row  q-col-gutter-x-sm">
              <div class="col-8">
                <q-input label-slot type="password" filled dense v-model="currentPW"
                  color="blue-grey-9" ref="currentPW">
                  <template v-slot:label>
                    <div class="row all-pointer-envents items-center">
                      현재 비밀번호
                    </div>
                  </template>
                </q-input>
              </div>

              <div class="col-4">
                <q-btn label="비밀번호 수정" class="full-width" 
                 color="blue-grey-8" @click="passwordCheck"/>
              </div>
            </div>
          </div>

          <div class="col-12 q-mb-md" v-if="checkedPassword">        
            <div class="row q-col-gutter-sm">
              <div class="col-6">
                <div class="text-grey">
                  <q-input type="password" label-slot filled dense v-model="password"
                          color="blue-grey-9" ref="password">
                    <template v-slot:label>
                      <div class="row all-pointer-events items-center necessary">
                        새 비밀번호
                      </div>
                    </template>
                    <template v-if="password" v-slot:append>
                      <q-icon name="close" @click.stop="password = ''" class="cursor-pointer"/>
                    </template>
                  </q-input>
                </div>
              </div>

              <div class="col-6">
                <div class="text-grey">
                  <q-input type="password" label-slot filled dense v-model="passwordConfirm"
                          color="blue-grey-9" ref="passwordConfirm">
                    <template v-slot:label>
                      <div class="row all-pointer-events items-center necessary">
                        새 비밀번호 확인
                      </div>
                    </template>
                    <template v-if="passwordConfirm" v-slot:append>
                      <q-icon name="close" @click.stop="passwordConfirm = ''" class="cursor-pointer"/>
                    </template>
                  </q-input>
                </div>
              </div>

              <div class="col-12">
                <q-btn label="비밀번호 수정하기" color="blue-grey-8" 
                class="full-width" @click="modifyPassword"/>
              </div>
            </div>
          </div>

          <div class="col-12 q-mb-md">
            <div class="row q-col-gutter-x-sm items-center">
              <div class="col-3 necessary q-pl-md">
                생년월일
              </div>
              <div class="col-9">
                <q-input v-model="birth" filled type="date" dense color="brown-13" disable/>
              </div>
            </div>
          </div>

          <div class="col-12 q-mb-md">
            <div class="text-grey">
              <q-input label-slot filled dense v-model="email"
                      color="blue-grey-9" ref="email">
                <template v-slot:label>
                  <div class="row all-pointer-events items-center necessary">
                    이메일
                  </div>
                </template>
                <template v-if="email" v-slot:append>
                  <q-icon name="close" @click.stop="email = ''" class="cursor-pointer"/>
                </template>
              </q-input>
            </div>
          </div>

          <div class="col-12 q-mb-md">
            <div class="text-grey">
              <q-input label-slot filled dense v-model="name"
                       color="blue-grey-9" ref="name" disable>
                <template v-slot:label>
                  <div class="row all-pointer-events items-center necessary">
                    이름
                  </div>
                </template>
              </q-input>
            </div>
          </div>

          <div class="col-12 q-mb-md">
            <div class="text-grey">
              <q-input label-slot filled dense v-model="phone"
                       color="blue-grey-9" ref="phone">
                <template v-slot:label>
                  <div class="row all-pointer-events items-center necessary">
                    휴대전화
                  </div>
                </template>
                <template v-if="phone" v-slot:append>
                  <q-icon name="close" @click.stop="phone = ''" class="cursor-pointer"/>
                </template>
              </q-input>
            </div>
          </div>

          <div class="col-12 q-mb-md">
            <div class="text-grey">
              <q-input label="과세구분" filled dense v-model="taxClassification"
              color="blue-grey-9" disable/>
            </div>
          </div>

          <div class="col-12 q-mb-md">
            <div class="text-grey">
              <q-input label="사업자등록번호" filled dense v-model="regNum"
              color="blue-grey-9" disable/>
            </div>
          </div>

          <div class="col-12 q-mb-md">
            <div class="text-grey">
              <q-input label="업태" filled dense v-model="type"
              color="blue-grey-9" disable/>
            </div>
          </div>

          <div class="col-12 q-mb-md">
            <div class="text-grey">
              <q-input label="종목" filled dense v-model="typeDetail"
              color="blue-grey-9" disable/>
            </div>
          </div>

          <div class="col-12 q-mb-md bg-grey-2 items-center q-pl-xs">
              <q-checkbox keep-color color="brown-13" v-model="agreeAD"
                  label="광고 이용 여부" class="q-mr-lg"/>
          </div>
        </div>
      </q-card-section>

      <q-card-actions>
          <q-btn color="red-6" class="full-width q-mb-sm" @click="onClickWithdrawal" label="회원탈퇴"/>            
          <q-btn color="brown-13" class="full-width q-mb-sm" @click="onClickModify" label="정보저장"/>
          <q-btn color="blue-grey-8" class="full-width" @click="onClickCancel" label="취소"/>
      </q-card-actions>

    </q-card>

    <Confirm v-if="isConfirm" :msg="msg" :confirmMethod="confirmMethod" @closeConfirm="closeConfirm"/>
    <Alert v-if="isAlert" :msg="msg" @closeAlert="isAlert = false"/>
    <Dialog :isOpen="isDialog" @closeDialog="isDialog=false"/>
  </q-page>
</template>

<script>
import rootStoreHelper from 'src/mixins/rootStoreHelper';
import Header from 'components/Header/Header';
import Confirm from 'components/Confirm/Confirm';
import Alert from 'components/Alert/Alert';
import Dialog from 'components/Dialog/Dialog';
import defaultProfile from 'assets/defaultProfile.png';
import API from 'src/repositories/MyPage/MyPageAPI';
import { Cookies } from'quasar';

export default {
  name: 'MyPage',

  components: {
    Header,
    Confirm,
    Alert,
    Dialog,
  },

  mixins: [rootStoreHelper],

  data () {
    return {
      title: '마이페이지',

      imgSrc: null,
      img: null,

      id: '',
      email: '',
      name: '',
      currentPW: '',
      checkedPassword: false,
      password: '',
      passwordConfirm: '',
      phone: '',
      birth: null,

      taxClassification: '',
      regNum: '',
      type: '',
      typeDetail: '',

      isDialog: false,
      isConfirm: false,
      isAlert: false,
      msg: '',
      confirmMethod: null,
    
      agreeAD: false,
    };
  },

  created() {
    this.getUserData();
  },

  methods: {
    async getUserData() {
      const apiResult = await API.getUserInfo();

      if(apiResult.status === 200 && apiResult.statusText === 'OK') {
        console.log(apiResult);
        const data = apiResult.data;
        this.id = data.business_id;
        this.email = data.business_email;
        this.name = data.business_nick_name;
        this.phone = data.business_phone;
        this.birth = data.business_birth.slice(0, 4) + '-' + data.business_birth.slice(4, 6) + '-' + data.business_birth.slice(6);
        this.taxClassification = data.business_tax_classification;
        this.regNum = data.business_reg_num;
        this.type = data.business_type;
        this.typeDetail = data.business_type_detail;
      } else {
        console.log(apiResult.response);
        this.msg = '통신에러!';
        this.isAlert = true;
      }
    },

    onClickModify () {
      this.msg = '저장하시겠습니까?';
      this.confirmMethod = this.modifyUser;
      this.isConfirm = true;
    },

    async modifyUser() {
      if(this.checkedPassword) {
        this.msg = '비밀번호변경을 해주세요!';
        this.isAlert = true;
      }else if(!this.email) {
        this.msg = '이메일을 입력해주세요!';
        this.isAlert = true;
      } else if(!this.name) {
        this.msg = '이름을 입력해주세요!';
        this.isAlert = true;
      } else if(!this.phone) {
        this.msg = '휴대전화를 입력해주세요!';
        this.isAlert = true;
      } else {
        const body = {
          email: this.email,
          nick_name: this.name,
          phonenum: this.phone,
        };
        const apiResult = await API.modifyUser(body);
        if(apiResult.status === 200) {
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

    async onClickWithdrawal() {
      console.log('탈퇴');
      const apiResult = await API.removeAccount();
      if(apiResult.status === 200 && apiResult.data.result === 'success') {
        Cookies.remove('access_token');
      } else {
        console.log(apiResult.response);
        this.msg = '통신에러!';
        this.isAlert = true;
      }
    },

    async passwordCheck() {
      const body = {
        user_type: 'password',
        reg_type: 'business',
        check_data: this.currentPW,
      };

      const apiResult = await API.checkPassword(body);
      if(apiResult.status === 200) {
        if(apiResult.data.result) {
          this.checkedPassword = true;
        } else{
          this.msg = '비밀번호가 틀렸습니다.';
          this.isAlert = true;
        }
      } else {
        console.log(apiResult.response);
        this.msg = '통신에러!';
        this.isAlert = true;
      }
    },

    onRejected (rejectedEntries) {
      // Notify plugin needs to be installed
      // https://quasar.dev/quasar-plugins/notify#Installation
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
      });
    },

    inputImg() {
      this.imgSrc = URL.createObjectURL(this.img);
    },

    async modifyPassword() {
      if(!this.password || !this.passwordConfirm || this.password !== this.passwordConfirm) {
        this.msg = '비밀번호를 확인해주세요!';
        this.isAlert = true;
      } else {
        const body = {
          reg_type: 'business',
          phonenum: this.phone,
          id: this.id,
          password: this.password,
        };
        const apiResult = await API.changePassword(body);
        if(apiResult.status === 200) {
          console.log(apiResult);
        } else {
          console.log(apiResult.respone);
          this.msg = '통신에러!';
          this.isAlert = true;
        }
      }
    },
  },
};
</script>

<style scoped>

</style>
