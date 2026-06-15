import { Component } from '@angular/core'
import { RouterLink } from "@angular/router"
import { AuthService } from '../services/auth.service'
import { Alerts } from '../alert'

@Component({
    selector: 'app-register',
    imports: [RouterLink],
    templateUrl: './register.html',
    styleUrl: './register.css',
})
export class Register {
    doRegister(){
        const emailE=document.getElementById("email") as HTMLInputElement
        const usernameE=document.getElementById("username") as HTMLInputElement
        const passE=document.getElementById("password") as HTMLInputElement
        const passConfE=document.getElementById("passwordConf") as HTMLInputElement
        
        const email=emailE.value
        const username=usernameE.value
        const pass=passE.value
        const passConf=passConfE.value
        if(pass!==passConf){
            Alerts.error("Passwords do not match")
        }
        if(AuthService.register(email,pass,username)){
            Alerts.success("Successfully created a new account")
        }else{
            Alerts.error("Something went wrong")
        }
    }
}
