import { Component, OnInit } from "@angular/core"
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PreferenceComponent } from "../home/preference.component";
import { LoginInfo } from "../models/account/login-info";
import { AccountService } from "../services/account/account.service";

@Component({
    selector: "[topMenu]",
    template: `
        <li *ngIf="!isLogged" ngbDropdown>
            <a href="#" id="anonymousMenu" ngbDropdownToggle>Hi Guest&nbsp;<span class="glyphicon glyphicon-triangle-bottom"></span></a>
            <ul class="dropdown-menu" aria-labelledby="anonymousMenu">
                <li><a href="#" class="login-link" [routerLink]="['/signin']" routerLinkActive="active">Signin</a></li>
                <li><a href="#" (click)="showPreference()">Preferences</a></li>
            </ul>
        </li>
        <li *ngIf="isLogged" ngbDropdown>
            <a href="#" id="accountMenu" ngbDropdownToggle>Welcome&nbsp;{{info.name}}&nbsp;<span class="glyphicon glyphicon-triangle-bottom"></span></a>
            <ul class="dropdown-menu" aria-labelledby="accountMenu">
                <li><a href="#" (click)="showPreference()">Preferences</a></li>
                <li><a href="#" [routerLink]="['/wishlist']">Wishlist <span class="glyphicon glyphicon-heart pull-right"></span></a></li>
                <li><a href="#" (click)="logout()">Sign Out <span class="glyphicon glyphicon-log-out pull-right"></span></a></li>
            </ul>
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