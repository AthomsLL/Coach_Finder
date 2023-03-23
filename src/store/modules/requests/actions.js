export default {
  async contactCoach(context, payload) {
    const newRequest = {
      coachId: payload.coachId,
      userEmail: payload.email,
      message: payload.message
    };

    const response = await fetch(`${process.env.VUE_APP_API_BASE}/requests.json`, {
      method: 'POST',
      body: JSON.stringify(newRequest)
    });

    if (!response.ok) {
      const error = new Error(`${response.status} ${response.statusText}. Failed to send request.`);
      throw error;
    }

    const responseData = await response.json();

    newRequest.id = responseData.name;

    context.commit('addRequest', newRequest);
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters['auth/userId'];

    const response = await fetch(`${process.env.VUE_APP_API_BASE}/requests.json`);

    if (!response.ok) {
      const error = new Error(`${response.status} ${response.statusText}. Failed to fetch requests.`);
      throw error;
    }

    const responseData = await response.json();

    const requests = [];

    for (const key in responseData) {
      if (coachId === responseData[key].coachId) {
        const request = {
          id: key,
          coachId: responseData[key].coachId,
          message: responseData[key].message,
          userEmail: responseData[key].userEmail
        };

        requests.push(request);
      }
    }

    context.commit('setRequests', requests);
  }
}