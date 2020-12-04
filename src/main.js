import Vue from "vue";
import moment from "moment";
import VueMomentJS from "vue-momentjs";
Vue.use(VueMomentJS, moment);
import App from "./App.vue";
//import WebCam from "./webcam";

Vue.config.productionTip = false;

// function plugin(Vue) {
//   Vue.component("vue-web-cam", WebCam);
// }

// // Install by default if using the script tag
// if (typeof window !== "undefined" && window.Vue) {
//   window.Vue.use(plugin);
// }

// export default plugin;
// const version = "__VERSION__";
// // Export all components too
// export { WebCam, version };

new Vue({
  render: h => h(App),
}).$mount("#app");
