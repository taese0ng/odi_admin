<template>
  <q-form class="row full-width q-pt-md q-pb-md">
    <div class="col-12 col-sm-10 row items-center q-pr-sm q-mb-sm">
      <q-select @input="(targetOptionValue) => $emit('optionChange', targetOptionValue)" :value="selectedOption"
                :options="searchOptions" color="blue-grey-9"
                label="검색어" dense class="col-3"/>
      <q-input label="검색명" :value="searchValue"
               @input="(targetInputValue) => $emit('searchInput', targetInputValue)" color="blue-grey-9"
               dense class="q-pl-md col-9"/>
    </div>
    <div class=" col-12 col-sm-2 row items-center">
      <q-btn type="submit" class="self-center full-width" color="brown-13" icon="search" label="검색"
             @click.prevent="$emit('onClickSearch')"/>
    </div>
  </q-form>
</template>

<script>
export default {
  name: 'SearchBar',

  props: {
    searchValue: {
      type: String,
      default: '',
    },
    searchOptions: {
      type: Array,
      default: [],
    },
    selectedOption: {
      type: [String, Object],
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>

</style>

<!-- 예시:
<SearchBar :searchOptions="searchOptions" :searchValue="searchValue"
               :selectedOption="selectedOption"
               @optionChange="(targetOptionValue) => optionChange(targetOptionValue)"
               @searchInput="(targetInputValue) => this.searchValue=targetInputValue"
               @onClickSearch="onClickSearch"/>

data:{
  searchOptions: [{label:'ID', value: 'id'}, {label: 'Code', value: 'code'}],
  searchValue: '',
  selectedOption: '',
},

methods:{
  optionChange(targetOptionValue){ this.selectedOption = targetOptionValue},
  onCLickSearch(){//검색시에 행할 행위}
}
-->
