import {Component, ViewChild, ViewContainerRef, OnInit, Renderer} from "@angular/core";

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
        <div class="row top5" infinite-scroll [infiniteScrollDistance]="2" [infiniteScrollThrottle]="500" (scrolled)="onScroll()">
            <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12">
                <template #row1></template>
            </div>
            <div class="col-lg-2 col-md-3 col-sm-4 hidden-xs-up">
                <template #row2></template>
            </div>
            <div class="col-lg-2 col-md-3 col-sm-4 hidden-xs-up">
                <template #row3></template>
            </div>
            <div class="col-lg-2 col-md-3 hidden-xs-up hidden-sm-up">
                <template #row4></template>
            </div>
            <div class="col-lg-2 hidden-xs-up hidden-sm-up hidden-md-up">
                <template #row5></template>
            </div>
            <div class="col-lg-2 hidden-xs-up hidden-sm-up hidden-md-up">
                <template #row6></template>
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
        `]
})

export class OfferComponent {
    @ViewChild('row1', { read: ViewContainerRef }) row1: ViewContainerRef;
    @ViewChild('row2', { read: ViewContainerRef }) row2: ViewContainerRef;
    @ViewChild('row3', { read: ViewContainerRef }) row3: ViewContainerRef;
    @ViewChild('row4', { read: ViewContainerRef }) row4: ViewContainerRef;
    @ViewChild('row5', { read: ViewContainerRef }) row5: ViewContainerRef;
    @ViewChild('row6', { read: ViewContainerRef }) row6: ViewContainerRef;

    containers: ViewContainerRef[];

    constructor(
        private offerService: OfferService) {
    }

    initContainers() {
        this.containers = new Array<ViewContainerRef>();

        this.containers.push(this.row1);
        this.containers.push(this.row2);
        this.containers.push(this.row3);
        this.containers.push(this.row4);
        this.containers.push(this.row5);
        this.containers.push(this.row6);
    }

    ngOnInit() {
        this.initContainers();
        this.offerService.loadOffers(this.containers);
    }

    onScroll() {
        this.offerService.loadOffers(this.containers);
    }
}