/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />


declare namespace auth {
  interface IUser {
    userId: string | number
    username: string
  }
}

declare namespace list {
  interface IResponse<T> {
    data: T[]
    total: number
  }
}