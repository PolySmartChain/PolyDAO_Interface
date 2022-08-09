import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "@/assets/locales/index";
import message from "./components/message/index.js";
import VueClipboard from "vue-clipboard2";


// import vConsole from '@/assets/js/vconsole.js'

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(message);
Vue.use(VueClipboard);

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
