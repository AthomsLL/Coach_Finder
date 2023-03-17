export default {
  async contactCoach(context, payload) {
    const newRequest = {
      coachId: payload.coachId,
      userEmail: payload.email,
      message: payload.message
    };

    const response = await fetch(`https://finder-coach-default-rtdb.europe-west1.firebasedatabase.app/requests.json`, {
      method: 'POST',
      body: JSON.stringify(newRequest)
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to send request.');
      throw error;
    }

    newRequest.id = responseData.name;

    context.commit('addRequest', newRequest);
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;

    const response = await fetch(`https://finder-coach-default-rtdb.europe-west1.firebasedatabase.app/requests.json`);

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch requests.');
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