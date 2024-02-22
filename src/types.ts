type AmoEntity = {
    id: string
    entityName: string
}

export type Company = AmoEntity & {
    responsible_user_id: number
    created_by: number
    created_at: number
}
export type Contact = AmoEntity & {
    first_name: string
    last_name: string
    created_by: number
    created_at: number
}
export type Lead = AmoEntity & {
    price: number
    status_id: string
}
