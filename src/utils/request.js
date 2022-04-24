import axios from 'axios';
import { Message } from 'element-ui';

const request = axios.create({
  baseURL: '',
  withCredentials: true
});
const errorCodeReg = /^[8][5]\d{2}$/;
function toLogin() {
}
request.interceptors.response.use(
  (res) => {
    if (res.status === 401 || res.data.code === '401' || errorCodeReg.test(res.data.code)) {
      toLogin();
    }
    // 权限禁用
    if (res.status === 403 || res.data.code === '403') {
      Message.error(res.data.message);
    }
    // 返回错误，统一拦截
    if (res.data.code && res.data.code !== '200') {
      Message.error(res.data.message);
    }
    return Promise.resolve(res.data);
  },
  (err) => {
    console.log(err);
    if (err.response.status === 403) {
      Message.error('无访问权限');
    }

    if (err.response.status === 401) {
      // 跳转登录页面
      toLogin();
    }

    return Promise.reject(err);
  }
);

export default request;