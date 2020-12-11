<template>
  <q-pagination
    v-model="currentPage"
    v-if="pagesNumber>0"
    :max="pagesNumber"
    :max-pages="maxPages"
    :ellipses="false"
    :boundary-numbers="false"
    :direction-links="true"
    :boundary-links="true"
    icon-first="first_page"
    icon-last="last_page"
    icon-prev="chevron_left"
    icon-next="chevron_right"
    color="blue-grey-9"
    @input="setPage"
  >
  </q-pagination>
</template>

<script>
export default {
  name: 'Pagination',

  props: {
    maxPages: {
      type: Number,
      default: 1,
    },
    movePage: {
      type: Function,
      default: () => {
        console.log(this.current);
      },
    },
    itemLength: {
      type: Number,
      default: 1,
    },
    rowsPerPage: {
      type: Number,
      default: 1,
    },
    current: {
      type: Number,
      default: 1,
      required: true,
    },
  },

  data() {
    return{
      currentPage: this.current,
    };
  },

  computed: {
    pagesNumber () {
      return Math.ceil(this.itemLength / this.rowsPerPage);
    },
  },

  methods: {
    setPage() {
      this.movePage(this.currentPage);
    },
  },
};
</script>

<style scoped>

</style>

<!-- 예시:
<Pagination :itemLength="allCount" :rowsPerPage="this.paginationOptions.rowsPerPage" :maxPages="5" :movePage="movePage" :current="current"/>
data:{
  allCount: 0, // Table에 띄울 데이터의 총 갯수
  paginationOptions:{
    rowsPerPage: 5
  },
  current: 1, // 현재페이지
},
methods:{
  movePage(current) {this.current = current; // 페이지 이동시에 행할 것.}
}
-->
