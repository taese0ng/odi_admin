const routes = [
  {
    path: '/signUp',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'signUp',
        path: '',
        component: () => import('pages/SignUp/SignUp.vue'),
      },
    ],
  },
  {
    path: '/find-password',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'findPassword',
        path: '',
        component: () => import('pages/FindPW/FindPW.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'login',
        path: '',
        component: () => import('pages/Login/Login.vue'),
      },
    ],
  },
  {
    path: '/my-page',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'myPage',
        path: '',
        component: () => import('pages/MyPage/MyPage.vue'),
      },
    ],
  },
  {
    path: '/member',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'normal',
        path: 'normal',
        component: () => import('pages/Member/Normal/Normal'),
        children: [
          {
            name: 'normalList',
            path: 'list',
            component: () => import('pages/Member/Normal/List.vue'),
          },
          {
            name: 'normalAdd',
            path: 'add',
            component: () => import('pages/Member/Normal/Add.vue'),
          },
          {
            name: 'normalDetail',
            path: 'detail/:id',
            component: () => import('pages/Member/Normal/Detail.vue'),
          },
        ],
      },
      {
        name: 'dormant',
        path: 'dormant',
        component: () => import('pages/Member/Dormant/Dormant.vue'),
        children: [
          {
            name: 'dormantList',
            path: 'list',
            component: () => import('pages/Member/Dormant/List.vue'),
          },
        ],
      },
      {
        name: 'withdrawal',
        path: 'withdrawal',
        component: () => import('pages/Member/Withdrawal/Withdrawal.vue'),
        children: [
          {
            name: 'withdrawalList',
            path: 'list',
            component: () => import('pages/Member/Withdrawal/List.vue'),
          },
        ],
      },
      {
        name: 'manager',
        path: 'manager',
        component: () => import('pages/Member/Manager/Manager.vue'),
        children: [
          {
            name: 'managerList',
            path: 'list',
            component: () => import('pages/Member/Manager/List.vue'),
          },
          {
            name: 'managerAdd',
            path: 'add',
            component: () => import('pages/Member/Manager/Add.vue'),
          },
          {
            name: 'managerDetail',
            path: 'detail/:id',
            component: () => import('pages/Member/Manager/Detail.vue'),
          },
        ],
      },
      {
        name: 'admin',
        path: 'admin',
        component: () => import('pages/Member/Admin/Admin.vue'),
        children: [
          {
            name: 'adminList',
            path: 'list',
            component: () => import('pages/Member/Admin/List.vue'),
          },
          {
            name: 'adminAdd',
            path: 'add',
            component: () => import('pages/Member/Admin/Add.vue'),
          },
          {
            name: 'adminDetail',
            path: 'detail/:id',
            component: () => import('pages/Member/Admin/Detail.vue'),
          },
        ],
      },
    ],
  },

  {
    path: '/about',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'weedleAcademy',
        path: 'weedleAcademy',
        component: () => import('pages/About/WeedleAcademy/WeedleAcademy.vue'),
      },
      {
        name: 'weedleApp',
        path: 'weedleApp',
        component: () => import('pages/About/WeedleApp/WeedleApp.vue'),
      },
      {
        name: 'company',
        path: 'company',
        component: () => import('pages/About/Company/Company.vue'),
      },
      {
        name: 'termsOfUse',
        path: 'termsOfUse',
        component: () => import('pages/About/TermsOfUse/TermsOfUse.vue'),
      },
      {
        name: 'personalInformation',
        path: 'personalInformation',
        component: () => import('pages/About/PersonalInformation/PersonalInformation.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
