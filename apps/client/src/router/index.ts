import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../store/Auth/auth.store'; // Asegúrate de que el store esté correctamente importado
import MainLayout from '@/components/layout/MainLayout.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/LoginView.vue'),
      },
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: '/card-user-info/:id',
        name: 'card-user-info',
        component: () => import('@/views/InfoUser.vue'),
      },
      {
        path: '/update-user/:id',
        name: 'update-user',
        component: () => import('@/views/UpdateUser.vue'),
      },
      {
        path: '/create-user',
        name: 'create-user',
        component: () => import('@/views/CreateUser.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const token = useAuthStore().$state.token;

  if (!token && to.name !== 'login') {
    return next({ name: 'login' });
  }

  // Si hay un token, o la ruta es de login, permite la navegacion
  next();
});

export default router;
