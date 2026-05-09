import { Component, signal, computed } from '@angular/core';
import { ToyModel } from '../models/toy.model';
import { Utils } from '../utils';
import { AuthService } from '../services/auth.service';
import { RouterLink } from "@angular/router";
import { ToyService } from '../services/toy.service';
import { CartService } from '../services/cart.service';
import { FormsModule } from '@angular/forms';

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
    searchTerm = signal<string>('');
    constructor(public utils: Utils,private cartService:CartService) {
        cartService.refreshUserCart()
        ToyService.getToys().then(
            rsp => this.toys.set(rsp.data)
        )
    }
    selectedToy: any = null;

    filteredToys = computed(() => {
        const term = this.searchTerm().toLowerCase();
        return this.toys().filter(t => 
            t.name.toLowerCase().includes(term)
        );
    });
    openDetails(toy: any) {
        this.selectedToy = toy;
    }

    closeDetails() {
        this.selectedToy = null;
    }
    onAdd(product: ToyModel) {
        this.cartService.addToCart(product);
        console.log('Current cart:', this.cartService.items());
    }
}
