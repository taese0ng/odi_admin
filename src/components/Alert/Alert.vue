<template>
  <q-dialog :value="true" @hide="closeAlert">
    <q-card class="q-pa-md">
      <q-card-section class="q-pa-none">
        <q-btn icon="close" size="12px" flat round dense v-close-popup/>
      </q-card-section>
      <q-card-section class="text-h5">
        {{ msg }}
      </q-card-section>

      <q-card-actions align="center" class="q-pt-md">
        <q-btn label="확인" size="14px" color="blue-grey-8" v-close-popup/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'Alert',

  props: {
    msg: {
      type: String,
      default: '',
    },
  },

  methods: {
    closeAlert () {
      this.$emit('closeAlert');
    },
  },
};
</script>

<style scoped>

</style>

<!--예시:
<Alert v-if="isAlert" :msg="msg" @closeAlert="isAlert = false"/>
data:{
  isAlert: false,
  msg: 'Alert에 띄울 내용',
}
-->
