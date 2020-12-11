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

    <div class="row justify-center q-mt-lg">
      <Pagination :itemLength="allCount"
                  :rowsPerPage="paginationOptions.rowsPerPage"
                  :maxPages="5" :movePage="movePage" :current="currentPage"/>
    </div>
  </q-page>
</template>

<script>
import Header from 'components/Header/Header';
import SearchBar from 'components/SearchBar/SearchBar';
import Table from 'components/Table/MemberTable';
import SearchResult from 'components/SearchResult/SearchResult';
import Pagination from 'components/Pagination/Pagination';

export default {
  name: 'AdminList',

  components: {
    Table,
    SearchBar,
    Header,
    SearchResult,
    Pagination,
  },

  data () {
    return {
      title: '운영자',

      allCount: 10,
      currentPage: 1,
      searchValue: '',
      selectedOption: '',
      searchOptions: [
        { label: '이름', value: 'name' },
        { label: '이메일', value: 'email' },
        { label: '부서/담당업무', value: 'department' },
        { label: '전화번호', value: 'phone' },
      ],
      paginationOptions: {
        rowsPerPage: 10,
      },
      sortOptions: ['가입일', '이름순', '최근로그인'],
      sortOption: '가입일',
      registerBtn: {
        title: '등록',
        method: () => {
          this.$router.push({ name: 'adminAdd' });
        },
      },
      selectedItems: [],
      columnLabels: ['번호', '이메일', '이름', '부서/담당업무', '전화번호', '상태', '최근로그인 일시', '처리'],
      columns: [],
      rows: [],
    };
  },

  created() {
    this.initColumns();
    this.initAdminList();
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
      this.initAdminList();
    },
  },

  methods: {
    initColumns() {
      this.columnLabels.forEach((label) => {
        const data = { label: label, align: 'center' };
        this.columns.push(data);
      });
    },

    async initAdminList() {
      // const route = this.$route.query;
      const rows = [];
      for(let i = 0; i < 10; i++) {
        const data = {
          id: i + 1,
          no: i + 1,
          email: 'tskim@hnmcorp.kr',
          name: `${i + 1}번째 운영자`,
          department: '부서명/담당업무',
          phone: '010-1234-5678',
          state: '사용중',
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
            name: 'adminDetail',
            params: { id: targetRow.id },
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
