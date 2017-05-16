import {Component, OnInit} from "@angular/core"

import {LoginInfo} from "../models/account/login-info";
import {AccountService} from "../services/account/account.service";

@Component({
    selector: "[loginInfo]",
    template: `
        <li *ngIf="!isLogged" class="dropdown"><a class="login-link" [routerLink]="['/signin']" routerLinkActive="active">Signin</a></li>
        <li *ngIf="isLogged" ngbDropdown>
            <a href="#" id="accountMenu" ngbDropdownToggle>{{info.name}}&nbsp;<span class="glyphicon glyphicon-asterisk"></span></a>
            <ul class="dropdown-menu" aria-labelledby="accountMenu">
                <li><a href="#" [routerLink]="['/wishlist']">Wishlist <span class="glyphicon glyphicon-heart pull-right"></span></a></li>
                <li><a href="#" (click)="logout()">Sign Out <span class="glyphicon glyphicon-log-out pull-right"></span></a></li>
            </ul>
        </li>
    `
})

export class LoginInfoComponent {
    isLogged: boolean;
    info: LoginInfo;

    constructor(private accountService: AccountService) {
        this.info = new LoginInfo("");
    }

    ngOnInit() {
        if (this.accountService.isLogged()) {
            this.isLogged = true;

            this.accountService.getInfo().subscribe(info => {
                this.info = info

                if (info.name === "") {
                    this.isLogged = false;
                    this.accountService.clearLoginTrail();
                }
            });
        }
    }

    logout(): void {
        this.accountService.logout();
    }
}