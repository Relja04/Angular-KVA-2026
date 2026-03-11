import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../services/auth.service';
import { Alerts } from '../alert';

@Component({
	selector: 'app-login',
	imports: [RouterLink, FormsModule,],
	templateUrl: './login.html',
	styleUrl: './login.css',
})


export class Login {
	email: string = "user@example.com"
	password: string = "user123"
	constructor(private router: Router) {
		if (AuthService.getActiveUser()) {
			router.navigate(['/'])
		}
	}
	doLogin() {
		if (AuthService.login(this.email, this.password)) {
			this.router.navigate(['/'])
			return
		}
		Alerts.error("Incorrect email or password")
	}
}