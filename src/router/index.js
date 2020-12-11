import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes';
import { Cookies } from 'quasar';
Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  });

  // 전역 vue rotuer navigation guard
  // Router.beforeEach((to, from, next) => {
  //   // if(!Cookies.get('access_token')) {
  //   //   return next('/login');
  //   // }
  //   console.log(to.name);
  //   if(to.name === 'signUp' || to.name === 'findPassword') {
  //     next();
  //   } else if(to.name === 'login') {
  //     if(Cookies.get('access_token')) {
  //       console.log('enter');
  //       return next({ path: 'normalList', query: { opt: 'name', search: '', page: 1, size: 10 } });
  //     }
  //   } else{
  //     if(!Cookies.get('access_token')) {
  //       console.log('enter');
  //       return next('/login');
  //     }
  //   }
  //   return next();
  // });

  return Router;
}
