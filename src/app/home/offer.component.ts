import {Component, ViewChild, ViewContainerRef, OnInit} from "@angular/core";
import Masonry from "masonry-layout";

import {OfferService} from "../services/offer.service";

@Component({
    selector: 'offers',
    template: `
        <div class="row top5">
            <div class="col-sm-12">
                <div class="offers-header">
                    <h4>Offers</h4>
                </div>
            </div>
        </div>
        <div class="row top5 offer-list" infinite-scroll [infiniteScrollDistance]="2" [infiniteScrollThrottle]="500" (scrolled)="onScroll()">
            <div class="offer-grid">
                <template #container></template>
            </div>
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

            .offer-list .col-lg-12 {
                padding-left:0;
                padding-right:0;
            }
        `]
})

export class OfferComponent {

    private gridSelector: string = '.offer-grid';
    private grid: Masonry;
    @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

    constructor(
        private offerService: OfferService) {
    }

    ngOnInit() {
        var msnry = new Masonry(this.gridSelector, {
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            percentPosition: true
        });

        this.grid = msnry;
        this.offerService.resetIndex();
        this.offerService.loadOffers(this.container, this.gridSelector, msnry);
    }

    onScroll() {
        this.offerService.loadOffers(this.container, this.gridSelector, this.grid);
    }
}