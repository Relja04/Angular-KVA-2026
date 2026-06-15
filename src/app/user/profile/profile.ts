import { Component, inject, signal } from '@angular/core'
import { AuthService } from '../../services/auth.service'
import { FormsModule } from '@angular/forms'
import { Alerts } from '../../alert'
import { OrderService } from '../../services/order.service'
import { DatePipe, DecimalPipe } from '@angular/common'
import { OrderModel } from '../../models/order.model'
import { RecenzijaService } from '../../services/recenzija.service'
import { RecenzijaModel } from '../../models/recenzija.model'
import { UserModel } from '../../models/user.model'
import { ToyModel } from '../../models/toy.model'

@Component({
    selector: 'app-profile',
    imports: [FormsModule, DatePipe, DecimalPipe],
    templateUrl: './profile.html',
    styleUrl: './profile.css',
})
export class Profile {

    service = AuthService
    image: string = "https://toy.pequla.com/"
    orderService = inject(OrderService)
    selectedOrder = signal<OrderModel | undefined>(undefined)
    showOverlay = false
    showReviewOverlay = false
    selectedToy=signal<ToyModel|undefined>(undefined)

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
    selectedTab: string = 'Account settings'

    click(tabName: string) {
        this.selectedTab = tabName
    }

    viewOrder(id: number) {
        this.showOverlay = true
        const clickedOrder = this.orderService.orders().find(o => o.orderId === id)
        this.selectedOrder.set(clickedOrder)
    }

    addReview(id: number) {
        this.showReviewOverlay = true
        const clickedOrder = this.orderService.orders().find(o => o.orderId === id)
        this.selectedOrder.set(clickedOrder)
    }

    submitReview() {
        const toyId=this.selectedToy()!.toyId
        const checkedRadio = document.querySelector('input[name="rating"]:checked') as HTMLInputElement;
        const reviewTextArea = document.getElementById('reviewText') as HTMLTextAreaElement;

        const ratingScore = checkedRadio ? Number(checkedRadio.value) : 0;
        const reviewComment = reviewTextArea ? reviewTextArea.value : '';

        if (ratingScore === 0) {
            Alerts.error("Please select a star rating")
            return;
        }

        const users:UserModel[] = JSON.parse(localStorage.getItem("users") || '[]');
        const currentUser:UserModel|undefined=users.find(e=>e.email==localStorage.getItem("active"));
        const recenzija:RecenzijaModel={
            toyId:toyId,
            recenzije:[
                {
                    ime:currentUser!.firstName,
                    komentar:reviewComment,
                    ocena:ratingScore
                }
            ]
        }
        console.log(recenzija)
        RecenzijaService.addRecenzija(recenzija)
        this.closeOverlay();
    }

    closeOverlay() {
        this.showOverlay = false
        this.showReviewOverlay=false
    }
}
