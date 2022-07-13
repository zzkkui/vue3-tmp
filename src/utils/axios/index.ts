// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动
import type { AxiosResponse } from 'axios';
import { clone } from 'lodash-es';
import { VAxios } from './Axios';
import { isString } from 'src/utils/is';
import { AxiosTransform, CreateAxiosOptions, RequestOptions, Result } from './interface';
import { deepMerge } from 'src/utils';
import { joinTimestamp, setObjToUrlParams } from './helper';
import { ContentTypeEnum } from './enums';
import { useMessage } from 'src/hooks/useMessage';
import { AxiosRetry } from './axiosRetry';

const urlPrefix = '/';
const { createMessage, createErrorModal } = useMessage();

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * @description: 处理请求数据。如果数据不是预期格式，可直接抛出错误
   */
  transformRequestHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { data } = res;
    if (!data) {
      throw new Error('请求出错，请稍候重试');
    }

    const { errcode, data: result, description, description_cn } = data;

    // 这里逻辑可以根据项目进行修改
    const hasSuccess = data && Reflect.has(data, 'errcode') && errcode === 0;
    if (hasSuccess) {
      return result;
    }

    const timeoutMsg = description_cn || description;

    // errorMessageMode=‘modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
    // errorMessageMode='none' 一般是调用时明确表示不希望自动弹出错误提示
    if (options.errorMessageMode === 'modal') {
      createErrorModal({ title: '错误提示', content: timeoutMsg });
    } else if (options.errorMessageMode === 'message') {
      createMessage.error(timeoutMsg);
    }

    throw new Error(timeoutMsg || '请求出错，请稍候重试');
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, joinTime = true, urlPrefix } = options;

    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }

    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }
    const params = config.params || {};
    const data = config.data || false;
    if (config.method?.toUpperCase() === 'GET') {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
      } else {
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
        config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        if (Reflect.has(config, 'data') && config.data && Object.keys(config.data).length > 0) {
          config.data = data;
          config.params = params;
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params;
          config.params = undefined;
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(config.url as string, Object.assign({}, config.params, config.data));
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params;
        config.params = undefined;
      }
    }
    return config;
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config) => {
    // 在发送请求之前做些什么
    // const token = getToken();
    // if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
    //   // jwt token
    //   (config as Recordable).headers.Authorization = options.authenticationScheme
    //     ? `${options.authenticationScheme} ${token}`
    //     : token;
    // }
    return config;
  },

  /**
   * @description: 响应拦截器处理
   */
  responseInterceptors: (res: AxiosResponse<any>) => {
    return res;
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (_axiosInstance: AxiosResponse, error: any) => {
    const { response, code, message, config } = error || {};
    const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none';
    const msg: string = response?.data?.error?.message ?? '';
    const err: string = error?.toString?.() ?? '';
    let errMessage = '';

    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        errMessage = '接口请求超时,请刷新页面重试!';
      }
      if (err?.includes('Network Error')) {
        errMessage = '网络异常，请检查您的网络连接是否正常!';
      }

      if (errMessage) {
        if (errorMessageMode === 'modal') {
          createErrorModal({ title: '错误提示', content: errMessage });
        } else if (errorMessageMode === 'message') {
          createMessage.error(errMessage);
        }
        return Promise.reject(error);
      }
    } catch (error) {
      throw new Error(error as unknown as string);
    }

    // let errMessage = '';

    switch (error?.response?.status) {
      case 400:
        errMessage = `${msg}`;
        break;
      case 401:
        errMessage = '用户没有权限';
        break;
      case 403:
        errMessage = '用户得到授权，但是访问是被禁止的!';
        break;
      // 404请求不存在
      case 404:
        errMessage = '网络请求错误,未找到该资源!';
        break;
      case 500:
        errMessage = '服务器错误';
        break;
      case 501:
        errMessage = '网络未实现';
        break;
      case 503:
        errMessage = '服务不可用，服务器暂时过载或维护!';
        break;
      case 504:
        errMessage = '网络超时';
        break;
      default:
    }

    if (errMessage) {
      if (errorMessageMode === 'modal') {
        createErrorModal({ title: '错误提示', content: errMessage });
      } else if (errorMessageMode === 'message') {
        createMessage.error({ content: errMessage, key: `global_error_message_status_${status}` });
      }
    }

    const { isOpenRetry } = config.requestOptions.retryRequest;
    if (isOpenRetry) {
      // 添加自动重试机制 保险起见 只针对GET请求
      const retryRequest = new AxiosRetry();
      config.method?.toUpperCase() === 'GET' &&
        // @ts-ignore
        retryRequest.retry(axiosInstance, error);
    }

    return Promise.reject(error);
  },
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    deepMerge(
      {
        // // https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
        // authenticationScheme: '',
        timeout: 10 * 1000,
        // 基础接口地址
        // baseURL: globSetting.apiUrl,

        headers: { 'Content-Type': ContentTypeEnum.JSON },
        // 如果是form-data格式
        // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
        // 数据处理方式
        transform: clone(transform),
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 消息提示类型
          errorMessageMode: 'message',
          // formatDate: true,
          // 接口地址
          // apiUrl: '',
          // 接口拼接地址
          urlPrefix: urlPrefix,
          //  是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
          // // 是否携带token
          // withToken: false,
          // 重连
          // retryRequest: {
          //   isOpenRetry: true,
          //   count: 5,
          //   waitTime: 100,
          // },
        },
      },
      opt || {},
    ),
  );
}
export const fetchApi = createAxios();
