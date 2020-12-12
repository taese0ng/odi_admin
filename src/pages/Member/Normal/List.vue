<template>
  <q-page padding>
    <Header :title="title"/>

    <SearchBar :searchOptions="searchOptions" :searchValue="searchValue"
               :selectedOption="selectedOption"
               @optionChange="(targetOptionValue) => optionChange(targetOptionValue)"
               @searchInput="(targetInputValue) => this.searchValue=targetInputValue"
               @onClickSearch="onClickSearch"/>

    <SearchResult :searchResultCount="allCount"
                  :size="paginationOptions.rowsPerPage"
                  :sortOptions="sortOptions"
                  :sortOption="sortOption"
                  @selectedSort="(targetSort) => setSortOption(targetSort)"
                  @selectedSize="(targetSize) => setRowsPerPage(targetSize)"/>

    <Table title="" modifyBtn withdrawalBtn :rows="rows" :columns="columns" :selectedItems="selectedItems"
           @selection="(targetSelectedItems) => this.selectedItems = targetSelectedItems"
           :paginationOptions="paginationOptions" @onClickModify="onClickModify"
           @onClickWithdrawal="onClickWithdrawal"/>

    <div class="row justify-center q-mt-md">
      <Pagination :itemLength="allCount"
                  :rowsPerPage="paginationOptions.rowsPerPage"
                  :maxPages="5" :movePage="movePage" :current="currentPage"/>
    </div>

    <Confirm v-if="isConfirm" :msg="msg" :confirmMethod="confirmMethod" @closeConfirm="closeConfirm"/>
    <Alert v-if="isAlert" :msg="msg" @closeAlert="isAlert = false"/>
  </q-page>
</template>

<script>
import Header from 'components/Header/Header';
import SearchBar from 'components/SearchBar/SearchBar';
import Table from 'components/Table/MemberTable';
import SearchResult from 'components/SearchResult/SearchResult';
import Pagination from 'components/Pagination/Pagination';
import Confirm from 'components/Confirm/Confirm';
import Alert from 'components/Alert/Alert';
import API from 'src/repositories/Member/NormalAPI';

export default {
  name: 'NormalList',

  components: {
    Table,
    SearchBar,
    Header,
    SearchResult,
    Pagination,
    Confirm,
    Alert,
  },

  data () {
    return {
      title: '회원정보 리스트',
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
      paginationOptions: {
        rowsPerPage: 10,
      },
      sortOptions: ['가입일', '이름순', '최근로그인'],
      sortOption: '가입일',

      selectedItems: [],
      columnLabels: ['번호', '아이디', '이름', '성별', '생년월일', '이메일', '전화번호', '처리'],
      columns: [],
      rows: [],
    };
  },

  created() {
    this.initColumns();
    this.initNormalList();
  },

  beforeMount () {
    const route = this.$route.query;
    this.selectedOption = this.searchOptions.find(opt => opt.value === route.opt);
    this.currentPage = parseInt(route.page);
    this.paginationOptions.rowsPerPage = parseInt(route.size);
    this.searchValue = this.$route.query.search;
  },

  watch: {
    '$route' () {
      this.initNormalList();
    },
  },

  methods: {
    initColumns() {
      this.columnLabels.forEach((label) => {
        const data = { label: label, align: 'center' };
        this.columns.push(data);
      });
    },

    async initNormalList() {
      // const route = this.$route.query;
      const rows = [];
      for(let i = 0; i < 10; i++) {
        const data = {
          id: i + 1,
          no: i + 1,
          nick: 'testID',
          name: `${i + 1}번째사람`,
          gender: '남',
          birth: '2020/12/13',
          email: 'test@naver.com',
          phone: '010-1234-5678',
        };
        rows.push(data);
      }

      // const route = this.$route.query;
      // const queryString = `${route.opt}=${route.search}&page=${route.page}&size=${route.size}`;
      // const apiResult = await API.getUsers(queryString);
      //
      // if(apiResult.status === 200) {
      //   const data = apiResult.data;
      //   console.log(data);
      //   data.forEach((item, idx) => {
      //     const row = {
      //       id: idx + 1,
      //       no: idx + 1,
      //       email: 'tskim@hnmcorp.kr',
      //       logins: ['kakao', 'google', 'naver'],
      //       name: `${idx + 1}번째사람`,
      //       phone: '010-1234-5678',
      //       pets: '1/1/2',
      //       state: '사용중',
      //       signUpDate: '2020.10.29',
      //       recentLogin: '2020.10.29 12:34:56',
      //     };
      //     rows.push(row);
      //   });
      // } else {
      //   console.log(apiResult.response);
      // }

      this.rows = rows;
    },

    onClickSearch () {
      // const route = this.$route.query;
    },

    optionChange(targetOptionValue) {
      this.selectedOption = targetOptionValue;
      // const route = this.$route.query;
    },

    movePage (current) {
      if(this.$route.query.page !== current.toString()) {
        this.currentPage = current;
        // const route = this.$route.query;
      }
    },

    setRowsPerPage (targetSize) {
      this.paginationOptions.rowsPerPage = targetSize;
      // const route = this.$route.query;
    },

    setSortOption(targetSort) {
      this.sortOption = targetSort;
    },

    onClickModify (targetRow) {
      if (targetRow !== null) {
        if (targetRow.id) {
          this.$router.push({
            name: 'normalDetail',
            params: { id: targetRow.id },
          });
        }
      }
    },

    onClickWithdrawal(targetRow) {
      console.log(targetRow);
      this.msg = '탈퇴시키겠습니까?';
      this.confirmMethod = this.withdrawalUser;
      this.isConfirm = true;
    },

    closeConfirm() {
      this.isConfirm = false;
    },

    withdrawalUser() {
      console.log('user withdrawalUser');
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
