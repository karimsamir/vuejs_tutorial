import { createStore } from "vuex";
import coachesModule from "./modules/coaches/index.js";
// import requestsModule from "./modules/requests/index.js";
// import authModule from "./modules/auth/index.js";

const store = createStore({
    namepaced: true,
    modules: {
        coaches: coachesModule,
    },
});

export default store;