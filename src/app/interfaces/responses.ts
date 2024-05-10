export interface Responses {
}

export interface LoginResponse {
    User: UserRetro,
    Hash: string
}

export interface UserRetro {
    name: string
    alias: string
    reference_text: string
    user_ref: string
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
