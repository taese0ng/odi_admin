<template>
  <div>
    <q-table
      :title="title"
      :data="rows"
      :columns="columns"
      row-key="id"
      virtual-scroll
      hide-selected-banner
      hide-pagination
      :pagination.sync="paginationOptions"
      :rows-per-page-options="[0]"
    >
      <template v-slot:body="props" >
        <q-tr :props="props">
          <template v-for="(item, keyName) in props.row">
            <template v-if="keyName !== 'id'">
              <q-td :key="keyName" class="table__td">
                <p class="q-ma-none table__td--ellipsis text-center">{{ item }}</p>
              </q-td>
            </template>
          </template>
          <q-td class="text-center">
            <q-btn color="blue-grey-9 q-px-sm q-mr-xs" size="md" dense
                   label="해제" @click="onClickUnlock(props.row)"/>
          </q-td>
        </q-tr>
      </template>

      <template v-slot:no-data="{ icon, message, filter }">
        <div class="full-width row flex-center q-gutter-sm">
          <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
          <span>데이터가 없습니다.</span>
        </div>
      </template>
    </q-table>

  </div>
</template>

<script>
export default {
  name: 'PoliceRecordsTable',

  props: {
    title: {
      type: String,
      default: '',
    },
    rows: {
      type: Array,
      default: [],
    },
    columns: {
      type: Array,
      default: [],
    },
  },

  data () {
    return {
      selectedItems: [],
      itemNo: Number(1),
      paginationOptions: {
        rowsPerPage: 0,
      },
    };
  },

  methods: {
    onClickUnlock (targetRow) {
      this.$emit('onClickUnlock', targetRow);
    },
  },
};
</script>

<style lang="scss" scoped>
@import './Table.scss';
</style>

<!-- 예시 -->
<!--<Table title="" :rows="rows" :columns="columns" :selectedItems="selectedItems"-->
<!--       @selection="(targetSelectedItems) => this.selectedItems = targetSelectedItems"-->
<!--       :paginationOptions="paginationOptions" @onClickRead="onClickRead"-->
<!--       @onClickDelete="onClickDelete"/>-->
<!--
data:{
  columns: [
        {
          name: 'No',
          label: 'No',
          align: 'left',
          sortable: false,
        },
        ... {...} ...
      ],
   rows: [
        {
          id: 1,
          no: 1,
          code: 'nxBd4a7~DUddt_2P8FlO.Lw8OzrBzIEa-4qJG4krGEmwXMX1QclIo24~4yyHeb7m',
          ... // column에 맞춰서 적을 것.
        },
        ... {...} ...
      ],
  selectedItems: [],
  paginationOptions: {
    // sortBy: 'desc',
    // descending: false,
    page: 1,
    rowsPerPage: 10,
  }
},

methods:{
  onClickRead() { //상세정보 버튼을 눌렀을때 },
  onClickDelete() { //삭제버튼을 눌렀을떄 },
}
-->
