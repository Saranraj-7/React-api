import axios from "axios";

const token = '79a3b1d569005f3bb059d351efbfc433938986d1c759d0c23bee1a7f32e8d27f';
const baseURL = "https://gorest.co.in/public/v2";

const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use(
  function (config) {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const { status } = error.response.status;
    switch (status) {
        case 200:
            console.log("Success");
            break;
        case 204:
            console.log("Response Status: No Content (204)");
            break;
          case 304:
            console.log("Response Status: Not Modified (304)");
            break;
          case 400:
            console.log("Response Status: Bad Request (400)");
            break;
          case 401:
            console.log("Response Status: Unauthorized (401)");
            break;
          case 402:
            console.log("Response Status: Payment Required (402)");
            break;
          case 403:
            console.log("Response Status: Forbidden (403)");
            break;
          case 404:
            console.log("Response Status: Not Found (404)");    
            break;
          case 405:
            console.log("Response Status: Method Not Allowed (405)");
            break;
          case 406:
            console.log("Response Status: Not Acceptable (406)");
            break;
          case 407:
            console.log("Response Status: Proxy Authentication Required (407)");
            break;
          case 408:
            console.log("Response Status: Request TimeOut (408)");
            break;
          case 409:
            console.log("Response Status: Conflit (409)");
            break;
          case 500:
            console.log("Response Status: Server Error (500)");
            break;
          default:
            console.log("Response Status: An unknown error occurred");
            break;
    }
    return Promise.reject(error);
  }
);

export default instance;

