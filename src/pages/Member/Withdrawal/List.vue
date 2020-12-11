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

    <Table title="" unlockBtn deleteBtn :rows="rows" :columns="columns" :selectedItems="selectedItems"
           @selection="(targetSelectedItems) => this.selectedItems = targetSelectedItems"
           :paginationOptions="paginationOptions" @onClickUnlock="onClickUnlock"
           @onClickDelete="onClickDelete"/>

    <div class="row justify-start q-my-lg">
      <q-btn class="btn-sm" no-caps color="green-9" label="Excel 저장" :disable="selectedItems.length===0"/>
      <q-btn class="q-mx-sm btn-sm" no-caps color="blue-grey-9" label="일괄 삭제" :disable="selectedItems.length===0"/>
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
  name: 'WithdrawalList',

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
      title: '탈퇴회원',
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
      sortOptions: ['탈퇴일', '가입일'],
      sortOption: '탈퇴일',

      selectedItems: [],
      columnLabels: ['번호', '이메일', '회원명', '휴대전화', '탈퇴사유', '가입일', '탈퇴일', '처리'],
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
          email: 'tskim@hnmcorp.kr',
          name: `${i + 1}번째사람`,
          phone: '010-1234-5678',
          reason: '탈퇴 사유를 표시합니다.',
          signUpDate: '2020.10.29',
          withdrawalDate: '2020.12.20 12:34:56',
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

    onClickUnlock (targetRow) {
      console.log(targetRow);
      this.msg = '철회하시겠습니까?';
      this.confirmMethod = this.unlockUser;
      this.isConfirm = true;
    },

    onClickDelete(targetRow) {
      console.log(targetRow);
      this.msg = '삭제하시겠습니까?';
      this.confirmMethod = this.deleteUser;
      this.isConfirm = true;
    },

    closeConfirm() {
      this.isConfirm = false;
    },

    unlockUser() {
      console.log('unlockUser');
    },

    deleteUser() {
      console.log('user deleted');
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
