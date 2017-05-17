import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {LoginInfoComponent} from "./account/login-info.component";
import {SigninComponent} from "./account/signin.component";
import {WishlistComponent} from "./account/wishlist.component";

import {AccountService} from "./services/account/account.service";
import {FacebookService} from "./services/facebook.service";

@NgModule({
    imports: [CommonModule, RouterModule, NgbModule.forRoot()],
    declarations: [LoginInfoComponent, SigninComponent, WishlistComponent],
    exports: [LoginInfoComponent, SigninComponent, WishlistComponent],
    providers: [AccountService, FacebookService]
})

export class AccountModule {
}