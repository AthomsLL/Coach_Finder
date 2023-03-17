export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      id: userId,
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas
    };

    const response = await fetch(`https://finder-coach-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`, {
      method: 'PUT',
      body: JSON.stringify(coachData)
    });

    const responseData = await response.json();

    if(!response.ok) {
      const error = new Error(responseData.message || 'Failed to register a Coach !');
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
      `https://finder-coach-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`
    );

    const responseData = await response.json();

    if(!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch !');
      throw error;
    }

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