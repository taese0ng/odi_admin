<template>
  <q-page padding>
    <Header :title="title" :subBtn='subBtn' class="q-mb-lg"/>
    
    <div class="row justify-center q-ma-xl" v-if="loading">
      <q-spinner
        color="primary"
        size="3em"
      />
    </div>

    <div v-else class="maxContainer-md q-mx-auto">
      <template v-for='item in rows'>
        <Card :key="item.id" :data="item" mode='story' class='q-my-md' 
        modifyBtn deleteBtn @onClickModify="onClickModify" @onClickDelete="onClickDelete"/>
      </template>
    </div>

    <Confirm v-if="isConfirm" :msg="msg" :confirmMethod="confirmMethod" @closeConfirm="closeConfirm"/>
    <Alert v-if="isAlert" :msg="msg" @closeAlert="isAlert = false"/>
  </q-page>
</template>

<script>
import rootStoreHelper from 'src/mixins/rootStoreHelper';
import Header from 'components/Header/Header';
import Confirm from 'components/Confirm/Confirm';
import Alert from 'components/Alert/Alert';
import API from 'src/repositories/CafeStory/ListAPI';
import Card from 'components/Card/Card';

export default {
  name: 'CafeStoryList',

  components: {
    Header,
    Confirm,
    Alert,
    Card,
  },
  
  mixins: [rootStoreHelper],

  data () {
    return {
      title: '사장님 카페 스토리 리스트',
      loading: true,
      subBtn: {
        title: '등록',
        method: () => {
          this.$router.push({ name: 'cafeStoryUpload' });
        },
      },

      isConfirm: false,
      isAlert: false,
      msg: '',
      confirmMethod: null,
      allCount: 10,
      currentPage: 1,
      searchValue: '',
      selectedOption: '',
      searchOptions: [
        { label: '회원명', value: 'name' },
        { label: '이메일', value: 'email' },
        { label: '휴대전화', value: 'phone' },
      ],

      sortOptions: ['가입일', '이름순', '최근로그인'],
      sortOption: '가입일',

      selectedItems: [],
      columns: [],
      rows: [],
      storyObj: [],
    };
  },

  created() {
    this.initNormalList();
  },

  methods: {
    async initNormalList() {
      const rows = [];

      const body = {
        cafe_srl: this.getCafeSrl,
      };
      const apiResult = await API.getStoryList(body);

      if(apiResult.status === 200 && apiResult.statusText === 'OK') {
        // console.log(apiResult);
        const data = apiResult.data;
        this.storyObj = data;
        data.forEach((item, idx) => {
          // const row = {
          //   id: item.story_srl,
          //   no: idx + 1,
          //   content: item.story_content,
          //   date: item.story_reg_date,
          // };
          const row = {
            srl: item.story_srl,
            content: item.story_content,
            date: item.story_reg_date,
            imgCount: item.story_image_count,
          };
          rows.push(row);
        });

        this.rows = rows;
        this.loading = false;
      } else {
        console.log(apiResult.response);
      }
    },

    onClickSearch () {
      // const route = this.$route.query;
    },

    optionChange(targetOptionValue) {
      this.selectedOption = targetOptionValue;
      // const route = this.$route.query;
    },

    onClickModify (targetRow) {
      if (targetRow !== null) {
        if (targetRow.srl) {
          const target = this.storyObj.find(x => x.story_srl === targetRow.srl);
          // console.log(target);
          this.$router.push({
            name: 'cafeStoryDetail',
            query: { id: target.story_srl },
            params: { storySrl: target.story_srl, content: target.story_content, imageCount: target.story_image_count },
          });
        }
      }
    },

    onClickDelete(targetRow) {
      // console.log(targetRow);
      this.msg = '삭제시키겠습니까?';
      this.confirmMethod = () => this.deleteStory(targetRow);
      this.isConfirm = true;
    },

    async deleteStory(targetRow) {
      const body = {
        cafe_srl: this.getCafeSrl,
        story_srl: targetRow.srl,
      };
      const apiResult = await API.deleteStory(body);
      if(apiResult.status === 200 && apiResult.statusText === 'OK') {
        // console.log(apiResult);
        this.initNormalList();
      } else {
        console.log(apiResult.reponse);
      }
    },

    closeConfirm() {
      this.isConfirm = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
