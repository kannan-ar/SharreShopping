import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {LoginInfoComponent} from "./account/login-info.component";
import {SigninComponent} from "./account/signin.component";

import {AccountService} from "./services/account/account.service";

@NgModule({
    imports: [CommonModule, RouterModule, NgbModule.forRoot()],
    declarations: [LoginInfoComponent, SigninComponent],
    exports: [LoginInfoComponent, SigninComponent],
    providers: [AccountService]
})

export class AccountModule {
}