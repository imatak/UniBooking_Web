import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Events from '@/components/Event/Events'
import PastEvents from '@/components/Event/PastEvents'
import CreateEvent from '@/components/Event/CreateEvent'
import Profile from '@/components/User/Profile'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'
import Event from '@/components/Event/Event'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/rezervacije_sve',
      name: 'Events',
      component: Events,
      beforeEnter: AuthGuard
    },
    {
      path: '/rezervacije_prosle',
      name: 'PastEvents',
      component: PastEvents
    },
    {
      path: '/Event/new',
      name: 'CreateEvent',
      component: CreateEvent,
      beforeEnter: AuthGuard
    },
    {
      path: '/events/:id',
      name: 'Event',
      props: true,
      component: Event
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }
  ],
  mode: 'history'
})
