import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

/*
there is a problem of loading this app because Vanilla is loading ScriptFooter before Content,
so this method is waiting until root element is on the page and only then allows to mount the app
*/
function waitForRootElement() {
  return new Promise((resolve) => {
    const item = document.getElementById('app');
    if (item) {
      resolve();
    } else {
      setTimeout(() => {
        resolve(waitForRootElement());
      }, 200);
    }
  });
}

waitForRootElement().then(() => {
  const app = createApp(App);
  app.use(createPinia());
  app.mount('#app');
});
