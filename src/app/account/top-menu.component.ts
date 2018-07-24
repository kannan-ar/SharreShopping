import { Component, OnInit } from "@angular/core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

import { PreferenceComponent } from "../home/preference.component";
import { LoginInfo } from "../models/account/login-info";
import { AccountService } from "../services/account/account.service";

@Component({
    selector: "[topMenu]",
    template: `
        <li *ngIf="!isLogged" ngbDropdown>
            <a id="anonymousMenu" class="nav-link lnk" ngbDropdownToggle>Hi Guest&nbsp;<span class="glyphicon glyphicon-triangle-bottom"></span></a>
            <div ngbDropdownMenu aria-labelledby="anonymousMenu">
                <a href="#" class="dropdown-item menu-link" [routerLink]="['/dashboard']" routerLinkActive="active">Dashboard</a>
                <a href="#" class="dropdown-item menu-link" [routerLink]="['/signin']">Signin</a>
                <a href="#" class="dropdown-item menu-link" (click)="showPreference()">Preferences</a>
            </div>
        </li>
        <li *ngIf="isLogged" ngbDropdown>
            <a id="accountMenu" class="nav-link lnk" ngbDropdownToggle>Welcome&nbsp;{{info.name}}&nbsp;<span class="glyphicon glyphicon-triangle-bottom"></span></a>
            <div ngbDropdownMenu aria-labelledby="accountMenu">
                <a href="#" class="dropdown-item menu-link" [routerLink]="['/dashboard']" routerLinkActive="active">Dashboard</a>
                <a href="#" class="dropdown-item menu-link" (click)="showPreference()">Preferences</a>
                <a href="#" class="dropdown-item menu-link" [routerLink]="['/wishlist']">Wishlist <span class="glyphicon glyphicon-heart float-right"></span></a>
                <a href="#" class="dropdown-item menu-link" (click)="logout()">Sign Out <span class="glyphicon glyphicon-log-out float-right"></span></a>
            </div>
        </li>
    `,
    providers: [NgbDropdownConfig]
})

export class TopMenuComponent {
    isLogged: boolean;
    info: LoginInfo;

    constructor(
        private modalService: NgbModal,
        private config: NgbDropdownConfig,
        private accountService: AccountService) {
        this.info = new LoginInfo("");
        config.placement = 'bottom-right';
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