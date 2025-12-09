export default {
    coaches(state) {
      return state.coaches;
    },
    hasCoaches(state) {
        return state.coaches && state.coaches.length > 0;
  },
    isCoach(_, getters, _2, rootGetters) {
        const userId = rootGetters.userId;
        return getters.coaches.some(coach => coach.id === userId);
  },
    shouldUpdate(state) {
        const lastFetch = state.lastFetch;
        if (!lastFetch) {
            return true;
        }
        const currentTimeStamp = new Date().getTime();
        return (currentTimeStamp - lastFetch) / 1000 > 60;
  },
};
