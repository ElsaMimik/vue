//AxiosResponse is optional
//AxiosResponse can be replaced by any
//(response: any) => { ... }
import { AxiosResponse } from 'axios'

declare type Success = (data: any, response?: AxiosResponse) => void;
declare type Error = (response?: AxiosResponse) => void;

export as namespace CallbackFunction;