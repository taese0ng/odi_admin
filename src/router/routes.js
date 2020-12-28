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
    path: '/cafe-info',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'cafeNormalInfo',
        path: 'info',
        component: () => import('pages/CafeInfo/Normal/Normal.vue'),
      },
      {
        name: 'statistics',
        path: 'statistics',
        component: () => import('pages/CafeInfo/Statistics/Statistics.vue'),
      },
    ],
  },

  {
    path: '/cafe-story',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'cafeStoryUpload',
        path: 'upload',
        component: () => import('pages/CafeStory/Upload/Upload.vue'),

      },
      {
        name: 'cafeStoryList',
        path: 'list',
        component: () => import('pages/CafeStory/List/List.vue'),
      },
      {
        name: 'cafeStoryDetail',
        path: 'detail',
        component: () => import('pages/CafeStory/Detail/Detail.vue'),
      },
    ],
  },

  {
    path: '/cafe-review',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'reviewList',
        path: 'list',
        component: () => import('pages/Review/List/List.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    redirect: { name: 'statistics' },
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
