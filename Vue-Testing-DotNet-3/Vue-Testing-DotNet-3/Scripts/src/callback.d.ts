//AxiosResponse is optional
//AxiosResponse can be replaced by any
//(response: any) => { ... }
import { AxiosResponse } from 'axios'

declare type SuccessCallback = (data: any, response?: AxiosResponse) => void;
declare type ErrorCallback = (response?: AxiosResponse) => void;

export as namespace CallBackFunction;