import {Component, OnInit} from "@angular/core";

import {FlipkartOffer} from "../../models/flipkart/flipkart-offer";

@Component({
    selector: '[flipkartOffer]',
    template: `
            <div class="text-center product-item">
                <h6 class="title float-right"><a href="{{item.url}}" target="_blank">{{item.title}}</a></h6>
                <img-holder [thumbnail]="imageUrl" [url]="item.url"></img-holder>
                <p class="description"><a href="{{item.url}}" target="_blank">{{item.description}}</a></p>
            </div>`,
    host: { 'class': 'grid-sizer grid-item col-lg-2 col-md-3 col-sm-4 col-xs-12' }
})

export class FlipkartOfferComponent {
    item: FlipkartOffer;
    imageUrl: string;

    ngOnInit() {
        this.imageUrl = this.item.imageUrls.filter((url) => { return url.resolutionType === "low" })[0].url;
    }
}