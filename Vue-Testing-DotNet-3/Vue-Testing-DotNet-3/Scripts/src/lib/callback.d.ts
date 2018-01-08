//AxiosResponse is optional
//AxiosResponse can be replaced by any
//(response: any) => { ... }
import { AxiosResponse, AxiosError } from 'axios'

declare type Success = (response?: AxiosResponse) => void;
declare type Error = (error?: AxiosError) => void;

export as namespace HttpCallback;
