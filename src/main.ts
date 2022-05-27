import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from './router';
import { setupStore } from './store';

async function bootstrap() {
  const app = createApp(App);

  // Configure store
  setupStore(app);

  // // Initialize internal system configuration
  // initAppConfigStore();

  // // Register global components
  // registerGlobComp(app);

  // Configure routing
  setupRouter(app);

  // // router-guard
  // setupRouterGuard(router);

  // // Register global directive
  // setupGlobDirectives(app);

  // // Configure global error handling
  // setupErrorHandle(app);

  // https://next.router.vuejs.org/api/#isready
  // await router.isReady();

  app.mount('#app');
}

bootstrap();
