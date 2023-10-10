// interfaces

import { QueryResult } from "pg"

type IUsers = {
    id: number,
    name: string,
    email: string,
    password: string | any,
    admin: boolean
}
type ILogin = {
    email: string,
    password: string
}


type IUsersResult = QueryResult<IUsers>
type IUsersCreate = Omit<IUsers, 'password'>
type ILoginCreate = Omit<ILogin, 'password'>
type IUsersUpdate = Partial<IUsersCreate>
type IUsersILoginResult = QueryResult<ILogin>

export { IUsers, ILogin, IUsersResult, IUsersCreate, IUsersUpdate, IUsersILoginResult }

