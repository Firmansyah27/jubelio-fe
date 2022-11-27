import axios from "axios";

export async function apiPost(url, data) {
  let config = {
    method: 'POST',
    url: url,
    data: data,
    header: {
      'Content-Type': 'application/json',
    },
  }

  const request = await axios(config)
    .then(response => {
      return response.data;
    })
    .catch(e => {
      try {
        return e.response.data
      } catch {
        return 'Something went wrong : 500';
      }
    });

  return request;
}

export async function apiGet(url, data, auth=false) {
  var request = null;
  try {
    let headers = {};
    let config = {
      method: "GET",
      url,
      headers,
      params: data
    }
    if(auth != false){
      config.auth = auth
    }
    request = await axios(config).then(response => {
      return response.data;
    })
      .catch(e => {
        try {
          return e.response.data
        } catch {
          return {
            status: false,
            data: 'Something went wrong : 500'
          }
        }
      });
    return request;
  } catch (e) {
    return { status: false, data: e };
  }
}

export async function apiPut(url, data) {
  var request = null;
  try {
    let headers = {
      'Content-Type': 'application/json',
    }
    request = await axios.put(url, data, headers).then(response => {
      return response.data;
    })
      .catch(e => {
        try {
          return e.response.data
        } catch {
          return {
            status: false,
            data: 'Something went wrong : 500'
          }
        }
      });
    return request;
  } catch (e) {
    return { status: false, data: e };
  }
}

export async function apiDelete(url) {
  var request = null;
  try {
    request = await axios.delete(url).then(response => {
      return response.data;
    })
      .catch(e => {
        try {
          return e.response.data
        } catch {
          return {
            status: false,
            data: 'Something went wrong : 500'
          }
        }
      });
    return request;
  } catch (e) {
    return { status: false, data: e };
  }
}
