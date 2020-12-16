<template>
  <header class="header row justify-between">
    <span class="header__title--lg q-pb-sm">{{ title }}</span>
    <q-btn
      v-if="subBtn.title"
      @click="subBtn.method"
      rounded color="brown-13"
      class="q-px-md q-my-xs" size="md"
      no-caps :label="subBtn.title"/>
    <q-separator/>
  </header>
</template>

<script>
export default {
  name: 'Header',

  props: {
    title: {
      type: String,
      default: '',
    },
    subBtn: {
      type: Object,
      default: () => {
        return {
          title: null,
          method: null,
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped>

</style>

<!-- 예시:
<Header title="Scope List" :subBtn="onClickAddProps"/>

data:{
  onCLickAddProps: {
  title: 'Add', //버튼의 이름
  methods: () => { //code } //버튼을 눌렀을 때 행위
  }
}
-->
