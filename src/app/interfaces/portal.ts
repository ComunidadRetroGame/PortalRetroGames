export interface Tips {
    id: string
    title?: string
    date?: Date
    content: string
    url: string
    type?: string
    author?: string
    comments?: RetroComment[]
    hash?: string[]
    match?: number
    file?: {
        name: string;
        type: string;
        size: any;
        content: string;  // Contenido en base64
    };
}


export interface RetroComment {
    tipsId?: string
    date?: Date
    comment?: string
    author?: string
    avatar?: string
}