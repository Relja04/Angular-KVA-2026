import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-profile',
    imports: [FormsModule],
    templateUrl: './profile.html',
    styleUrl: './profile.css',
})
export class Profile {

    service = AuthService
    doUpdateEmail() {
        const email = document.getElementById("email") as HTMLInputElement
        this.service.updateEmail(email.value)
    }
    doUpdateUsername() {
        const username = document.getElementById("username") as HTMLInputElement
        this.service.updateUsername(username.value)
    }
    doUpdatePassword() {
        const oldPass = document.getElementById("pass1") as HTMLInputElement
        const pass1 = document.getElementById("pass2") as HTMLInputElement
        const newPass = document.getElementById("newPass") as HTMLInputElement
        const z = pass1.value == newPass.value
        this.service.updatePassword(oldPass.value, newPass.value, z)
        document.getElementById("pass1") as HTMLInputElement
    }
    selectedTab: string = 'Account settings';

    click(tabName: string) {
        this.selectedTab = tabName;
    }
}
