<template>
  <q-dialog v-model="isOpen">
    <q-card>
      <vue-daum-postcode @complete="$emit('complete', $event)"/>
    </q-card>
  </q-dialog>
</template>

<script>
import { VueDaumPostcode } from 'vue-daum-postcode';

export default {
  name: 'DaumPostcodeDialog',
  components: {
    VueDaumPostcode,
  },

  props: {
    isPostcode: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    isOpen: {
      get() {
        return this.isPostcode;
      },
      set() {
        this.$emit('hide');
      },
    },
  },
};
</script>

<style scoped>

</style>
