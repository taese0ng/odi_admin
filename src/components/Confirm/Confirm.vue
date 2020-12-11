<template>
  <q-dialog :value="true" persistent>
    <q-card class="q-pa-md">
      <q-card-section class="q-pa-none">
        <q-btn icon="close" size="12px" flat round dense @click="closeConfirm(false)"/>
      </q-card-section>
      <q-card-section class="text-h5">
        <q-avatar icon="warning" color="red-9" text-color="white"/>
        <span class="q-pl-md">{{ msg }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn size="14px" label="확인" color="blue-grey-8" @click="executeConfirmMethod"/>
        <q-btn size="14px" label="취소" color="blue-grey-8" @click="closeConfirm(false)"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'Confirm',

  props: {
    msg: {
      type: String,
      default: '',
    },
    confirmMethod: {
      type: [Function, Object],
      default: null,
    },
  },

  methods: {
    closeConfirm (flag) {
      this.$emit('closeConfirm', flag);
    },
    async executeConfirmMethod () {
      if (this.closeConfirm !== null) {
        await this.confirmMethod();
        this.$emit('closeConfirm', false);
      }
    },
  },
};
</script>

<style scoped>

</style>

<!-- 예시:
<Confirm v-if="isConfirm" :msg="msg" :confirmMethod="confirmMethod" @closeConfirm="closeConfirm"/>
data:{
  isConfirm: false,
  confirmMethod: null, // Confirm 확인시 실행 되는 함수.
  msg: 'Confirm에 띄울 내용',
},
methods:{
  closeConfirm(){this.isConfirm = false;}, //취소 버튼 누를때 실행
}
-->
