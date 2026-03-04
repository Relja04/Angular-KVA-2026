import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        loadComponent: () => {
            return import("./home/home").then(
                m => m.Home
            )
        }
    },
    {
        path:"about",
        loadComponent:()=>{
            return import("./about/about").then(
                a=>a.About
            )
        }
    },
    {
        path:"contact",
        loadComponent:()=>{
            return import("./contact/contact").then(
                c=>c.Contact
            )
        }
    },
    {
        path:"faq",
        loadComponent:()=>{
            return import("./faq/faq").then(
                f=>f.Faq
            )
        }
    },
    {
        path:"login",
        loadComponent:()=>{
            return import("./login/login").then(
                l=>l.Login
            )
        }
    }
];
