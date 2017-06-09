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
                    <h4 class="pull-left">Offers</h4>
                    <h4 class="pull-right align-middle">
                        <label class="switch">
                          <input type="checkbox" checked (change)="changeVisibility($event)">
                          <div class="slider"></div>
                        </label>
                    </h4>
                </div>
            </div>
        </div>
        <div [@offerState]="visibility" [hidden]="!hasItems" class="row top5 offer-list" infinite-scroll [infiniteScrollDistance]="2" [infiniteScrollThrottle]="500" (scrolled)="onScroll()">
            <div class="offer-grid">
                <ng-template #offerContainer></ng-template>
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

    @ViewChild('offerContainer', { read: ViewContainerRef }) offerContainer: ViewContainerRef;

    constructor(
        private offerService: OfferService) {
        this.visibility = "true";
    }

    ngOnInit() {
        var msnry = new Masonry(this.gridSelector, {
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            percentPosition: true
        });

        this.grid = msnry;
        this.offerService.resetIndex();
        this.offerService.loadOffers(this.offerContainer, this.gridSelector, msnry).subscribe((data) => {
            this.hasItems = this.hasItems || data;
        });
    }

    onScroll() {
        this.offerService.loadOffers(this.offerContainer, this.gridSelector, this.grid);
    }

    changeVisibility(e) {
        this.visibility = e.target.checked ? "true" : "false";
    }
}