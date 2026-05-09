import { Component, signal, computed } from '@angular/core';
import { ToyModel } from '../models/toy.model';
import { Utils } from '../utils';
import { AuthService } from '../services/auth.service';
import { RouterLink } from "@angular/router";
import { ToyService } from '../services/toy.service';
import { CartService } from '../services/cart.service';
import { FormsModule } from '@angular/forms';
import { RecenzijaModel } from '../models/recenzija.model';
import { RecenzijaService } from '../services/recenzija.service';

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
    recenzije=signal<RecenzijaModel[]>([])
    searchTerm = signal<string>('');
    constructor(public utils: Utils, private cartService: CartService) {
        cartService.refreshUserCart()
        ToyService.getToys().then(
            rsp => this.toys.set(rsp.data)
        )
        this.recenzije.set(RecenzijaService.getRecenzije())
    }
    selectedToy: any = null;

    filteredToys = computed(() => {
        const term = this.searchTerm().toLowerCase();
        return this.toys().filter(t =>
            t.name.toLowerCase().includes(term)
        );
    });

    komentari=signal<any[]>([])

    openDetails(toy: any,id:number) {
        this.selectedToy = toy;
        const komentari=this.recenzije().find(item => item.toyId == id);
        if(komentari)
            this.komentari.set(komentari.recenzije)
        else
            this.komentari.set([])
    }

    closeDetails() {
        this.selectedToy = null;
    }
    onAdd(product: ToyModel) {
        this.cartService.addToCart(product);
        console.log('Current cart:', this.cartService.items());
    }
    calculatedOcena(id:number){
        const toy=this.recenzije()
        if(!toy.find(item=>item.toyId==id))
            return 0

        const suma=toy.find(item=>item.toyId==id)!.recenzije.reduce((sum,curr)=>sum+curr.ocena,0)
        const p=Math.ceil(suma/toy.find(item=>item.toyId==id)!.recenzije.length)
        return '★'.repeat(p)
    }
}
