export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;

    const coachData = {
      //   id: new Date().toISOString(),
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    const response = await fetch(
      // 'https://vue-http-demo-6f7c3-default-rtdb.firebaseio.com/coaches/' +
      `https://vue-coach-83b2b-default-rtdb.firebaseio.com/coaches/${userId}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(coachData),
      }
    );

      if (response.ok) {
        // const responseData = await response.json();
        context.commit('registerCoach', { ...coachData, id: userId });
      }


    // .then((response) => {
    //   if (!response.ok) {
    //     // error ...
    //   }
    //   // const responseData = await response.json();
    //   context.commit('registerCoach', coachData);
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
    //
    // context.commit('registerCoach', {...coachData, id: userId});
  },
  async loadCoaches(context) {
    // if (!payload.forceRefresh && !context.getters.shouldUpdate) {
    //   return;
    // }
    const response = await fetch(
      // 'https://vue-http-demo-6f7c3-default-rtdb.firebaseio.com/coaches.json'
      `https://vue-coach-83b2b-default-rtdb.firebaseio.com/coaches.json`
    );
      const data = await response.json();

    if (response.ok) {
      const coaches = [];
      for (const key in data) {
        const coach = {
          id: key,
          firstName: data[key].firstName,
          lastName: data[key].lastName,
          description: data[key].description,
          hourlyRate: data[key].hourlyRate,
          areas: data[key].areas,
        };
        coaches.push(coach);
      }
      console.log(coaches);
      context.commit('setCoaches', coaches);
      context.commit('setFetchTimestamp');
    }
    else {
      throw new Error(data.message || 'Failed to fetch!');
    }
      // .then((response) => {
      //   if (!response.ok) {
      //     throw new Error('Failed to fetch!');
      //   }
      //   return response.json();
      // })
      // .then((data) => {
      //   const coaches = [];
      //   for (const key in data) {
      //     const coach = {
      //       id: key,
      //       firstName: data[key].firstName,
      //       lastName: data[key].lastName,
      //       description: data[key].description,
      //       hourlyRate: data[key].hourlyRate,
      //       areas: data[key].areas,
      //     };
      //     coaches.push(coach);
      //   }
      //   context.commit('setCoaches', coaches);
      //   context.commit('setFetchTimestamp');
      // })
      // .catch((error) => {
      //   console.log(error);
      // });
  }
};
