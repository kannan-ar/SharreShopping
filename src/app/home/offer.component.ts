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
            <template #offer></template>
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
    itemCount: number = 4;

    @ViewChild('offer', { read: ViewContainerRef }) offer: ViewContainerRef;

    constructor(
        private offerService: OfferService, private renderer: Renderer) {
    }

    ngOnInit() {
        this.offerService.loadOffers(this.itemCount, this.offer, this.renderer);
    }

    onScroll() {
        this.offerService.loadOffers(this.itemCount, this.offer, this.renderer);
    }
}