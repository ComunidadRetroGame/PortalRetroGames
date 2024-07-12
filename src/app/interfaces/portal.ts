export interface Tips {
    id: string
    title?: string
    date?: Date
    content: string
    url: string
    type?: string
    author?: string
    comments?: RetroComment[]
}

export interface RetroComment {
    tipsId?: string
    date?: Date
    comment?: string
    author?: string
    avatar?: string
}