import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
  }),
  actions: {
    setToken(jwt: string) {
      this.token = jwt;
    },
  },
});
