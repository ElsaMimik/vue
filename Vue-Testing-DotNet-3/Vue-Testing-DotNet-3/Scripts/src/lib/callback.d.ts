//AxiosResponse is optional
//AxiosResponse can be replaced by any
//(response: any) => { ... }
import { AxiosResponse, AxiosError } from 'axios'

declare type Success = (data: any, response?: AxiosResponse) => void;
declare type Error = (response?: AxiosResponse, error?: AxiosError) => void;

export as namespace CallbackFunction;
