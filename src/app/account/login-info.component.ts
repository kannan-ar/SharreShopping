import {Component, OnInit} from "@angular/core"

import {LoginInfo} from "../models/account/login-info";
import {AccountService} from "../services/account/account.service";

@Component({
    selector: "[loginInfo]",
    template: `
        <li *ngIf="!isLogged" class="dropdown"><a class="login-link" [routerLink]="['/signin']" routerLinkActive="active">Signin</a></li>
        <li *ngIf="isLogged" ngbDropdown>
            <a href="#" id="accountMenu" ngbDropdownToggle>{{info.name}}</a>
            <ul class="dropdown-menu" aria-labelledby="accountMenu">
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
        if (window.sessionStorage.getItem('SSToken') != null) {
            this.accountService.getInfo().subscribe(info => this.info = info);
            this.isLogged = true;
        }
    }

    logout(): void {
        window.sessionStorage.removeItem('SSToken');
        window.location.href = "/";
    }
}