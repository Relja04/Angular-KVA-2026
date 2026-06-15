import { Component, signal, computed } from '@angular/core'
import { ToyModel } from '../models/toy.model'
import { Utils } from '../utils'
import { AuthService } from '../services/auth.service'
import { RouterLink } from "@angular/router"
import { ToyService } from '../services/toy.service'
import { CartService } from '../services/cart.service'
import { FormsModule } from '@angular/forms'
import { RecenzijaModel } from '../models/recenzija.model'
import { RecenzijaService } from '../services/recenzija.service'

@Component({
    selector: 'app-home',
    imports: [RouterLink, FormsModule],
    templateUrl: './home.html',
    styleUrl: './home.css',
})
export class Home {

    service = AuthService

    image: string = "https://toy.pequla.com/"
    toys = signal<ToyModel[]>([])

    recenzije = signal<RecenzijaModel[]>([])
    komentari = signal<any[]>([])

    showToast = signal(false)
    toastTimeout: number = 0

    searchTerm = signal<string>('')
    selectedCategory = signal<string>('')
    selectedAge = signal<string>('')
    selectedTargetGroup = signal<string>('svi')
    minPrice = signal<number | null>(null)
    maxPrice = signal<number | null>(null)
    selectedRating = signal<string>('')
    selectedToy: ToyModel | null = null

    //Konstruktor koji fetchuje sa pequlinog apija igracke i setuje recenzije
    constructor(public utils: Utils, private cartService: CartService) {
        cartService.refreshUserCart()
        ToyService.getToys().then(
            rsp => this.toys.set(rsp.data)
        )
        this.recenzije.set(RecenzijaService.getRecenzije())
    }

    //Funkcija za pretragu
    filteredToys = computed(() => {
        return this.toys().filter(t => {
            //Filtriranje imena
            const matchesName = t.name.toLowerCase().includes(this.searchTerm().toLowerCase())

            //Filtriranje kategorije
            const matchesCategory = this.selectedCategory() === '' || t.type.name === this.selectedCategory()

            //Filtriranje uzrasta
            const matchesAge = this.selectedAge() === '' || t.ageGroup.name === this.selectedAge()

            //Filtriranje grupe
            const matchesTarget = this.selectedTargetGroup() === 'svi' || t.targetGroup === this.selectedTargetGroup()

            //Raspon cene
            const min = this.minPrice()
            const max = this.maxPrice()
            const matchesMinPrice = min === null || t.price >= min
            const matchesMaxPrice = max === null || t.price <= max

            //Filtriranje ocene
            const targetRating = this.selectedRating()
            const toyRatingStars = this.calculatedOcena(t.toyId)

            let matchesRating = true
            if (targetRating !== '') {
                if (targetRating === 'Bez recenzije') {
                    matchesRating = toyRatingStars === 0
                } else {
                    matchesRating = toyRatingStars === targetRating
                }
            }

            return matchesName && matchesCategory && matchesAge && matchesTarget && matchesMinPrice && matchesMaxPrice && matchesRating
        })
    })

    clearFilters() {
        this.searchTerm.set("")
        this.selectedCategory.set("")
        this.selectedAge.set("")
        this.selectedTargetGroup.set("svi")
        this.minPrice.set(null)
        this.maxPrice.set(null)
        this.selectedRating.set("")
    }

    //Funkcija za pridobijanje komentara/recenzija za otvorenu igru preko detalja
    openDetails(toy: ToyModel, id: number) {
        this.selectedToy = toy
        const komentari = this.recenzije().find(item => item.toyId == id)
        if (komentari)
            this.komentari.set(komentari.recenzije)
        else
            this.komentari.set([])
    }

    //Funkcija dodavanja u korpu
    onAdd(product: ToyModel) {
        this.cartService.addToCart(product)
        if (this.toastTimeout) {
            clearTimeout(this.toastTimeout)
        }

        this.showToast.set(true)
        this.startToastTimeout()
    }

    //Helper funkcije ya toast
    startToastTimeout() {
        this.toastTimeout = setTimeout(() => {
            this.showToast.set(false)
        }, 3000)
    }

    onToastMouseEnter() {
        if (this.toastTimeout) {
            clearTimeout(this.toastTimeout)
        }
    }

    onToastMouseLeave() {
        if (this.showToast()) {
            this.startToastTimeout()
        }
    }

    //Funkcija za racunanje prosecne ocene recenzija
    calculatedOcena(id: number) {
        const toy = this.recenzije()
        if (!toy.find(item => item.toyId == id))
            return 0

        const suma = toy.find(item => item.toyId == id)!.recenzije.reduce((sum, curr) => sum + curr.ocena, 0)
        const p = Math.ceil(suma / toy.find(item => item.toyId == id)!.recenzije.length)
        return '★'.repeat(p)
    }

    closeDetails() {
        this.selectedToy = null
    }
}
