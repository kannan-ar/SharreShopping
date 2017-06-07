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
                <ng-template #container></ng-template>
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
            
            .switch {
              position: relative;
              display: inline-block;
              width: 25px;
              height: 14px;
              margin-bottom:0;
            }

            .switch input {display:none;}

            .slider {
              position: absolute;
              cursor: pointer;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-color: #ccc;
              -webkit-transition: .4s;
              transition: .4s;
            }

            .slider:before {
              position: absolute;
              content: "";
              height: 8px;
              width: 8px;
              left: 5px;
              bottom: 3px;
              background-color: white;
              -webkit-transition: .4s;
              transition: .4s;
            }

            input:checked + .slider {
              background-color: #2196F3;
            }

            input:focus + .slider {
              box-shadow: 0 0 1px #2196F3;
            }

            input:checked + .slider:before {
              -webkit-transform: translateX(8px);
              -ms-transform: translateX(8px);
              transform: translateX(8px);
            }
        `],
    animations: [
        trigger('offerState', [
            state('true', style({
                opacity: 1,
                visibility: 'visible'
            })),
            state('false', style({
                opacity: 0,
                visibility: 'hidden'
            })),
            transition('true => false', animate('100ms ease-in')),
            transition('false => true', animate('100ms ease-out'))
        ])
    ]
})

export class OfferComponent {

    private gridSelector: string = '.offer-grid';
    private grid: Masonry;
    private hasItems: boolean;
    private visibility: string;

    @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

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
        this.offerService.loadOffers(this.container, this.gridSelector, msnry).subscribe((data) => {
            this.hasItems = this.hasItems || data;
        });
    }

    onScroll() {
        this.offerService.loadOffers(this.container, this.gridSelector, this.grid);
    }

    changeVisibility(e) {
        this.visibility = e.target.checked ? "true" : "false";
    }
}