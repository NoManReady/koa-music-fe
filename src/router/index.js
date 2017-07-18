import Vue from 'vue'
import Router from 'vue-router'
const Home = r => require(['@/views/Home'], r)
const Popular = r => require(['@/views/home/Popular'], r)
const Classical = r => require(['@/views/home/Classical'], r)
const Light = r => require(['@/views/home/Light'], r)
const Radio = r => require(['@/views/home/Radio'], r)
const Swing = r => require(['@/views/home/Swing'], r)

const Notfound = r => require(['@/views/404'], r)
// import Recommend from '@/views/Recommend'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: to => {
        return '/home'
      }
    }, {
      path: '/home',
      name: 'home',
      redirect: '/home/popular',
      component: Home,
      children: [{
        path: 'popular',
        name: 'popular',
        component: Popular
      }, {
        path: 'classical',
        name: 'classical',
        component: Classical
      },
      {
        path: 'light',
        name: 'light',
        component: Light
      }, {
        path: 'radio',
        name: 'radio',
        component: Radio
      }, {
        path: 'swing',
        name: 'swing',
        component: Swing
      }]
    }, {
      path: '*',
      name: 'default',
      component: Notfound
    }
  ]
})
