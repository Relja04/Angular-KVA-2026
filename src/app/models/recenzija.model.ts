export interface RecenzijaModel {
        toyId: number
        recenzije:{
            ime:string
            komentar: string
            ocena: number
        }[]
}