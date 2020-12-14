<template>
  <div>
    <q-table
      :title="title"
      :data="rows"
      :columns="columns"
      row-key="id"
      selection="multiple"
      :selected.sync="selectedItems"
      @update:selected="onClickSelection"
      @row-click="onClickTableRow"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td>
            <q-checkbox color="grey-8" v-model="props.selected" />
          </q-td>
          <template v-for="(item, keyName) in props.row">
            <template v-if="keyName !== 'id'">
              <q-td :key="keyName" class="table__td text-center">
                <template v-if="keyName === 'logins'">
                  <template v-for="img in item">
                    <q-img
                      :key="img"
                      v-if="img === 'naver'"
                      :src="naverIcon"
                      style="height: 20px; width: 20px"
                    />
                    <q-img
                      :key="img"
                      v-if="img === 'kakao'"
                      :src="kakaoIcon"
                      style="height: 20px; width: 20px"
                    />
                    <q-img
                      :key="img"
                      v-if="img === 'google'"
                      :src="googleIcon"
                      style="height: 20px; width: 20px"
                    />
                  </template>
                </template>

                <template v-else>
                  <p class="q-ma-none table__td--ellipsis">{{ item }}</p>
                </template>
              </q-td>
            </template>
          </template>
          <q-td class="text-center">
            <template v-if="modifyBtn">
              <q-btn
                color="blue-grey-9"
                class="q-px-sm q-mr-xs"
                dense
                label="수정"
                @click="onClickModify(props.row)"
              />
            </template>

            <template v-if="unlockBtn">
              <q-btn
                color="blue-grey-9"
                class="q-px-sm q-mr-xs"
                dense
                label="철회"
                @click="onClickUnlock(props.row)"
              />
            </template>

            <template v-if="withdrawalBtn">
              <q-btn
                color="red-6"
                class="q-px-sm q-mr-xs"
                dense
                label="탈퇴"
                @click="onClickWithdrawal(props.row)"
              />
            </template>

            <template v-if="deleteBtn">
              <q-btn
                color="red-6"
                class="q-px-sm"
                dense
                label="삭제"
                @click="onClickDelete(props.row)"
              />
            </template>
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
import kakaoIcon from 'assets/icon/kakaoIcon.png';
import naverIcon from 'assets/icon/naverIcon.png';
import googleIcon from 'assets/icon/googleIcon.png';

export default {
  name: 'MemberTable',

  props: {
    title: {
      type: String,
      default: '',
    },
    mode: {
      type: String,
      default: '',
    },
    modifyBtn: {
      type: Boolean,
      default: false,
    },
    withdrawalBtn: {
      type: Boolean,
      default: false,
    },
    unlockBtn: {
      type: Boolean,
      default: false,
    },
    deleteBtn: {
      type: Boolean,
      default: false,
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

  computed: {
    getOptions: {
      get() {
        return this.paginationOptions;
      },
      set() {},
    },
  },

  data() {
    return {
      selectedItems: [],
      itemNo: Number(1),
      kakaoIcon: kakaoIcon,
      naverIcon: naverIcon,
      googleIcon: googleIcon,
    };
  },

  methods: {
    onClickTableRow(e, row, index) {
      // const resultIndex = this.selectedItems.findIndex((item) => item.id === row.id);
      //
      // if (resultIndex === -1) {
      //   this.selectedItems.push(row);
      // } else {
      //   this.selectedItems.splice(resultIndex, 1);
      // }
    },

    onClickSelection() {
      this.$emit('selection', this.selectedItems);
    },

    onClickUnlock(targetRow) {
      this.$emit('onClickUnlock', targetRow);
    },

    onClickModify(targetRow) {
      this.$emit('onClickModify', targetRow);
    },

    onClickDelete(targetRow) {
      this.$emit('onClickDelete', targetRow);
    },

    onClickWithdrawal(targetRow) {
      this.$emit('onClickWithdrawal', targetRow);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./Table.scss";
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
