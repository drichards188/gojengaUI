import axiosInstance from "./api";
import TokenService from "./services/token.service";
import { setToken } from "./components/banking/bankingSlice";

const setup = (store: { dispatch: any }) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      if (token) {
        // @ts-ignore
        config.headers["Authorization"] = `Bearer ${token}`; // for Node.js Express back-end
        // @ts-ignore
        config.headers["Is-Test"] = process.env.REACT_APP_IS_TEST;
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
      if (originalConfig.url !== "/login" && err.response) {
        if (err.response.status === 403 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const token = TokenService.getLocalRefreshToken();
            const rs = await axiosInstance.put("/auth/refresh", {
              token: token,
            });
            const accessToken = rs.data.token;

            dispatch(setToken(accessToken));
            TokenService.updateLocalAccessToken(accessToken);

            return axiosInstance(originalConfig);
          } catch (_error) {
            if (_error.response.status === 500) {
              localStorage.removeItem("user");
            }
            return Promise.reject(_error);
          }
        }
        if (err.response.status === 422) {
          alert("unprocessible entity");
          return Promise.reject("error unprocessible entity");
        }
      }

      return Promise.reject(err);
    }
  );
};

export default setup;
