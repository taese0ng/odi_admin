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
              <q-input label-slot filled dense v-model="businessCondition"
              color="blue-grey-9" ref="businessCondition" hint="호프, 주점 도매업은 가입할 수 없습니다.">
                <template v-slot:label>
                  <div class="row all-pointer-events items-center necessary">
                    업태 (영어나 한자로 써있으면 소리 나는 대로 한글로 입력해주세요)
                  </div>
                </template>
                <template v-if="businessCondition" v-slot:append>
                  <q-icon name="close" @click.stop="businessCondition = ''" class="cursor-pointer"/>
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

        </div>

        <div class="row q-mb-md bg-grey-2 items-center q-pl-xs">
            <div class="col-12">
                <q-checkbox keep-color color="brown-13" v-model="agreeAD"
                    label="광고 이용 여부" class="q-mr-lg"/>
            </div>
        </div>
      </q-card-section>

      <q-card-actions>
          <q-btn color="red-6" class="full-width q-mb-sm" @click="onClickWithdrawal" label="회원탈퇴"/>            
          <q-btn color="brown-13" class="full-width q-mb-sm" @click="onClickCreate" label="회원가입"/>
          <q-btn color="blue-grey-8" class="full-width" @click="onClickCancel" label="취소"/>
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

export default {
  name: 'MyPage',

  components: {
    Header,
    Confirm,
    Alert,
    Dialog,
  },

  data () {
    return {
      title: '마이페이지',

      id: '',
      businessNum: '',
      email: '',
      name: '',
      password: '',
      passwordConfirm: '',
      phone: '',
      businessCondition: '',
      businessEvent: '',

      isDialog: false,
      isConfirm: false,
      isAlert: false,
      msg: '',
      confirmMethod: null,

      selectedTax: null,
      taxClassification: [
        { label: '일반과세자', value: 'normal' }, 
        { label: '간이과세자', value: 'simple' }, 
        { label: '법인과세자', value: 'artificial' }, 
        { label: '부가가치세 면세사업자', value: 'value_added' }, 
        { label: '면세법인 사업자', value: 'tax_free' }],
    
      agreeAD: false,
    };
  },

  methods: {
    onClickCreate () {
      this.msg = '생성하시겠습니까?';
      this.confirmMethod = this.createAdmin;
      this.isConfirm = true;
    },

    createAdmin() {
      if(!this.id) {
        this.msg = 'ID를 입력해주세요';
        this.isAlert = true;
      } else if(!this.password || !this.passwordConfirm || this.password !== this.passwordConfirm) {
        this.msg = '비밀번호를 확인해주세요!';
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
      } else if(!this.address1 || !this.zipCode) {
        this.msg = '주소를 입력해주세요!';
        this.isAlert = true;
      } else {
        console.log('created!');
      }
    },

    onClickCancel () {
      this.$router.back();
    },

    closeConfirm () {
      this.isConfirm = false;
    },

    onClickWithdrawal() {
      console.log('탈퇴');
    },
  },
};
</script>

<style scoped>

</style>
