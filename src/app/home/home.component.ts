import {Component, OnInit} from "@angular/core";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {SettingService} from "../services/account/setting.service";
import {PreferenceComponent} from "./preference.component";

@Component({
    selector: "home",
    template: `
    <search (onItemsLoad)="onSearch($event)"></search>
    <div *ngIf="!hasSearchItems">
        <deal-of-day></deal-of-day>
        <offers></offers>
    </div>
    <template ngbModalContainer></template>
    `
})

export class HomeComponent {

    hasSearchItems: boolean;

    constructor(
        private modalService: NgbModal,
        private settingService: SettingService
        ) {
    }

    ngOnInit() {
        this.checkPreferences();
    }

    checkPreferences() {
        if (!this.settingService.hasPreferences()) {
            const modalRef = this.modalService.open(PreferenceComponent);
        }
    }

    onSearch(hasItems: boolean) {
        this.hasSearchItems = hasItems;
    }
}