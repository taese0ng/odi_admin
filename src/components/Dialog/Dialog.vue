<template>
  <q-dialog v-model="isOpen" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">품종 검색</div>
      </q-card-section>

      <q-card-section>
        <div class="row items-center">
          <div class="col-8">
            <q-input label="검색어" v-model="search" dense filled/>
          </div>

          <div class="col-4 text-right">
            <q-btn label="검색" class="btn-sm" color="blue" @click="petsVarietySearch"/>
          </div>
        </div>
      </q-card-section>

      <q-separator/>

      <q-card-section style="max-height: 50vh; min-width: 500px" class="scroll">
        <q-table :data="data" :columns="columns" row-key="id" @row-click="onClickTableRow"/>
      </q-card-section>

      <q-separator/>

      <q-card-actions align="right">
        <q-btn label="취소" color="blue-grey-8" @click="closeDialog" class="btn-sm"/>
        <q-btn label="선택" color="primary" @click="closeDialog" class="btn-sm"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'Dialog',

  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },

  data () {
    return {
      search: '',

      columns: [
        { name: 'num', label: '번호', align: 'center', field: 'num' },
        { name: 'petsVarietyKR', label: '품종 명칭', align: 'center', field: 'petsVarietyKR' },
        { name: 'petsVarietyEN', label: '영문 명칭', align: 'center', field: 'petsVarietyEN' },
      ],
      data: [],
    };
  },

  methods: {
    closeDialog() {
      this.$emit('closeDialog');
    },

    async petsVarietySearch() {
      // const apiResult = await ...
      const rows = [];
      for(let i = 0; i < 10; i++) {
        const data = {
          id: i + 1,
          num: i + 1,
          petsVarietyKR: '품종',
          petsVarietyEN: 'breed',
        };
        rows.push(data);
      }
      this.data = rows;
    },

    onClickTableRow(e, row, index) {
      console.log(row);
    },
  },
};
</script>

<style scoped>

</style>
