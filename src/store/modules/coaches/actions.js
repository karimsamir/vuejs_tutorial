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
};
