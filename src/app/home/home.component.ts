import {Component, OnInit} from "@angular/core";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {PreferenceService} from "../services/preference.service";
import {PreferenceComponent} from "./preference.component";

@Component({
    selector: "home",
    template: `
    <search (onItemsLoad)="onSearch($event)"></search>
    <div *ngIf="!hasSearchItems">
        <deal-of-day></deal-of-day>
        <offers></offers>
        <preference-list [dataChanged]="hasPreference"></preference-list>
    </div>
    <template ngbModalContainer></template>
    `
})

export class HomeComponent {

    hasSearchItems: boolean;
    hasPreference: boolean;

    constructor(
        private modalService: NgbModal,
        private preferenceService: PreferenceService) {
    }

    ngOnInit() {
        this.checkPreferences();
    }

    checkPreferences() {
        if (!this.preferenceService.hasPreferences()) {
            const modalRef = this.modalService.open(PreferenceComponent);
            modalRef.result.then((r) => { console.log(r); this.hasPreference = r; }, () => { });
        }
    }

    onSearch(hasItems: boolean) {
        this.hasSearchItems = hasItems;
    }
}