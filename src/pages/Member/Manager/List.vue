<template>
  <q-page padding>
    <Header :title="title" :subBtn="registerBtn"/>

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

    <Table title="" modifyBtn :rows="rows" :columns="columns" :selectedItems="selectedItems"
           @selection="(targetSelectedItems) => this.selectedItems = targetSelectedItems"
           :paginationOptions="paginationOptions" @onClickModify="onClickModify"/>

    <div class="row justify-start q-my-lg">
      <q-btn class="btn-sm" no-caps color="green-9" label="Excel 저장" :disable="selectedItems.length===0"/>
      <q-btn class="q-mx-sm btn-sm" no-caps color="blue-grey-9" label="E-mail" :disable="selectedItems.length===0"/>
      <q-btn class="btn-sm" no-caps color="blue-grey-9" label="SMS" :disable="selectedItems.length===0"/>
    </div>

    <div class="row justify-center">
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

export default {
  name: 'ManagerList',

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
      title: '강사/매니저',
      isConfirm: false,
      isAlert: false,
      msg: '',
      confirmMethod: null,
      allCount: 10,
      currentPage: 1,
      searchValue: '',
      selectedOption: '',
      searchOptions: [
        { label: '강사명', value: 'name' },
        { label: '이메일', value: 'email' },
        { label: '휴대전화', value: 'phone' },
      ],
      paginationOptions: {
        rowsPerPage: 10,
      },
      sortOptions: ['가입일', '이름순', '최근로그인'],
      sortOption: '가입일',
      registerBtn: {
        title: '등록',
        method: () => {
          this.$router.push({ name: 'managerAdd' });
        },
      },
      selectedItems: [],
      columnLabels: ['번호', '이메일', '간편로그인', '강사명', '휴대전화', '구분', '상태', '가입일', '최근로그인 일시', '처리'],
      columns: [],
      rows: [],
    };
  },

  created() {
    this.initColumns();
    this.initManagerList();
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
      this.initManagerList();
    },
  },

  methods: {
    initColumns() {
      this.columnLabels.forEach((label) => {
        const data = { label: label, align: 'center' };
        this.columns.push(data);
      });
    },

    async initManagerList() {
      // const route = this.$route.query;
      const rows = [];
      for(let i = 0; i < 10; i++) {
        const data = {
          id: i + 1,
          no: i + 1,
          email: 'tskim@hnmcorp.kr',
          logins: ['kakao', 'google', 'naver'],
          name: `${i + 1}번째 강사`,
          phone: '010-1234-5678',
          sortation: '강사',
          state: '사용중',
          signUpDate: '2020.10.29',
          recentLogin: '2020.10.29 12:34:56',
        };
        rows.push(data);
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
            name: 'managerDetail',
            params: { id: targetRow.id },
          });
        }
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
