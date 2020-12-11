<template>
  <q-page padding>
    <Header :title="title"/>

    <q-card flat bordered class="q-mt-md">

      <q-card-section>
        <div>
          <label for="editor" class="necessary">내용작성</label>

          <textarea id="editor"></textarea>
        </div>
      </q-card-section>

      <q-card-actions class="row items-center justify-end q-pa-md">
        <q-btn color="red-5" class="btn-sm" @click="onClickView">
          미리보기
        </q-btn>
        <q-btn color="blue-6" class="btn-sm" @click="onClickSave">
          저장
        </q-btn>
      </q-card-actions>

    </q-card>

    <Confirm v-if="isConfirm" :msg="msg" :confirmMethod="confirmMethod" @closeConfirm="closeConfirm"/>
  </q-page>
</template>

<script>
import Header from 'components/Header/Header';
import Confirm from 'components/Confirm/Confirm';
import API from 'src/repositories/About/TermsOfUserAPI';

export default {
  name: 'TermsOfUse',

  components: {
    Header,
    Confirm,
  },

  data () {
    return {
      title: '이용약관',
      targetSunEditor: null,

      isConfirm: false,
      msg: '',
      confirmMethod: null,
    };
  },

  created() {
    this.initContents();
  },

  mounted () {
    this.targetSunEditor = this.$sunEditor('editor');
    this.targetSunEditor.setContents(this.initHTML);
  },

  methods: {
    async initContents() {
      console.log('Contents를 불러옵니다.');
      const apiResult = await API.readContents();
      // console.log(apiResult);
      if(apiResult.status === 200) {
        const data = apiResult.data;
        this.initHTML = data;
      } else {
        console.log(apiResult.response);
      }
      // this.initHTML = '<p>qwrqwrqwr</p>';
    },

    onClickSave() {
      this.msg = '저장하시겠습니까?';
      this.confirmMethod = this.saveContents;
      this.isConfirm = true;
    },

    onClickView() {
      console.log('view');
    },

    async saveContents() {
      console.log(this.targetSunEditor.getContents());
      const body = {
        html: this.targetSunEditor.getContents(),
      };
      const apiResult = await API.saveContents(body);

      if(apiResult.status === 201) {
        const data = apiResult.data;
        console.log(data);
      } else {
        console.log(apiResult.response);
      }
    },

    closeConfirm() {
      this.isConfirm = false;
    },
  },
};
</script>

<style scoped>

</style>
