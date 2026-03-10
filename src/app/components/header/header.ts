import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-header',
    imports: [RouterLink],
    templateUrl: './header.html',
    styleUrl: './header.css',
})
export class Header {
    activeUser=AuthService.getActiveUser()
    doLogout(){
        AuthService.logout()
    }
    logoPath: string="/zabava logo.png"
}
