export default {
  async signup(context, payload) {
    // signup logic
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBqpt2b9FzsTBZKlhhY0UcaXlR_tzeerYo',
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      console.warn(responseData);

      const errorMessage = responseData.message || 'Failed to authenticate.';
      throw new Error(errorMessage);
    }

    console.log(responseData);
    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    });
  },
  // login(context, payload) {
  //   // login logic
  // },
};
