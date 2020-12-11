<template>
  <div class="row full-width items-center justify-between q-pb-md">
    <div class="col-3">
      <q-badge class="q-pa-xs" color="blue-grey-9" multi-line>
        전체 : {{ searchResultCount }}
      </q-badge>
    </div>
    <div class="col-4">
      <div class="row justify-end">
        <div class="col-5 q-mr-md">
          <template v-if="sortOptions">
            <q-select :options="sortOptions" :value="sortOption" label="정렬"
                      @input="(targetSort) => $emit('selectedSort', targetSort)"
                      dense color="blue-grey-9"/>
          </template>
        </div>
        <div class="col-5">
          <q-select :options="options" :value="size" label="view"
                    @input="(targetSize) => $emit('selectedSize', targetSize)"
                    dense color="blue-grey-9"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchResult',

  props: {
    searchResultCount: {
      type: [String, Number],
      default: 0,
    },
    size: {
      type: [String, Number],
      default: 10,
    },
    sortOptions: {
      type: Array,
      default: null,
    },
    sortOption: {
      type: [String, Number],
      default: '',
    },
  },

  data () {
    return {
      options: [
        5, 10, 20, 50, 100,
      ],
    };
  },
};
</script>

<style scoped>

</style>

<!-- 예시:
<SearchResult :searchResultCount="allCount"
              :size="paginationOptions.rowsPerPage"
              @selectedSize="(targetSize) => setRowsPerPage(targetSize)"/>

data:{
  allCount: 0,
  paginationOptions:{rowsPerPage:5},
},

methods:{
  setRowsPerPage(targetSize){ this.paginationOptions.rowsPerPage = targetSize; }
}
-->
