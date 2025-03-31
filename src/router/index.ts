// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import NewPaymentView from '@/views/NewPaymentView.vue'
import PaymentListView from '@/views/PaymentListView.vue'
import ThankYouView from '@/views/ThankYouView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/new-payment',
      name: 'new-payment',
      component: NewPaymentView
    },
    {
      path: '/payment-list',
      name: 'payment-list',
      component: PaymentListView
    },
    {
      path: '/thank-you/:paymentId',
      name: 'thank-you',
      component: ThankYouView,
      props: true
    }
  ]
})

export default router