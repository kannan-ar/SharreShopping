import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {LoginInfoComponent} from "./account/login-info.component";
import {SigninComponent} from "./account/signin.component";
import {WishlistComponent} from "./account/wishlist.component";
import {RightMenuComponent} from "./account/right-menu.component";

import {AccountService} from "./services/account/account.service";

@NgModule({
    imports: [CommonModule, RouterModule, NgbModule.forRoot()],
    declarations: [LoginInfoComponent, SigninComponent, WishlistComponent, RightMenuComponent],
    exports: [LoginInfoComponent, SigninComponent, WishlistComponent, RightMenuComponent],
    providers: [AccountService]
})

export class AccountModule {
}