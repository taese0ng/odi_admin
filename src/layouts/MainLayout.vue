<template>
  <q-layout view="hHh Lpr lff" class="container">
    <q-header elevated class="bg-brown-13 container">
      <q-toolbar>
        <q-btn v-if="getLoginInfo" flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title>{{ getCafeName }}</q-toolbar-title>
        <template v-if="getLoginInfo">
          <q-item-label class="items-center"
          style="margin-right: 12px; text-decoration: none; color: white">{{ getBusinessName }}</q-item-label>
          <q-btn flat color="white" no-caps label="Logout" @click='logout'/>
        </template>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      :width="300"
      :breakpoint="500"
      bordered
      content-class="bg-white"
    >
      <!-- show-if-above 없애야 닫힌 창으로 먼저 나옴 -->
      <q-scroll-area class="fit">
        <q-list v-for="(menuItem, index) in menuList" :key="index">
          <q-item clickable @click="menuItem.open = !menuItem.open">
            <q-item-section class="text-weight-bold col-10">
              {{ menuItem.label }}
            </q-item-section>
            <q-item-section class="col-2 row items-center justify-center">
              <q-icon
                size="sm"
                :name="
                  menuItem.open ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
                "
              />
            </q-item-section>
          </q-item>

          <q-slide-transition>
            <q-list v-show="menuItem.open" class="bg-brown-1">
              <q-item
                v-for="(subMenuItem, idx) in menuItem.subMenu"
                :key="idx"
                :to="subMenuItem.path"
                clickable
                active-class="text-brown-13"
                :active="subMenuItem.name === $route.matched[1].name"
              >
                <q-item-section style="padding-left: 12px">
                  {{ subMenuItem.label }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-slide-transition>

          <q-separator />
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container class="bg-origin">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// mixin
import rootStoreHelper from 'src/mixins/rootStoreHelper';
import { Cookies } from 'quasar';
import { mapGetters } from 'vuex';

const menuList = [
  {
    label: '회원관리',
    open: false,
    subMenu: [
      {
        label: '마이페이지',
        name: 'myPage',
        path: { name: 'myPage' },
      },
    ],
  },
  {
    label: '카페 정보 관리',
    open: false,
    subMenu: [
      {
        label: '기본 정보 입력 / 수정',
        name: 'cafeNormalInfo',
        path: { name: 'cafeNormalInfo' },
      },
      {
        label: '카페 관련 통계',
        name: 'statistics',
        path: { name: 'statistics' },
      },
    ],
  },
  {
    label: '카페 스토리 관리',
    open: false,
    subMenu: [
      {
        label: '카페 스토리 리스트',
        name: 'cafeStoryList',
        path: { name: 'cafeStoryList', query: { opt: 'name', search: '', page: 1 } },
      },
    ],
  },
  {
    label: '리뷰 관리',
    open: false,
    subMenu: [
      {
        label: '리뷰 탐색',
        name: 'reviewList',
        path: { name: 'reviewList', query: { opt: 'name', search: '', page: 1 } },
      },
    ],
  },
];

export default {
  mixins: [rootStoreHelper],

  data() {
    return {
      siteTitle: 'odi Admin',
      drawer: false,
      menuList,
      loginID: 'odi@address.com',
    };
  },

  methods: {
    logout() {
      if(Cookies.get('access_token')) {
        this.drawer = false;
        this.menuList.forEach(item => { item.open = false; });
        const option = {
          path: '/',
        };
        Cookies.remove('access_token', option);
        this.setIsLogin({ value: false });
        this.setCafeSrl({ cafe_srl: null, cafe_name: 'odiAdmin' });
        this.$router.push({ path: '/login' });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../css/MainLayout.scss";
</style>
