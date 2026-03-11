import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Alerts } from '../../alert';

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
        Alerts.success("Email updated successfully!")
    }
    doUpdateUsername() {
        const username = document.getElementById("username") as HTMLInputElement
        this.service.updateUsername(username.value)
        Alerts.success("Username updated successfully!")
    }
    doUpdatePassword() {
        const oldPass = document.getElementById("pass1") as HTMLInputElement
        if (oldPass.value == "") {
            Alerts.message("Please enter your password")
            return
        }
        const pass1 = document.getElementById("pass2") as HTMLInputElement
        const newPass = document.getElementById("newPass") as HTMLInputElement
        const z = pass1.value == newPass.value
        this.service.updatePassword(oldPass.value, newPass.value, z)
    }
    selectedTab: string = 'Account settings';

    click(tabName: string) {
        this.selectedTab = tabName;
    }
}
