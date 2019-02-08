import i18n from '../i18n/zh-CN.json';

export default {
  namespace: 'utils',
  state: {
    i18n,
    locale: 'zh-CN',
  },
  subscriptions: {
    // setup({ dispatch }) {
    //   // 设置locale
    //   dispatch({
    //     type: 'updateState',
    //     payload: {
    //       locale: window.locale,
    //       i18n: window.i18n,
    //     },
    //   });
    // },
  },
  effects: {
    * changeLocale({ payload }, { put }) {
      yield put({
        type: 'updateState',
        payload,
      });
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
