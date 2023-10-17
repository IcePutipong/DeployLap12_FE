// 4.15 problem in line 4 and 22-26
import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import OrganizerView from '../views/OrganizerView.vue'
import AboutView from '../views/AboutView.vue'
import StudentView from '../views/StudentView.vue'
import EventDetailView from '@/views/event/EventDetailView.vue'
import EventEditView from '@/views/event/EventEditView.vue'
import EventRegisterView from '@/views/event/EventRegisterView.vue'
import EventLayoutView from '@/views/event/EventLayoutView.vue'
import AddEventView from '@/views/EventFormView.vue'
import AddOrganizerView from '@/views/OrganizerFormView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import NetworkErrorView from '../views/NetworkErrorView.vue'
import NProgress from 'nprogress'
import EventService from '@/services/EventService'
import { useEventStore } from '@/stores/event'
import OrganizerLayoutVue from '@/views/orgainzer/OrganizerLayout.vue'
import {useOrganizer } from '@/stores/organizer'
import OrganizerService from '@/services/OrganizerService'
import OrganizerDetailViewVue from '@/views/orgainzer/OrganizerDetailView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'EventList',
      component: EventListView,
      props: (route) => ({ page: parseInt(route.query?.page as string || '1') })
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/organizer',
      name: 'organizer',
      component: OrganizerView,
      props: (route) => ({ page: parseInt(route.query?.page as string || '1') })
    },
    {
      path: '/student',
      name: 'student',
      component: StudentView
    },
    {
      path:'/register',
      name:'register',
      component: RegisterView

    },
    {
      path: '/event/:id',
      name: 'event-layout',
      component: EventLayoutView,
      props: true,
      beforeEnter: (to) => {
        // <-- put API call here
        const eventStore = useEventStore()
        const id: number = parseInt(to.params.id as string)
        return EventService.getEventById(id)
          .then((response) => {
            //need to set up data for component
            eventStore.setEvent(response.data)
          }).catch((error) => {
            if (error.response && error.response.status === 404) {
              return {
                name: '404-resourse',
                params: { resoures: 'event' }
              }
            } else {
              return { name: 'network-error' }
            }
          })
      },
      children: [
        {
          path: 'detail',
          name: 'event-detail',
          component: EventDetailView,
          props: true
        },
        {
          path: 'edit',
          name: 'event-edit',
          component: EventEditView,
          props: true
        },
        {
          path: 'register',
          name: 'event-register',
          component: EventRegisterView,
          props: true
        },
      ]
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
    {
      path: '/404/:resource',
      name: '404-resource',
      component: NotFoundView,
      props: true
    },
    {
      path: '/network-error',
      name: 'network-error',
      component: NetworkErrorView
    },
    {
      path: '/add-event',
      name: 'add-event',
      component: AddEventView
    },
    {
      path: '/add-organizer',
      name: 'add-organizer',
      component: AddOrganizerView
    },
    {
      path: '/organizer/:id',
      name: 'organizer-layout',
      component: OrganizerLayoutVue,
      props: true,
      beforeEnter: (to) => {
        const id: number = parseInt(to.params.id as string)
        const organizationStore = useOrganizer()
        return OrganizerService.getOrganizerById(id)
            .then((response) => {
              // need to set up the data for the component
              organizationStore.setOrganizer(response.data)
            })
            .catch((error) => {
              if (error.response && error.response.status === 404) {
                return {
                  name: '404-resource',
                  params: { resource: 'organizer' }
                }
              } else {
                return { name: 'network-error' }
              }
            })
      },
      children:[
        {
          path: '',
          name: 'organizer-detail',
          component: OrganizerDetailViewVue

        }
      ]
    },{
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach(() => {
  NProgress.start()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
