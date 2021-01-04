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
                      해시태그 (입력 후 Enter를 클릭하세요.)
                    </div>
                  </template>
                  <template v-if="hashTag" v-slot:append>
                    <q-icon name="close" @click.stop="hashTag = ''" class="cursor-pointer"/>
                  </template>
                </q-input>
              </q-form>
              
              <div class='q-pt-xs'>
                <template v-for='item in hashTags'>
                  <q-chip :key='item.content' removable @remove="removeChip(item)" color="brown-5" text-color="white">{{item.content}}</q-chip>
                </template>
              </div>
            </div>
          </div>

          <div class="col-12 q-mb-md bg-grey-2 q-pa-xs">
            <div class="q-pl-sm">카테고리</div>
            <div class="text-black">
              <template v-for='item in categories'>
                <q-checkbox :key='item.label' keep-color color="brown-5" 
                v-model="item.value" :label="item.label" class="q-mr-lg"/>
              </template>
            </div>
          </div>
    
          <div class="col-12 q-mb-md">
            <div class="row q-col-gutter-sm">
              <div class="col-4">
                <q-btn color="blue-grey-6" label="주소검색" class="full-width" @click="onClickAddressSearch"/>
              </div>
              <div class="col-8 text-grey">
                <q-input label-slot filled dense v-model="address"
                color="blue-grey-9" ref="address" disable>
                  <template v-slot:label>
                    <div class="row all-pointer-events items-center necessary">
                      주소
                    </div>
                  </template>
                </q-input>
              </div>
            </div>
          </div>

          <div v-if='!firstRegister' class="col-12 q-mb-md">
            <div class="row q-col-gutter-sm items-center">
              <div class="col-5">
                <div class="text-grey">
                  <q-input label-slot filled dense v-model="coupon"
                  color="blue-grey-9" ref="coupon">
                    <template v-slot:label>
                      <div class="row all-pointer-events items-center">
                        쿠폰 (10% or 20% ...)
                      </div>
                    </template>
                  </q-input>
                </div>
              </div>

              <div class="col-7">
                <div class="text-grey">
                  <q-input label="쿠폰 비밀번호" filled dense v-model="couponPassword"
                  color="blue-grey-9"/>
                </div>
              </div>
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
            <div class="row items-center q-col-gutter-sm">
              <div class="col-3 q-pl-md necessary">
                평일 영업시간
              </div>
              <div class="col-9">
                <div class="row q-col-gutter-sm items-center">
                  <div class="col-5">
                    <q-input v-model="weekOpenTime" color="brown-5" dense filled type="time"/>
                  </div>
                  <div class="col-2 text-center">
                    ~
                  </div>
                  <div class="col-5">
                    <q-input v-model="weekCloseTime" color="brown-5" dense filled type="time"/>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 q-mb-md">
            <div class="row items-center q-col-gutter-sm">
              <div class="col-3 q-pl-md necessary">
                주말 영업시간
              </div>
              <div class="col-9">
                <div class="row q-col-gutter-sm items-center">
                  <div class="col-5">
                    <q-input v-model="weekendOpenTime" color="brown-5" dense filled type="time"/>
                  </div>
                  <div class="col-2 text-center">
                    ~
                  </div>
                  <div class="col-5">
                    <q-input v-model="weekendCloseTime" color="brown-5" dense filled type="time"/>
                  </div>
                </div>
              </div>
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
            <div class="text-black row justify-between">
              <template v-for='item in convenience'>
                <q-checkbox :key='item.label' keep-color color="brown-5" 
                v-model="item.value" :label="item.label" class="col-4"/>
              </template>
              <div class="q-pl-sm q-gutter-sm items-center q-pb-sm">
                <div>
                  화장실
                </div>
                <q-radio dense v-model="toilet" val='0' label="없음" color="brown-5"/>
                <q-radio dense v-model="toilet" val='1' label="카페공용" color="brown-5"/>
                <q-radio dense v-model="toilet" val='2' label="건물공용" color="brown-5"/>
                <q-radio dense v-model="toilet" val='3' label="남녀구분" color="brown-5"/>
              </div>
            </div>
          </div>

          <div class="col-12 q-mb-md">
            <div class="text-grey">
              <q-input label-slot filled dense v-model="review"
                       color="blue-grey-9" ref="review">
                <template v-slot:label>
                  <div class="row all-pointer-events items-center necessary">
                    우리 카페 한줄소개
                  </div>
                </template>
                <template v-if="review" v-slot:append>
                  <q-icon name="close" @click.stop="review = ''" class="cursor-pointer"/>
                </template>
              </q-input>
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
              @input="val => inputFile(val)"
            />

            <Carousel v-if="imgUrls.length !== 0" :imgUrls="imgUrls" class='q-mt-sm'/>

            <q-btn :disable="filesImages.length===0" icon='delete' @click="removeImgAll"
            color="red" class='full-width q-mt-sm' dense/>
          </div>

          <div class="col-12 q-mb-md q-pa-sm bg-grey-2">
            <div class="row q-col-gutter-lg q-mr-xl">
              <div class="col" style="font-size: 3px;">
                분류 ex)음료, 디저트
              </div>
              <div class="col" style="font-size: 3px;">
                메뉴 이름
              </div>
              <div class="col" style="font-size: 3px;">
                가격 ex)1000
              </div>
            </div>
            <template v-for="(item) in menu">
              <div class='row q-mb-sm q-col-gutter-sm' :key="item.id">
                <div class='col-3'>
                  <q-input outlined label='분류 ex)음료,디저트' dense v-model="item.type"/>
                </div>
                <div class='col-4'>
                  <q-input outlined label="메뉴 이름" dense v-model="item.name"/>
                </div>
                <div class='col-3'>
                  <q-input outlined label="가격" type='number' dense v-model="item.price"/>
                </div>
                <div class='col-2 self-center'>
                  <q-btn icon="delete" color='red' class="full-width" @click='deleteMenu(item.id)'/>
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
    <Alert v-if="isAlert" :msg="msg" @closeAlert="closeAlert"/>
    <Dialog :isOpen="isDialog" @closeDialog="isDialog=false"/>
    <DaumPostcode :isPostcode="isPostcode" @hide="isPostcode=false" @complete="(e)=>getPostInfo(e)"/>
  </q-page>
</template>

<script>
import rootStoreHelper from 'src/mixins/rootStoreHelper';
import Header from 'components/Header/Header';
import Confirm from 'components/Confirm/Confirm';
import Alert from 'components/Alert/Alert';
import Dialog from 'components/Dialog/Dialog';
import defaultProfile from 'assets/defaultProfile.png';
import DaumPostcode from 'components/Dialog/DaumPostcodeDialog';
import Carousel from 'components/Card/Carousel';
import API from 'src/repositories/CafeInfo/NormalAPI';
import axios from 'axios';

export default {
  name: 'CafeNormalInfo',
  
  components: {
    Header,
    Confirm,
    Alert,
    Dialog,
    DaumPostcode,
    Carousel,
  },

  mixins: [rootStoreHelper],

  data () {
    return {
      title: '카페 정보 수정',
      googleKey: 'AIzaSyBcpTssmSZ9T_S5wf51tdVfoEhWTcOGo7s',
      firstRegister: false,

      address: '',
      hashTag: '',
      hashTags: [],
      tell: '',
      name: '',
      coupon: '',
      couponPassword: '',
      businessEvent: '',
      instagram: '',
      review: '',
      weekOpenTime: '',
      weekCloseTime: '',
      weekendOpenTime: '',
      weekendCloseTime: '',
      closedDay: '',
      cafeInfo: '',
      removeImg: 'N',
      latitude: '',
      filesImages: [],

      isDialog: false,
      isPostcode: false,
      isConfirm: false,
      isAlert: false,
      msg: '',
      confirmMethod: null,
    
      categories: [
        { label: '디저트', value: false },
        { label: '베이커리', value: false },
        { label: '브런치', value: false },
        { label: '애견동반', value: false },
        { label: '주택개조,한옥', value: false },
        { label: '루프탑', value: false },
        { label: '뷰', value: false },
        { label: '포토존', value: false },
      ],

      convenience: [
        { label: 'WiFi', value: false },
        { label: '주차가능', value: false },
        { label: '노키즈존', value: false },
        { label: '예약가능', value: false },
        { label: '단체가능', value: false },
        { label: '애견동반', value: false },
        { label: '편안한좌석', value: false },
        { label: '원두구매가능', value: false },
        { label: '직접원두로스팅', value: false },
        { label: '포장가능', value: false },
        { label: '핸드드립', value: false },
        { label: '굿즈판매', value: false },
        { label: '대관가능', value: false },
      ],

      toilet: '0',

      menu: [],
      imgUrls: [],
      closeAlert: () => { this.isAlert = false; },
    };
  },

  created() {
    if(this.getCafeSrl === 'firstPeople') {
      this.firstRegister = true;
      console.log('카페 생성모드');
    } else {
      this.initCafeInfo();
    }
  },

  methods: {
    getGeoCode() {
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(this.address)}&key=${this.googleKey}`)
        .then(res => {
          const data = res.data.results[0];
          this.latitude = `${data.geometry.location.lat},${data.geometry.location.lng}`;
        }).catch(err => err);
    },

    async initCafeInfo() {
      const body = {
        cafe_srl: this.getCafeSrl,
      };
      const apiResult = await API.getCafeInfo(body);
      // console.log(apiResult);
      if(apiResult.status === 200 && apiResult.statusText === 'OK') {
        const data = apiResult.data[0];
        this.name = data.cafe_name;
        data.cafe_tag.forEach(item => {
          this.hashTags.push({ content: item.tag_content });
        });
        this.address = data.cafe_address;
        this.getGeoCode(this.address);
        this.closedDay = data.cafe_closed_date;
        this.coupon = data.cafe_coupon;
        this.instagram = data.cafe_sns_account;
        this.tell = data.cafe_phone;
        this.review = data.cafe_oneline_intro;
        const weekTime = data.cafe_week_workday.split(' ');
        this.weekOpenTime = weekTime[0];
        this.weekCloseTime = weekTime[2];
        const weekendTime = data.cafe_weekend_workday.split(' ');
        this.weekendOpenTime = weekendTime[0];
        this.weekendCloseTime = weekendTime[2];
        this.cafeInfo = data.cafe_intro;
        for(let i = 0; i < data.cafe_info.length; i++) {
          if(i === data.cafe_info.length - 1) {
            this.toilet = data.cafe_info[i];
          } else if(data.cafe_info[i] === '1') {
            this.convenience[i].value = true;
          }
        }
        data.cafe_category.split(' ').forEach(item => {
          this.categories[this.categories.findIndex(x => x.label === item)].value = true;
        });
        data.menu.forEach((item, idx) => {
          this.menu.push({ id: idx, name: item.menu_name, price: item.menu_price, type: item.menu_type });
        });
        this.getImage(data.cafe_image_count);
      } else {
        console.log(apiResult.response);
      }
    },

    getImage(imageCount) {
      for(let i = 1; i <= imageCount; i++) {
        const queryString = `https://cafeodi.co.kr/api/normal/get_image?image_category_1=cafe&image_category_2=${this.getCafeSrl}&image_count=${i}`;
        this.imgUrls.push(queryString);
        this.filesImages.push(queryString);
      }
    },

    onClickSave () {
      this.msg = '저장하시겠습니까?';
      this.confirmMethod = this.saveCafe;
      this.isConfirm = true;
      // console.log(this.hashTags);
    },

    async saveCafe() {
      if(!this.name) {
        this.msg = '카페명을 입력해주세요';
        this.isAlert = true;
      } else if(this.hashTags.length === 0) {
        this.msg = '해시태그를 추가해주세요!';
        this.isAlert = true;
      }else if(!this.tell) {
        this.msg = '전화번호 입력해주세요!';
        this.isAlert = true;
      } else if(!this.review) {
        this.msg = '한줄평을 입력해주세요!';
        this.isAlert = true;
      } else if(!this.address) {
        this.msg = '주소를 입력해주세요!';
        this.isAlert = true;
      } else if(!this.weekOpenTime || !this.weekCloseTime || !this.weekendOpenTime || !this.weekendCloseTime) {
        this.msg = '영업시간을 입력해주세요!';
        this.isAlert = true;  
      } else if(!this.closedDay) {
        this.msg = '휴무일을 입력해주세요!';
        this.isAlert = true;
      } else {
        let category = '';
        this.categories.forEach(item => {
          if(item.value) {
            category += (item.label + ' ');
          }
        });
        category = category.slice(0, -1);

        let cafeInfo = '';
        this.convenience.forEach((item, idx) => {
          if(item.value) {
            cafeInfo += '1';
          } else {
            cafeInfo += '0';
          }
        });
        cafeInfo += this.toilet;

        const cafeMenu = [];
        this.menu.forEach(item => {
          cafeMenu.push({ menu_type: item.type, menu_name: item.name, menu_price: item.price });
        });

        if(this.firstRegister) { // register
          const body = new FormData();
          body.append('cafe_name', this.name);
          body.append('cafe_address', this.address);
          body.append('cafe_category', category);
          body.append('cafe_sns_account', this.instagram);
          body.append('cafe_phone', this.tell);
          body.append('cafe_intro', this.cafeInfo);
          body.append('cafe_oneline_intro', this.review);
          body.append('cafe_week_workday', `${this.weekOpenTime} ~ ${this.weekCloseTime}`);
          body.append('cafe_weekend_workday', `${this.weekendOpenTime} ~ ${this.weekendCloseTime}`);
          body.append('cafe_closed_date', this.closedDay);
          body.append('cafe_info', cafeInfo);
          body.append('cafe_latitude', this.latitude);
          body.append('cafe_menu', JSON.stringify(cafeMenu));
          body.append('cafe_tag', JSON.stringify(this.hashTags));
          this.filesImages.forEach(item => body.append('reg_file', item));
          // console.log('cafeInfo: ', cafeInfo);
          const apiResult = await API.registerCafe(body);
          if(apiResult.status === 200 && apiResult.statusText === 'OK') {
            // console.log(apiResult);
            if(apiResult.data.result === 'success') {
              this.dispatchGetSrl();
              this.msg = '카페 등록에 성공하였습니다.';
              this.isAlert = true;
              this.closeAlert = () => {
                this.$router.push({ name: 'statistics' });
              };
            }
          } else {
            console.log(apiResult.response);
          }
        } else { // save
          const body = new FormData();
          body.append('cafe_srl', this.getCafeSrl);
          body.append('cafe_name', this.name);
          body.append('cafe_address', this.address);
          body.append('cafe_latitude', this.latitude);
          body.append('cafe_category', category);
          body.append('cafe_sns_account', this.instagram);
          body.append('cafe_phone', this.tell);
          body.append('cafe_intro', this.cafeInfo);
          body.append('cafe_oneline_intro', this.review);
          body.append('cafe_week_workday', `${this.weekOpenTime} ~ ${this.weekCloseTime}`);
          body.append('cafe_weekend_workday', `${this.weekendOpenTime} ~ ${this.weekendCloseTime}`);
          body.append('cafe_closed_date', this.closedDay);
          body.append('cafe_info', cafeInfo);
          body.append('cafe_menu', JSON.stringify(cafeMenu));
          body.append('cafe_tag', JSON.stringify(this.hashTags));

          if(this.removeImg === 'Y') {
            body.append('remove_image_flag', this.removeImg);
            this.filesImages.forEach(item => body.append('reg_file', item));
          }
          const apiResult = await API.modifyCafe(body);
          if(apiResult.status === 200 && apiResult.statusText === 'OK') {
            // console.log(apiResult);
            const couponBody = {
              cafe_srl: this.getCafeSrl,
              request_type: 'coupon_reg',
              request_value: this.couponPassword,
              coupon_percent: this.coupon,
            };
            const couponResult = await API.setCoupon(couponBody);
            if(couponResult.status === 200 && couponResult.statusText === 'OK') {
              // console.log('Coupone: ', couponResult);
              this.msg = '카페 수정에 성공하였습니다.';
              this.isAlert = true;
              this.closeAlert = () => {
                this.$router.go();
              };
            } else {
              console.log(couponResult.response);
            }
          } else{
            console.log(apiResult.response);
          }
        }
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
      const item = { id: id, name: '', price: 0, type: '' };
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
        this.hashTags.push({ content: this.hashTag });
      }
      this.hashTag = '';
    },

    removeChip(item) {
      this.hashTags.splice(this.hashTags.indexOf(item), 1);
    },

    onClickAddressSearch() {
      this.isPostcode = true;
    },

    getPostInfo(info) {
      this.isPostcode = false;
      this.address = info.roadAddress;
      this.getGeoCode(this.address);
    },

    removeImgAll() {
      this.filesImages = [];
      this.imgUrls = [];
      this.removeImg = 'Y';
    },

    inputFile(imgs) {
      this.removeImg = 'Y';
      this.imgUrls = [];
      imgs.forEach(img => {
        this.imgUrls.push(URL.createObjectURL(img));
      });
    },
  },
};
</script>

<style scoped>

</style>
