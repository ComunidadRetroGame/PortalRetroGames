export interface Responses {
}

export interface LoginResponse {
    User: UserRetro,
    Hash: string
}

export interface UserRetro {
    name?: string
    alias?: string
    password?: string
    reference_text?: string
    about_me?: string
    user_ref?: string
    avatar_yt?:string
    RRSS?: Player_RRSS[]
}


export interface Player_RRSS {
    type : string
    URL : string
}


export interface ChangePassword {
    password: string
    password_new: string
    password_confirm_new: string
}

export interface UserRetroOnline {
    Status: string
    Code: number
    User: Login
}

export interface Login {
    alias: string
    hash: string
    online: boolean
}

export interface RRSS {
    youtube?: string
    twitch?: string
    twitter?: string
    instagram?: string
    email?: string
    reddit?: string
    other?: string
}

export interface MessageError {
    code : number
    message: string
}

export class TakeError {
    returnMessage(response :  any) : MessageError {
        var messageError : MessageError ={
             code : response['code'],
             message: response['message']
        }
        return messageError;
    }
}