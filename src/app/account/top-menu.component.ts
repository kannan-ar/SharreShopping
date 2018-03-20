import { Component, OnInit } from "@angular/core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PreferenceComponent } from "../home/preference.component";
import { LoginInfo } from "../models/account/login-info";
import { AccountService } from "../services/account/account.service";

@Component({
    selector: "[topMenu]",
    template: `
        <li *ngIf="!isLogged" class="nav-item dropdown">
            <a href="#" id="anonymousMenu" class="nav-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Hi Guest&nbsp;<span class="glyphicon glyphicon-triangle-bottom"></span></a>
            <div class="dropdown-menu" aria-labelledby="anonymousMenu">
                <a href="#" class="dropdown-item login-link" [routerLink]="['/signin']" routerLinkActive="active">Signin</a>
                <a href="#" class="dropdown-item" (click)="showPreference()">Preferences</a>
            </div>
        </li>
        <li *ngIf="isLogged" class="nav-item dropdown">
            <a href="#" id="accountMenu" class="nav-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Welcome&nbsp;{{info.name}}&nbsp;<span class="glyphicon glyphicon-triangle-bottom"></span></a>
            <div class="dropdown-menu" aria-labelledby="accountMenu">
                <a href="#" class="dropdown-item" (click)="showPreference()">Preferences</a>
                <a href="#" class="dropdown-item" [routerLink]="['/wishlist']">Wishlist <span class="glyphicon glyphicon-heart pull-right"></span></a>
                <a href="#" class="dropdown-item" (click)="logout()">Sign Out <span class="glyphicon glyphicon-log-out pull-right"></span></a>
            </div>
        </li>
    `
})

export class TopMenuComponent {
    isLogged: boolean;
    info: LoginInfo;

    constructor(
        private modalService: NgbModal,
        private accountService: AccountService) {
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

    showPreference() {
        const modalRef = this.modalService.open(PreferenceComponent);
    }
}