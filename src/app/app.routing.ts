import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

import {HomeComponent} from "./home/home.component";
import {SigninComponent} from "./account/signin.component";
import {WishlistComponent} from "./account/wishlist.component";
import {PageNotFoundComponent} from "./page-not-found.component";

const appRoutes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "dashboard",
        component: HomeComponent
    },
    {
        path: "signin",
        component: SigninComponent
    },
    {
        path: "wishlist",
        component: WishlistComponent
    },
    {
        path: "**",
        component: PageNotFoundComponent
    }
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);