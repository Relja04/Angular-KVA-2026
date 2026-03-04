import { Component, signal } from '@angular/core';
import axios from 'axios'

@Component({
    selector: 'app-home',
    imports: [],
    templateUrl: './home.html',
    styleUrl: './home.css',
})
export class Home {
    image: string="https://toy.pequla.com/"
    toys=signal<any[]>([])
    constructor(){
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
