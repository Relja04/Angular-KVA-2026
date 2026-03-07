import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class Utils{
    formatDate(iso:string){
        return new Date(iso).toLocaleString("sr-rs",{
            year:'numeric',
            month:'2-digit',
            day:"2-digit",
        })
    }
}