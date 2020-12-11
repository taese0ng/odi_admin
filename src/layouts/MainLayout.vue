<template>
  <q-layout view="hHh Lpr lff" class="container">
    <q-header elevated class="bg-blue-grey-10 container">
      <q-toolbar>
        <q-btn v-if="getLoginInfo.isLogin" flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title>{{ siteTitle }}</q-toolbar-title>
        <template v-if="getLoginInfo.isLogin">
          <q-item class="items-center" to='/my-page' 
          style="margin-right: 12px; text-decoration: none; color: white">{{ getLoginInfo.name }}</q-item>
          <q-btn flat color="white" no-caps label="Logout" @click='logout'/>
        </template>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      :width="300"
      :breakpoint="500"
      bordered
      content-class="bg-grey-3"
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
            <q-list v-show="menuItem.open" class="bg-grey-4">
              <q-item
                v-for="(subMenuItem, idx) in menuItem.subMenu"
                :key="idx"
                :to="subMenuItem.path"
                clickable
                active-class="text-indigo-14"
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
    <q-page-container>
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
        label: '일반회원',
        name: 'normal',
        path: {
          name: 'normalList',
          query: { opt: 'name', search: '', page: 1, size: 10 },
        },
      },
      {
        label: '휴면회원',
        name: 'dormant',
        path: {
          name: 'dormantList',
          query: { opt: 'name', search: '', page: 1, size: 10 },
        },
      },
      {
        label: '탈퇴회원',
        name: 'withdrawal',
        path: {
          name: 'withdrawalList',
          query: { opt: 'name', search: '', page: 1, size: 10 },
        },
      },
      {
        label: '강사/매니저',
        name: 'manager',
        path: {
          name: 'managerList',
          query: { opt: 'name', search: '', page: 1, size: 10 },
        },
      },
      {
        label: '운영자',
        name: 'admin',
        path: {
          name: 'adminList',
          query: { opt: 'name', search: '', page: 1, size: 10 },
        },
      },
    ],
  },
  {
    label: '기본정보관리',
    open: false,
    subMenu: [
      {
        label: 'About Weedle 아카데미',
        name: 'weedleAcademy',
        path: { name: 'weedleAcademy' },
      },
      {
        label: 'About Weedle App',
        name: 'weedleApp',
        path: { name: 'weedleApp' },
      },
      {
        label: '회사소개',
        name: 'company',
        path: { name: 'company' },
      },
      {
        label: '이용약관',
        name: 'termsOfUse',
        path: { name: 'termsOfUse' },
      },
      {
        label: '개인정보 처리방침',
        name: 'personalInformation',
        path: { name: 'personalInformation' },
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

  computed: {
    ...mapGetters(['getLoginInfo']),
  },

  methods: {
    logout() {
      Cookies.remove('access_token');
      this.$router.push({ name: 'login' });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../css/MainLayout.scss";
</style>
