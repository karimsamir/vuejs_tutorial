export default {
    requests(state, _, _2, rootGetters) {
        const coachId = rootGetters.userId; // get the current coach's ID
        // filter requests for the current coach
        const coachRequests = state.requests.filter(
            (request) => request.coachId === coachId
        );
        return coachRequests;
    },
    allRequests(state) {
    return state.requests;
    },
    hasRequests(_, getters) {
      return getters.requests && getters.requests.length > 0;
    }
};
