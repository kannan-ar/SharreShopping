import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {SigninComponent} from "./account/signin.component";
import {WishlistComponent} from "./account/wishlist.component";
import { TopMenuComponent } from "./account/top-menu.component";

import {AccountService} from "./services/account/account.service";

@NgModule({
    imports: [CommonModule, RouterModule, NgbModule.forRoot()],
    declarations: [SigninComponent, WishlistComponent, TopMenuComponent],
    exports: [SigninComponent, WishlistComponent, TopMenuComponent],
    providers: [AccountService]
})

export class AccountModule {
}