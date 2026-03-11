import { UserModel } from "../models/user.model"
import { Alerts } from "../alert"

const USERS = "users"
const ACTIVE = "active"
export class AuthService {

    static getUsers(): UserModel[] {
        const baseUser: UserModel = {
            email: 'user@example.com',
            username: "user",
            password: 'user123',
            firstName: 'Example',
            lastName: 'User',
            orders: []
        }

        if (localStorage.getItem(USERS) == null) {
            localStorage.setItem(USERS, JSON.stringify([baseUser]))
        }

        return JSON.parse(localStorage.getItem(USERS)!)
    }
    static login(email: string, password: string) {
        const users = this.getUsers()
        for (let u of users) {
            if (u.email === email && u.password === password) {
                localStorage.setItem(ACTIVE, email)
                return true
            }
        }

        return false
    }
    static getActiveUser(): UserModel | null {
        const users = this.getUsers()
        for (let u of users) {
            if (u.email === localStorage.getItem(ACTIVE)) {
                return u
            }
        }

        return null
    }
    static logout() {
        localStorage.removeItem(ACTIVE)
    }

    static updateEmail(newEmail: string) {
        const users = this.getUsers()
        for (let u of users) {
            if (u.email === localStorage.getItem(ACTIVE)) {
                u.email = newEmail
                localStorage.setItem(ACTIVE, u.email)
            }
        }
        localStorage.setItem(USERS, JSON.stringify(users))

    }

    static updateUsername(newUsername: string) {
        const users = this.getUsers()
        for (let u of users) {
            if (u.email === localStorage.getItem(ACTIVE)) {
                u.username = newUsername
            }
        }
        localStorage.setItem(USERS, JSON.stringify(users))

    }
    static updatePassword(oldPass: string, newPass: string, confPass: boolean) {
        if (!confPass) {
            Alerts.error("Passwords do not match")
            return
        }


        const users = this.getUsers()
        for (let u of users) {
            if (u.email === localStorage.getItem(ACTIVE) && u.password !== oldPass) {
                Alerts.error("Incorrect password")
                return
            }
            else if (u.email === localStorage.getItem(ACTIVE) && u.password === oldPass) {
                u.password = newPass
                localStorage.setItem(USERS, JSON.stringify(users))
                Alerts.success("Password updated successfully!")

                return
            }
        }
    }
}