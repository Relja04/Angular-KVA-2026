import { RecenzijaModel } from "../models/recenzija.model"

const RECENZIJE = "recenzije"
export class RecenzijaService {
    static getRecenzije(): RecenzijaModel[] {
        const baseRecenzije: RecenzijaModel[] = [
            { toyId: 1, recenzije: [{ ime: "Marko", komentar: "In sollicitudin tellus et lacus.", ocena: 2 }, { ime: "Petar", komentar: "In sollicitudin tellus et lacus.", ocena: 4 }] },
            { toyId: 2, recenzije: [{ ime: "Stefan", komentar: "In sollicitudin tellus et lacus.", ocena: 5 }, { ime: "Nikola", komentar: "In sollicitudin tellus et lacus.", ocena: 1 }, { ime: "Matt", komentar: "In sollicitudin tellus et lacus.", ocena: 4 },{ime:"Gabriel",komentar:"In sollicitudin tellus et lacus.",ocena:4},{ime:"Frank",komentar:"In sollicitudin tellus et lacus.",ocena:4},{ime:"Darko",komentar:"In sollicitudin tellus et lacus.",ocena:4}] },
            { toyId: 3, recenzije: [{ ime: "Boris", komentar: "In sollicitudin tellus et lacus.", ocena: 5 }] },
            { toyId: 4, recenzije: [{ ime: "Branko", komentar: "In sollicitudin tellus et lacus.", ocena: 1 }] },
            { toyId: 5, recenzije: [{ ime: "Marina", komentar: "In sollicitudin tellus et lacus.", ocena: 2 }] }
        ]

        if (localStorage.getItem(RECENZIJE) == null) {
            localStorage.setItem(RECENZIJE, JSON.stringify(baseRecenzije))
        }
        
        return JSON.parse(localStorage.getItem(RECENZIJE)!)
    }
    static addRecenzija(recenzija: RecenzijaModel) {
        const trenutneRecenzije = this.getRecenzije()

        const postojeciToy = trenutneRecenzije.find(r => r.toyId === recenzija.toyId)

        if (postojeciToy) {
            postojeciToy.recenzije.push(...recenzija.recenzije)
        } else {
            trenutneRecenzije.push(recenzija)
        }
        localStorage.setItem(RECENZIJE, JSON.stringify(trenutneRecenzije))
    }
}