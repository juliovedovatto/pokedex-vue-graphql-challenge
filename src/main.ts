import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueContentPlaceholders from 'vue-content-placeholders';

import App from './App.vue';
import apolloProvider from './apollo';
import router from './router';

import './style.scss';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueContentPlaceholders);

new Vue({
  router,
  render: (h) => h(App),
  apolloProvider,
}).$mount('#app');
