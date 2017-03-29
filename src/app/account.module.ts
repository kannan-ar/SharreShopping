import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {LoginInfoComponent} from "./account/login-info.component";
import {SigninComponent} from "./account/signin.component";

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [LoginInfoComponent, SigninComponent],
    exports: [LoginInfoComponent, SigninComponent]
})

export class AccountModule {
}