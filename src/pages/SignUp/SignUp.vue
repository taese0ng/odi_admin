<template>
  <q-page padding>
    <Header :title="title"/>

    <q-card flat bordered class="q-mt-md maxContainer-md q-mx-auto">
      <q-card-section>
        <div class="row">
          <div class="col-12 q-mb-md">
            <div class="text-grey">
              <q-input label-slot filled dense v-model="id"
              color="blue-grey-9" ref="id">
                <template v-slot:label>
                  <div class="row all-pointer-events items-center necessary">
                    아이디
                  </div>
                </template>
                <template v-if="id" v-slot:append>
                  <q-icon name="close" @click.stop="id = ''" class="cursor-pointer"/>
                </template>
              </q-input>
            </div>
          </div>
    
          <div class="col-12 q-mb-md">        
            <div class="row">
              <div class="col-6 q-pr-xs">
                <div class="text-grey">
                  <q-input type="password" label-slot filled dense v-model="password"
                           color="blue-grey-9" ref="password">
                    <template v-slot:label>
                      <div class="row all-pointer-events items-center necessary">
                        비밀번호
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
                           color="blue-grey-9" ref="passwordConfirm">
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
              <span v-if="password.length>0 && password.length<8" class="text-red full-width">8자이상 입력하세요. </span>
              <span v-if="password !== passwordConfirm" class="text-red">비밀번호가 일치하지 않습니다.</span>
            </div>
          </div>

          <div class="col-12 q-mb-md">
            <div class="row q-col-gutter-x-sm items-center">
              <div class="col-3 necessary q-pl-md">
                생년월일
              </div>
              <div class="col-9">
                <q-input v-model="birth" filled type="date" dense color="brown-13"/>
              </div>
            </div>
          </div>

          <div class="col-12 q-mb-md">
            <div class="row q-col-gutter-y-sm">
              <div class="col-12 text-center" v-if="imgSrc">
                  <q-img :src="imgSrc" style="max-width:500px"/>
              </div>
              <div class="col-12">
                  <q-file
                      dense
                      v-model='img'
                      color="blue-grey-9"
                      filled
                      label-slot
                      accept=".jpg, image/*"
                      @input="inputImg"
                      @rejected="onRejected"
                  >
                    <template v-slot:label>
                      <div class="necessary">
                        사업자등록증
                      </div>
                    </template>
                  </q-file>
              </div>
            </div>
          </div>

          <div class="col-12 q-mb-md">
            <div class="text-grey">
              <q-input label-slot filled dense v-model="businessNum"
              color="blue-grey-9" ref="businessNum">
                <template v-slot:label>
                  <div class="row all-pointer-events items-center necessary">
                    사업자 등록번호
                  </div>
                </template>
                <template v-if="businessNum" v-slot:append>
                  <q-icon name="close" @click.stop="businessNum = ''" class="cursor-pointer"/>
                </template>
              </q-input>
            </div>
          </div>

          <div class="col-12 q-mb-md">
            <div class="text-grey">
              <q-select outlined v-model="selectedTax" :options="taxClassification" 
              label="과세구분" color="brown-13" dense emit-value map-options />
            </div>
          </div>

          <div class="col-12 q-mb-md">
            <div class="text-grey">
              <q-input label-slot filled dense v-model="businessType"
              color="blue-grey-9" ref="businessType" hint="호프, 주점 도매업은 가입할 수 없습니다.">
                <template v-slot:label>
                  <div class="row all-pointer-events items-center necessary">
                    업태 (영어나 한자로 써있으면 소리 나는 대로 한글로 입력해주세요)
                  </div>
                </template>
                <template v-if="businessType" v-slot:append>
                  <q-icon name="close" @click.stop="businessType = ''" class="cursor-pointer"/>
                </template>
              </q-input>
            </div>
          </div>

          <div class="col-12 q-mb-md">
            <div class="text-grey">
              <q-input label-slot filled dense v-model="businessEvent"
              color="blue-grey-9" ref="businessEvent">
                <template v-slot:label>
                  <div class="row all-pointer-events items-center necessary">
                    종목 (영어나 한자로 써있으면 소리 나는 대로 한글로 입력해주세요)
                  </div>
                </template>
                <template v-if="businessEvent" v-slot:append>
                  <q-icon name="close" @click.stop="businessEvent = ''" class="cursor-pointer"/>
                </template>
              </q-input>
            </div>
          </div>
        </div>

        <div class="row">

          <div class="col-6 q-mb-md">
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
          
          <div class="col-1 q-mb-md self-center text-center">
            @
          </div>

          <div class="col-5 q-mb-md self-center">
            <q-input filled dense :value="selectedEmail" :disable="inputEmail" color="blue-grey-9"/>
          </div>

          <div class="col-12 q-mb-md">
            <div class="text-grey">
              <q-select outlined v-model="selectedEmail" :options="emailList" 
              label="이메일 주소" color="brown-13" dense emit-value map-options @input="(val)=>selectEmail(val)"/>
            </div>
          </div>

        </div>

        <div class="row ">
          <div class="col-12 q-mb-md">
            <div class="text-grey">
              <q-input label-slot filled dense v-model="name"
                       color="blue-grey-9" ref="name">
                <template v-slot:label>
                  <div class="row all-pointer-events items-center necessary">
                    이름
                  </div>
                </template>
                <template v-if="name" v-slot:append>
                  <q-icon name="close" @click.stop="name = ''" class="cursor-pointer"/>
                </template>
              </q-input>
            </div>
          </div>
        </div>

        <div class="row q-col-gutter-sm">
          <div class="col-9 q-mb-xs">
            <div class="text-grey">
              <q-input label-slot filled dense v-model="phone"
                       color="blue-grey-9" ref="phone" type="number">
                <template v-slot:label>
                  <div class="row all-pointer-events items-center necessary">
                    전화번호 ex)01012341234
                  </div>
                </template>
              </q-input>
            </div>
          </div>

          <div class="col-3 q-mb-xs">
            <q-btn label="인증요청" class="full-width" color="primary" @click="phoneCertifyRequest = true"/>
          </div>
        </div>

        <div class="row q-col-gutter-sm" v-if="phoneCertifyRequest">
          <div class="col-9 q-mb-md">
            <div class="text-grey">
              <q-input label-slot filled dense v-model="phoneCertifyNum"
                       color="blue-grey-9" type="number">
                <template v-slot:label>
                  <div class="row all-pointer-events items-center necessary">
                    인증번호
                  </div>
                </template>
              </q-input>
            </div>
          </div>

          <div class="col-3 q-mb-md">
            <q-btn label="인증하기" class="full-width" color="primary" @click="phoneCertify = true"/>
          </div>
        </div>

        <!-- <div class="row q-mb-md bg-grey-2 items-center q-pl-xs">
          <div class="col-12">
              <q-checkbox keep-color color="brown-13" v-model="agreeAD"
                  label="광고 이용 여부" class="q-mr-lg"/>
          </div>
        </div> -->
      </q-card-section>

      <q-card-actions>         
          <q-btn color="brown-13" class="full-width q-mb-sm" @click="onClickCreate" label="회원가입"/>
          <q-btn color="red-6" class="full-width" @click="onClickCancel" label="취소"/>
      </q-card-actions>

    </q-card>

    <Confirm v-if="isConfirm" :msg="msg" :confirmMethod="confirmMethod" @closeConfirm="closeConfirm"/>
    <Alert v-if="isAlert" :msg="msg" @closeAlert="closeAlert"/>
    <Dialog :isOpen="isDialog" @closeDialog="isDialog=false"/>
  </q-page>
</template>

<script>
import Header from 'components/Header/Header';
import Confirm from 'components/Confirm/Confirm';
import Alert from 'components/Alert/Alert';
import Dialog from 'components/Dialog/Dialog';
import defaultProfile from 'assets/defaultProfile.png';
import API from 'src/repositories/SignUp/SignUpAPI';

export default {
  name: 'SignUp',

  components: {
    Header,
    Confirm,
    Alert,
    Dialog,
  },

  data () {
    return {
      title: '회원가입',

      id: '',
      businessNum: '',
      email: '',
      name: '',
      password: '',
      passwordConfirm: '',
      phone: '',
      businessType: '',
      businessEvent: '',
      birth: null,

      isDialog: false,
      isConfirm: false,
      isAlert: false,
      msg: '',
      confirmMethod: null,

      selectedTax: null,
      taxClassification: [
        { label: '일반과세자', value: '일반과세자' }, 
        { label: '간이과세자', value: '간이과세자' }, 
        { label: '법인과세자', value: '법인과세자' }, 
        { label: '부가가치세 면세사업자', value: '부가가치세 면세사업자' }, 
        { label: '면세법인 사업자', value: '면세법인 사업자' }],
    
      selectedEmail: '',
      inputEmail: false,
      emailList: [
        { label: '네이버', value: 'naver.com' },
        { label: '다음', value: 'hanmail.net' },
        { label: '구글', value: 'gmail.com' },
        { label: '직접입력', value: '' },
      ],
      agreeAD: false,

      phoneCertifyRequest: false,
      phoneCertify: false,
      phoneCertifyNum: '',
      img: null,
      imgSrc: null,
      closeAlert: () => { this.isAlert = false; },
    };
  },

  methods: {
    onClickCreate () {
      // console.log(this.businessNum);
      this.msg = '생성하시겠습니까?';
      this.confirmMethod = this.createAdmin;
      this.isConfirm = true;
    },

    async createAdmin() {
      if(!this.id) {
        this.msg = 'ID를 입력해주세요';
        this.isAlert = true;
      } else if(!this.password || !this.passwordConfirm || this.password !== this.passwordConfirm || this.password.length < 8) {
        this.msg = '비밀번호를 확인해주세요!';
        this.isAlert = true;
      } else if(!this.email || this.selectedEmail.length < 1) {
        this.msg = '이메일을 입력해주세요!';
        this.isAlert = true;
      } else if(!this.name) {
        this.msg = '이름을 입력해주세요!';
        this.isAlert = true;
      } else if(!this.phoneCertify) {
        this.msg = '전화번호 인증을 해주세요!';
        this.isAlert = true;
      } else if(!this.selectedTax) {
        this.msg = '과세구분을 확인해주세요!';
        this.isAlert = true;
      } else if(!this.businessNum) {
        this.msg = '사업자등록번호를 확인해주세요!';
        this.isAlert = true;
      } else if(!this.businessType) {
        this.msg = '업태를 확인해주세요!';
        this.isAlert = true;
      } else if(!this.businessEvent) {
        this.msg = '종목을 확인해주세요!';
        this.isAlert = true;
      } else if(!this.img) {
        this.msg = '사업자등록증을 확인해주세요!';
        this.isAlert = true;
      } else if(!this.birth) {
        this.msg = '생년월일을 확인해주세요!';
        this.isAlert = true;
      } else {
        const checkBody = {
          user_type: 'id',
          reg_type: 'business',
          check_data: this.id,
        };

        const checkResult = await API.checkID(checkBody);
        console.log(checkResult);
        if(checkResult.status === 200 && checkResult.statusText === 'OK') {
          if(!checkResult.data.result) {
            const body = new FormData();
            body.append('reg_type', 'business');
            body.append('id', this.id);
            body.append('password', this.password);
            body.append('email', `${this.email}@${this.selectedEmail}`);
            body.append('nick_name', this.name);
            body.append('phonenum', this.phone);
            body.append('birth', this.birth.replace(/-/gi, ''));
            body.append('business_type', this.businessType);
            body.append('business_type_detail', this.businessEvent);
            body.append('reg_num', this.businessNum);
            body.append('tax_classification', this.selectedTax);
            body.append('reg_file', this.img);
            body.append('is_ad', this.agreeAD ? 'Y' : 'N');

            const apiResult = await API.signup(body);
            // console.log(apiResult);
            if(apiResult.status === 200) {
              // console.log(apiResult);
              if(apiResult.statusText === 'OK') {
                if(apiResult.data.result === 'exist id') {
                  this.msg = '존재하는 아이디입니다.';
                  this.isAlert = true;
                } else {
                  this.msg = '회원가입에 성공하였습니다.';
                  this.isAlert = true;
                  this.closeAlert = () => {
                    this.$router.push({ name: 'login' });
                  };
                }
              } else {
                this.msg = '회원가입이 실패하였습니다.';
                this.isAlert = true;
              }
            } else {
              console.log(apiResult.response);
              this.msg = '회원가입이 실패하였습니다.';
              this.isAlert = true;
            }
          } else {
            this.msg = '이미 존재하는 아이디입니다.';
            this.isAlert = true;
          }
        } else {
          console.log(checkResult.response);
          this.msg = '통신 에러';
          this.isAlert = true;
        }
      }
    },

    onClickCancel () {
      this.$router.back();
    },

    closeConfirm () {
      this.isConfirm = false;
    },

    onClickAddressSearch () {
      // console.log('주소검색');
    },

    onRejected (rejectedEntries) {
      // Notify plugin needs to be installed
      // https://quasar.dev/quasar-plugins/notify#Installation
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
      });
    },

    inputImg(img) {
      this.imgSrc = URL.createObjectURL(this.img);
    },

    selectEmail(selected) {
      if(selected !== '') {
        this.inputEmail = true;
      } else {
        this.inputEmail = false;
      }
    },
  },
};
</script>

<style scoped>

</style>
