export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters['auth/userId'];
    const coachData = {
      id: userId,
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas
    };

    const token = context.rootGetters['auth/token'];

    const response = await fetch(`${process.env.VUE_APP_API_BASE}/coaches/${userId}.json?auth=${token}`, {
      method: 'PUT',
      body: JSON.stringify(coachData)
    });

    // const responseData = await response.json();

    if(!response.ok) {
      const error = new Error(`${response.status} ${response.statusText}. Failed to register a Coach !`);
      throw error;
    }

    context.commit('registerCoach', {
      ...coachData,
    });
  },
  
  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const response = await fetch(
      `${process.env.VUE_APP_API_BASE}/coaches.json`
    );

    if(!response.ok) {
      const error = new Error(`${response.status} ${response.statusText}. Failed to fetch coaches !`);
      throw error;
    }

    const responseData = await response.json();

    const coaches = [];

    for (const key in responseData) {
      const coach = {
        id: responseData[key].id,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas
      };
      coaches.push(coach);
    }

    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');
  }
}