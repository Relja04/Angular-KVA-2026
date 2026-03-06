import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { AuthLayout } from "./layouts/auth-layout/auth-layout"
import { Home } from "./home/home"
import { About } from "./about/about"
import { Contact } from "./contact/contact"
import { Faq } from "./faq/faq"
import { Login } from './login/login';
import { Register } from "./register/register"
import { Profile } from "./user/profile/profile"
import { Cart } from "./user/cart/cart"

export const routes: Routes = [
    {
        path: "",
        component:MainLayout,
        children:[
            {path:"",component:Home},
            {path:"about",component:About},
            {path:"contact",component:Contact},
            {path:"faq",component:Faq},
            {path:"profile",component:Profile},
            {path:"cart",component:Cart}
        ]
    },
    {
        path:"",
        component:AuthLayout,
        children:[
            {path: "login",component:Login},
            {path:"register",component:Register}
        ]

    }
];
