import dva from 'dva-inferno-no-router';
import models from './models';
import Index from './layout/main';

function start() {
  const app = dva();
  models.forEach(model => app.model(model));

  app.router(param => (
    <Index {...param} />
  ));

  app.start('#app');

  window._appStore = app._store;
}

start();
