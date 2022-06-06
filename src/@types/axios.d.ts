/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-shadow */
import { AxiosRequestConfig } from 'axios'

declare module 'axios' {
  interface AxiosRequestConfig {
    retry?: number
  }
}
