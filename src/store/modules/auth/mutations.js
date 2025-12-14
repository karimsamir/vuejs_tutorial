export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    // state.tokenExpiration = payload.tokenExpiration;
    state.didAutoLogout = false;
  },

  clearUser(state) {
    state.token = null;
    state.userId = null;
  },
  setAutoLogout(state) {
    state.didAutoLogout = true;
  },
};
