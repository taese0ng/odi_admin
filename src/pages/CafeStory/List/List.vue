<template>
  <q-page padding>
    <Header :title="title" :subBtn='subBtn' class="q-mb-lg"/>

    <Table title="" modifyBtn deleteBtn :rows="rows" :columns="columns" :selectedItems="selectedItems"
           @selection="(targetSelectedItems) => this.selectedItems = targetSelectedItems"
            @onClickModify="onClickModify"
           @onClickDelete="onClickDelete"/>

    <Confirm v-if="isConfirm" :msg="msg" :confirmMethod="confirmMethod" @closeConfirm="closeConfirm"/>
    <Alert v-if="isAlert" :msg="msg" @closeAlert="isAlert = false"/>
  </q-page>
</template>

<script>
import rootStoreHelper from 'src/mixins/rootStoreHelper';
import Header from 'components/Header/Header';
import Table from 'components/Table/Table';
import Confirm from 'components/Confirm/Confirm';
import Alert from 'components/Alert/Alert';
import API from 'src/repositories/CafeStory/ListAPI';

export default {
  name: 'CafeStoryList',

  components: {
    Table,
    Header,
    Confirm,
    Alert,
  },
  
  mixins: [rootStoreHelper],

  data () {
    return {
      title: '사장님 카페 스토리 리스트',
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
      columnLabels: ['번호', '내용', '등록 일시', '처리'],
      columns: [],
      rows: [],
      storyObj: [],
    };
  },

  created() {
    this.initColumns();
    this.initNormalList();
  },

  methods: {
    initColumns() {
      this.columnLabels.forEach((label) => {
        const data = { label: label, align: 'center' };
        this.columns.push(data);
      });
    },

    async initNormalList() {
      const rows = [];

      const body = {
        cafe_srl: this.getCafeSrl,
      };
      const apiResult = await API.getStoryList(body);

      if(apiResult.status === 200 && apiResult.statusText === 'OK') {
        console.log(apiResult);
        const data = apiResult.data;
        this.storyObj = data;
        data.forEach((item, idx) => {
          const row = {
            id: item.story_srl,
            no: idx + 1,
            content: item.story_content,
            date: item.story_reg_date,
          };
          rows.push(row);
        });
      } else {
        console.log(apiResult.response);
      }
      this.rows = rows;
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
        if (targetRow.id) {
          const target = this.storyObj.find(x => x.story_srl === targetRow.id);
          console.log(target);
          this.$router.push({
            name: 'cafeStoryDetail',
            params: { storySrl: target.story_srl, content: target.story_content, imageCount: target.story_image_count },
          });
        }
      }
    },

    onClickDelete(targetRow) {
      console.log(targetRow);
      this.msg = '삭제시키겠습니까?';
      this.confirmMethod = () => this.deleteStory(targetRow);
      this.isConfirm = true;
    },

    async deleteStory(targetRow) {
      const body = {
        cafe_srl: this.getCafeSrl,
        story_srl: targetRow.id,
      };
      const apiResult = await API.deleteStory(body);
      if(apiResult.status === 200 && apiResult.statusText === 'OK') {
        console.log(apiResult);
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
