import Vue from 'vue'
import VueRouter from 'vue-router'
import MovieView from '@/views/MovieView'
import DetailView from '@/views/DetailView'
import ChoiceView from '@/views/ChoiceView'
import LogInView from '@/views/LogInView'
import SignUpView from '@/views/SignUpView'
import ProfileView from '@/views/ProfileView'
import SearchView from '@/views/SearchView'
import ActorView from '@/views/ActorView'
import AboutView from '@/views/AboutView'
import TrailerShow from '@/components/TrailerShow'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'movie',
    component: MovieView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/choice',
    name: 'choice',
    component: ChoiceView
  },
  {
    path: '/login',
    name: 'login',
    component: LogInView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView
  }, 
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  }, 
  {
    path: '/search/:movie_title',
    name: 'search',
    component: SearchView
  }, 
  {
    path: '/trailer/:movie_title',
    name: 'trailer',
    component: TrailerShow
  }, 
  {
    path: '/movies/:movie_id',
    name: 'detail',
    component: DetailView
  },
  {
    path: '/actor/:actor_id',
    name: 'actor',
    component: ActorView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
