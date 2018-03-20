import {Component, ViewChild, ViewContainerRef, OnInit} from "@angular/core";
import { trigger, state, style, animate, transition } from '@angular/animations';
import Masonry from "masonry-layout";

import {OfferService} from "../services/offer.service";

@Component({
    selector: 'offers',
    template: `
        <div [hidden]="!hasItems" class="row top5">
            <div class="col-sm-12">
                <div class="offers-header clearfix">
                    <h5 class="float-left">Offers</h5>
                    <h5 class="float-right align-middle">
                        <label class="switch">
                          <input type="checkbox" checked (change)="changeVisibility($event)">
                          <div class="slider"></div>
                        </label>
                    </h5>
                </div>
            </div>
        </div>
        <div class="row top5" [hidden]="!listProgress">
            <div class="col-sm-12">
                <progress></progress>
            </div>
        </div>
        <div [@offerState]="visibility" [hidden]="!hasItems" class="row top5 offer-grid" infinite-scroll [infiniteScrollDistance]="2" [infiniteScrollThrottle]="500" (scrolled)="onScroll()">
            <ng-template #offerContainer></ng-template>
        </div>
        `,
    styles: [`
            .offers-header {
                background-color: #14819C;
                padding: 1px 10px 1px 20px;
            }

            .offers-header h4 {
                margin-top: 5px;
                margin-bottom: 5px;
            }

            .offer-grid .col-lg-12 {
                padding-left:0;
                padding-right:0;
            }
        `],
    animations: [
        trigger('offerState', [
            state('true', style({
                overflow: 'hidden',
                maxHeight: '*'
            })),
            state('false', style({
                overflow: 'hidden',
                maxHeight: '0'
            })),
            transition('true => false', animate('0.8s ease-out')),
            transition('false => true', animate('0.8s ease-in'))
        ])
    ]
})

export class OfferComponent {

    private gridSelector: string = '.offer-grid';
    private grid: Masonry;
    private hasItems: boolean;
    private visibility: string;
    private listProgress: boolean;

    @ViewChild('offerContainer', { read: ViewContainerRef }) offerContainer: ViewContainerRef;

    constructor(
        private offerService: OfferService) {
        this.visibility = "true";
        this.listProgress = false;
    }

    ngOnInit() {
        var msnry = new Masonry(this.gridSelector, {
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            percentPosition: true
        });

        this.grid = msnry;
        this.offerService.resetIndex();
        this.listProgress = true;
        this.hasItems = true;

        this.offerService.loadOffers(this.offerContainer, this.gridSelector, msnry).subscribe((data) => {
            this.listProgress = false;
            this.hasItems = this.hasItems && data;
        }, () => {
            this.listProgress = false;
            this.hasItems = false;
        });
    }

    onScroll() {
        this.offerService.loadOffers(this.offerContainer, this.gridSelector, this.grid);
    }

    changeVisibility(e) {
        this.visibility = e.target.checked ? "true" : "false";
    }
}