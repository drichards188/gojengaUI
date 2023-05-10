import axiosInstance from "./api";
import TokenService from "./services/token.service";
import { setToken } from "./components/banking/bankingSlice";

const setup = (store: { dispatch: any }) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      if (token) {
        // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
        // @ts-ignore
        config.headers["x-access-token"] = token; // for Node.js Express back-end
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const { dispatch } = store;
  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      // todo detect a 403 response
      if (originalConfig.url !== "/login" && err.response) {
        // Access Token was expired
        if (err.response.status === 403 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const token = TokenService.getLocalRefreshToken();
            const rs = await axiosInstance.put("/refresh", {
              token: token,
            });
            // todo this approach may not work. decoding an expired token results in an error
            const accessToken = rs.data.token;

            dispatch(setToken(accessToken));
            TokenService.updateLocalAccessToken(accessToken);

            return axiosInstance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );
};

export default setup;
