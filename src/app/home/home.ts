import { Component, signal } from '@angular/core';
import axios from 'axios'
import { ToyModel } from '../models/toy.model';
import { Utils } from '../utils';
import { AuthService } from '../services/auth.service';
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-home',
    imports: [RouterLink],
    templateUrl: './home.html',
    styleUrl: './home.css',
})
export class Home {
    service=AuthService
    image: string="https://toy.pequla.com/"
    toys=signal<ToyModel[]>([])
    constructor(public utils:Utils){
        axios.get("https://toy.pequla.com/api/toy").then(
            rsp=>this.toys.set(rsp.data)
        )
    }
    selectedToy: any = null;

openDetails(toy: any) {
  this.selectedToy = toy;
}

closeDetails() {
  this.selectedToy = null;
}
}
