<template>
  <q-page padding>
    <Header :title="title"/>

    <q-card flat bordered class="q-mt-md maxContainer-md q-mx-auto">
      <q-card-section>
        <div class="row">
          <div class="col-12 q-mb-md">
            <div class="text-grey">
              <q-input label-slot filled dense v-model="name"
              color="blue-grey-9" ref="name">
                <template v-slot:label>
                  <div class="row all-pointer-events items-center necessary">
                    카페명
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
              <q-form @submit.prevent='inputHashTag'>
                <q-input label-slot filled dense v-model="hashTag"
                color="blue-grey-9" ref="hashTag">
                  <template v-slot:label>
                    <div class="row all-pointer-events items-center necessary">
                      해시태그
                    </div>
                  </template>
                  <template v-if="hashTag" v-slot:append>
                    <q-icon name="close" @click.stop="hashTag = ''" class="cursor-pointer"/>
                  </template>
                </q-input>
              </q-form>
              
              <div class='q-pt-xs'>
                <template v-for='item in hashTags'>
                  <q-chip :key='item' removable @remove="removeChip(item)" color="primary" text-color="white">{{item}}</q-chip>
                </template>
              </div>
            </div>
          </div>

          <div class="col-12 q-mb-md bg-grey-2 q-pa-xs">
            <div class="q-pl-sm">카테고리</div>
            <div class="text-black">
              <template v-for='item in categories'>
                <q-checkbox :key='item.label' keep-color color="blue-grey-9" 
                v-model="item.value" :label="item.label" class="q-mr-lg"/>
              </template>
            </div>
          </div>
    
          <div class="col-12 q-mb-md">
            <div class="text-grey">
              <q-input label-slot filled dense v-model="address"
              color="blue-grey-9" ref="address">
                <template v-slot:label>
                  <div class="row all-pointer-events items-center necessary">
                    주소
                  </div>
                </template>
                <template v-if="address" v-slot:append>
                  <q-icon name="close" @click.stop="address = ''" class="cursor-pointer"/>
                </template>
              </q-input>
            </div>
          </div>

          <div class="col-12 q-mb-md">
            <div class="text-grey">
              <q-input label-slot filled dense v-model="coupon"
              color="blue-grey-9" ref="coupon">
                <template v-slot:label>
                  <div class="row all-pointer-events items-center">
                    쿠폰
                  </div>
                </template>
                <template v-if="coupon" v-slot:append>
                  <q-icon name="close" @click.stop="coupon = ''" class="cursor-pointer"/>
                </template>
              </q-input>
            </div>
          </div>

          <div class="col-12 q-mb-md">
            <div class="text-grey">
              <q-input label-slot filled dense v-model="instagram"
              color="blue-grey-9" ref="instagram">
                <template v-slot:label>
                  <div class="row all-pointer-events items-center">
                    인스타계정
                  </div>
                </template>
                <template v-if="instagram" v-slot:append>
                  <q-icon name="close" @click.stop="instagram = ''" class="cursor-pointer"/>
                </template>
              </q-input>
            </div>
          </div>
        </div>

          <div class="col-12 q-mb-md">
            <div class="text-grey">
              <q-input label-slot filled dense v-model="tell"
                       color="blue-grey-9" ref="tell">
                <template v-slot:label>
                  <div class="row all-pointer-events items-center necessary">
                    카페전화번호
                  </div>
                </template>
                <template v-if="tell" v-slot:append>
                  <q-icon name="close" @click.stop="tell = ''" class="cursor-pointer"/>
                </template>
              </q-input>
            </div>
          </div>

        <div class="row ">

          <div class="col-12 q-mb-md">
            <div class="text-grey">
              <q-input label-slot filled dense v-model="review"
                       color="blue-grey-9" ref="review">
                <template v-slot:label>
                  <div class="row all-pointer-events items-center necessary">
                    한줄평
                  </div>
                </template>
                <template v-if="review" v-slot:append>
                  <q-icon name="close" @click.stop="review = ''" class="cursor-pointer"/>
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
              <q-input label-slot filled dense v-model="weekdayTime"
                       color="blue-grey-9" ref="weekdayTime">
                <template v-slot:label>
                  <div class="row all-pointer-events items-center necessary">
                    평일 영업시간
                  </div>
                </template>
                <template v-if="weekdayTime" v-slot:append>
                  <q-icon name="close" @click.stop="weekdayTime = ''" class="cursor-pointer"/>
                </template>
              </q-input>
            </div>
          </div>

          <div class="col-12 q-mb-md">
            <div class="text-grey">
              <q-input label-slot filled dense v-model="weekendTime"
                       color="blue-grey-9" ref="weekendTime">
                <template v-slot:label>
                  <div class="row all-pointer-events items-center necessary">
                    주말 영업시간
                  </div>
                </template>
                <template v-if="weekendTime" v-slot:append>
                  <q-icon name="close" @click.stop="weekendTime = ''" class="cursor-pointer"/>
                </template>
              </q-input>
            </div>
          </div>

          <div class="col-12 q-mb-md">
            <div class="text-grey">
              <q-input label-slot filled dense v-model="closedDay"
                       color="blue-grey-9" ref="closedDay">
                <template v-slot:label>
                  <div class="row all-pointer-events items-center necessary">
                    휴무일
                  </div>
                </template>
                <template v-if="closedDay" v-slot:append>
                  <q-icon name="close" @click.stop="closedDay = ''" class="cursor-pointer"/>
                </template>
              </q-input>
            </div>
          </div>

          <div class="col-12 q-mb-md bg-grey-2 q-pa-xs">
            <div class="q-pl-sm necessary">편의정보</div>
            <div class="text-black">
              <template v-for='item in convenience'>
                <q-checkbox :key='item.label' keep-color color="blue-grey-9" 
                v-model="item.value" :label="item.label" class="q-mr-lg"/>
              </template>
            </div>
          </div>

          <div class="col-12 q-mb-md bg-grey-2 q-pa-sm">
            <q-input outlined autogrow type='textarea' label='카페안내' v-model='cafeInfo'/>
          </div>

          <div class="col-12 q-mb-md bg-grey-2 q-pa-sm">
            <q-file
              v-model="filesImages"
              filled
              label="이미지 업로드"
              multiple
              accept=".jpg, image/*"
              @rejected="onRejected"
            />
          </div>

          <div class="col-12 q-mb-md q-pa-sm bg-grey-2">
            <template v-for="(item) in menu">
              <div class='row q-mb-sm' :key="item.id">
                <div class='col-6 col-sm-7 q-pr-sm'>
                  <q-input outlined label="메뉴 이름" dense v-model="item.name"/>
                </div>
                <div class='col-3 q-pr-sm'>
                  <q-input outlined label="가격" type='number' dense v-model="item.price"/>
                </div>
                <div class='col-3 col-sm-2 self-center'>
                  <q-btn label="삭제" color='red' class="full-width" @click='deleteMenu(item.id)'/>
                </div>
              </div>
            </template>
            <q-btn label='메뉴 추가' class='full-width' color='primary' @click='addMenu'/>
          </div>

        </div>
      </q-card-section>

      <q-card-actions>
          <q-btn color="brown-13" class="full-width q-mb-sm" @click="onClickSave" label="저장"/>
          <q-btn color="red-6" class="full-width" @click="onClickCancel" label="취소"/>
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
  name: 'CafeNormalInfo',

  components: {
    Header,
    Confirm,
    Alert,
    Dialog,
  },

  data () {
    return {
      title: '카페 기본 정보 입력 / 수정',

      address: '',
      hashTag: '',
      hashTags: ['test', 'test2', 'test3'],
      tell: '',
      name: '',
      phone: '',
      coupon: '',
      businessEvent: '',
      instagram: '',
      review: '',
      weekdayTime: '',
      weekendTime: '',
      closedDay: '',
      cafeInfo: '',

      filesImages: null,

      isDialog: false,
      isConfirm: false,
      isAlert: false,
      msg: '',
      confirmMethod: null,
    
      categories: [
        { label: '카테고리1', value: false },
        { label: '카테고리2', value: false },
        { label: '카테고리3', value: false },
        { label: '카테고리4', value: false },
      ],

      convenience: [
        { label: 'WiFi', value: false },
      ],

      menu: [
        { id: 0, name: '', price: 0 },
      ],
    };
  },

  methods: {
    onClickSave () {
      this.msg = '저장하시겠습니까?';
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

    onRejected (rejectedEntries) {
      // Notify plugin needs to be installed
      // https://quasar.dev/quasar-plugins/notify#Installation
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
      });
    },

    addMenu() {
      let id = 0;
      if(this.menu.length !== 0) {
        id = this.menu[this.menu.length - 1].id + 1;
      }
      const item = { id: id, name: '', price: 0 };
      this.menu.push(item);
    },

    deleteMenu(id) {
      for(let i = 0; i < this.menu.length; i++) {
        if(this.menu[i].id === id) {
          this.menu.splice(i, 1);
          break;
        }
      }
    },

    inputHashTag() {
      if(this.hashTags.indexOf(this.hashTag) === -1) {
        this.hashTags.push(this.hashTag);
      }
      this.hashTag = '';
    },

    removeChip(item) {
      this.hashTags.splice(this.hashTags.indexOf(item), 1);
    },
  },
};
</script>

<style scoped>

</style>
