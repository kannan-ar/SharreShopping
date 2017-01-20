import {Component} from "@angular/core";

@Component({
    selector: "home",
    template: `
    <search (onItemsLoad)="onSearch($event)"></search>
    <div *ngIf="!hasSearchItems">
        <deal-of-day></deal-of-day>
        <offers></offers>
    </div>
    `
})

export class HomeComponent {

    hasSearchItems: boolean;

    onSearch(hasItems: boolean) {
        this.hasSearchItems = hasItems;
    }
}