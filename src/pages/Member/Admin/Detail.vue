<template>
  <q-page padding>
    <Header :title="title"/>

    <q-card flat bordered class="q-mt-md">
      <q-card-section>
        <div class="row q-mb-md bg-grey-2 q-pa-md ">
          <div class="col-2">
            구분 : 운영자
          </div>

          <div class="col-1">프로필 이미지</div>

          <div class="col-2 text-center">
            <q-img :src="imgUrl" style="height: 110px; max-width: 110px"/>
          </div>

          <div class="col-2 self-end">
            <q-btn label="이미지 등록" dense color="blue-6"/>
          </div>

          <div class="col-3">
            <div class="row">
              <div class="col-4">
                상태 :
              </div>
              <div class="col-8">
                <q-radio class="q-ml-sm q-mb-sm full-width" dense color="blue-grey-9"
                         v-model="status" val="run" label="사용중"/>
                <q-radio class="q-ml-sm full-width" dense color="blue-grey-9"
                         v-model="status" val="stop" label="정지"/>
              </div>

              <div class="col-12 q-mt-lg">
                <div class="text-grey">
                  <q-input label="사이트 표시명" filled dense v-model="adminName"
                           color="blue-grey-9" ref="adminName"/>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row q-mb-md">

          <div class="col-6 q-pr-md">
            <div class="text-grey">
              <q-input label-slot filled dense v-model="email"
                       color="blue-grey-9" ref="email" disable>
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

          <div class="col-6">
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

        </div>

        <div class="row q-mb-md">

          <div class="col-6 q-pr-md">
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

          <div class="col-6">
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

          <div class="col-1 necessary q-pl-sm">주소</div>

          <div class="col-2 q-pr-xs">
            <q-btn label="주소검색" class="full-width" @click="onClickAddressSearch"/>
          </div>

          <div class="col-2">
            <q-input dense class="bg-grey-5 q-ma-xs" filled v-model="zipCode" disable/>
          </div>

          <div class="col-4">
            <q-input dense class="bg-grey-5 q-ma-xs" filled v-model="address1" disable/>
          </div>

          <div class="col-3 text-grey">
            <q-input label="상세주소" filled dense v-model="address2"
                     color="blue-grey-9 q-ma-xs" ref="address2">
              <template v-if="address2" v-slot:append>
                <q-icon name="close" @click.stop="address2 = ''" class="cursor-pointer"/>
              </template>
            </q-input>
          </div>
        </div>

        <div class="row q-mb-md bg-grey-2 items-center q-pl-xs">

          <div class="col-2">
            <q-select color="blue-grey-9" filled label="반려동물 수" @input="createPetsRow"
                      v-model="petsNum" :options="petsNumOption" dense/>
          </div>

          <div class="col-2 text-center">
            구분
          </div>

          <div class="col-1 text-center">
            성별
          </div>

          <div class="col-1 text-center">
            중성화
          </div>

          <div class="col-4 text-center">
            품종
          </div>

          <div class="col-2 text-center">
            생년월
          </div>

        </div>

        <div v-for="(item,index) in petsRow" :key="index" class="row q-mb-sm bg-blue-4 items-center">
          <div class="col-2 q-pl-sm">반려동물 {{ index + 1 }}</div>

          <div class="col-2 text-center">
            <q-select color="blue-grey-9" filled label="선택" class="bg-grey-3 q-mr-xs"
                      v-model="item.petsType" :options="petsOption" dense/>
          </div>

          <div class="col-1 text-center">
            <q-select color="blue-grey-9" filled label="선택" class="bg-grey-3"
                      v-model="item.petsGender" :options="genderOption" dense/>
          </div>

          <div class="col-1 text-center">
            <q-checkbox keep-color color="blue-grey-9" v-model="item.neutralization"/>
          </div>

          <div class="col-4 text-grey text-center">
            <div class="row items-center">
              <div class="col-9">
                <q-input label="품종 검색으로 입력" filled dense v-model="item.petsVariety"
                         disable color="blue-grey-9" class="q-ma-xs bg-grey-3" ref="petsVariety">
                  <template v-if="item.petsVariety" v-slot:append>
                    <q-icon name="close" @click.stop="item.petsVariety = ''" class="cursor-pointer"/>
                  </template>
                </q-input>
              </div>

              <div class="col-3">
                <q-btn class="bg-grey-7 text-white" label="품종 검색" @click="isDialog=true"/>
              </div>
            </div>
          </div>

          <div class="col-2">
            <div class="row">
              <div class="col-6">
                <q-input label="년도" filled dense v-model="item.birthYear" class="q-ma-xs bg-grey-3"
                         color="blue-grey-9 " ref="birthYear">
                  <template v-if="item.birthYear" v-slot:append>
                    <q-icon name="close" @click.stop="item.birthYear = ''" class="cursor-pointer"/>
                  </template>
                </q-input>
              </div>

              <div class="col-6">
                <q-input label="월" filled dense v-model="item.birthMonth" class="q-ma-xs bg-grey-3"
                         color="blue-grey-9 " ref="birthMonth">
                  <template v-if="item.birthMonth" v-slot:append>
                    <q-icon name="close" @click.stop="item.birthMonth = ''" class="cursor-pointer"/>
                  </template>
                </q-input>
              </div>
            </div>
          </div>
        </div>

        <div class="row q-mb-md bg-grey-2 items-center q-pl-xs">
          <div class="col-1 q-pl-sm">권한</div>

          <div class="col-11">
            <q-checkbox keep-color color="blue-grey-9" v-model="power.chatBan"
                        label="채팅금지" class="q-mr-lg"/>
            <q-checkbox keep-color color="blue-grey-9" v-model="power.broadcastingBan"
                        label="방송참여금지" class="q-mr-lg"/>
            <q-checkbox keep-color color="blue-grey-9" v-model="power.commentsBan"
                        label="댓글작성금지" class="q-mr-lg"/>
          </div>

        </div>
      </q-card-section>

      <q-card-actions class="row items-center justify-end q-pa-sm">
        <q-btn color="blue-grey-8" class="btn-sm" @click="onClickDelete">
          계정삭제
        </q-btn>
        <q-btn color="blue-6" class="btn-sm" @click="onClickSave">
          저장
        </q-btn>
        <q-btn color="red-5" class="btn-sm" @click="onClickCancel">
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

export default {
  name: 'AdminDetail',

  components: {
    Header,
    Confirm,
    Alert,
    Dialog,
  },

  data () {
    return {
      title: '운영자 수정',

      imgUrl: defaultProfile,
      status: 'run',
      adminName: '',

      email: '',
      name: '',
      password: '',
      passwordConfirm: '',
      phone: '',

      isDialog: false,
      isConfirm: false,
      isAlert: false,
      msg: '',
      confirmMethod: null,

      zipCode: '',
      address1: '',
      address2: '',

      petsNumOption: [0, 1, 2, 3, 4, 5],
      petsOption: ['반려견', '반려묘', '기타 동물'],
      genderOption: ['암', '수'],
      petsNum: 0,

      petsRow: [
        // {
        //   petsType: null,
        //   petsGender: null,
        //   neutralization: false,
        //   petsVariety: '',
        //   birthYear: '',
        //   birthMonth: '',
        // },
      ],

      power: {
        chatBan: false,
        broadcastingBan: false,
        commentsBan: false,
      },
    };
  },

  methods: {
    closeConfirm () {
      this.isConfirm = false;
    },

    createPetsRow () {
      const row = [];

      for (let i = 0; i < this.petsNum; i++) {
        if (this.petsRow.length > i) {
          row.push(this.petsRow[i]);
        } else {
          const data =
            {
              petsType: null,
              petsGender: null,
              neutralization: false,
              petsVariety: '',
              birthYear: '',
              birthMonth: '',
            };
          row.push(data);
        }
      }

      this.petsRow = row;
    },

    onClickAddressSearch () {
      console.log('주소검색');
    },

    onClickDelete() {
      this.msg = '계정삭제 하겠습니까?';
      this.confirmMethod = () => {
        console.log('계정삭제');
      };
      this.isConfirm = true;
    },

    onClickSave() {
      console.log('저장');
      this.msg = '저장하시겠습니까?';
      this.confirmMethod = this.saveAdmin;
      this.isConfirm = true;
    },

    saveAdmin() {
      if (!this.password || !this.passwordConfirm || this.password !== this.passwordConfirm) {
        this.msg = '비밀번호를 확인해주세요!';
        this.isAlert = true;
      } else if (!this.name) {
        this.msg = '이름을 입력해주세요!';
        this.isAlert = true;
      } else if (!this.phone) {
        this.msg = '휴대전화를 입력해주세요!';
        this.isAlert = true;
      } else if (!this.address1 || !this.zipCode) {
        this.msg = '주소를 입력해주세요!';
        this.isAlert = true;
      } else {
        console.log('saved!');
      }
    },

    onClickCancel () {
      this.$router.back();
    },
  },
};
</script>

<style scoped>

</style>
