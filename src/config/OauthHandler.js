import UserManager from './UserManager.js'
import NetworkManager from './NetworkManager.js'


let unauthorizedRequestQueue = [];
let isRefreshingToken = false;

const retryHandler = async (error) => {
  
  // check if error is not 401 or is not unauthorized type
  if (!error.response) {
    return Promise.reject(error);
  }

  if (error.response.status !== 401) {
    return Promise.reject(error);
  }

  // origin config
  const orgConfig = error.config;

  // check if orgConfig contain Authorization key
  if (!orgConfig.headers[HeaderKey.Authorization]) {
    return Promise.reject(error);
  }

  //================== 401 Unauthorized ================== 

  // create new promise
  let newReqPromise = new Promise((resolve, reject) => {

    const callback = async (success) => {
      if (success !== true) {
        reject(error)
      }

      try {
        const resp = await NetworkManager.request(orgConfig);
        resolve(resp);
      } catch (e) {
        reject(e);
      }
    };

    // add callback
    unauthorizedRequestQueue.push(callback);
  });

  // create request to refresh token
  if (isRefreshingToken === false) {
    isRefreshingToken = true;

    // get token
    UserManager.getToken()
      .then((success, accessToken) => {
        NetworkManager.configHeaderAuthorization(accessToken);
        return success
      })
      .catch(failure => {
        return failure
      })
      .then(isSuccess => {
        isRefreshingToken = false;
        // request again
        unauthorizedRequestQueue.forEach(callback =>
          callback(isSuccess)
        );
        configAuthorizationHeader = []
      });
  }

  // next
  return newReqPromise;
}

export default { retryHandler }