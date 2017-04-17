import {Component, OnInit} from "@angular/core";

import {FlipkartOffer} from "../../models/flipkart/flipkart-offer";

@Component({
    selector: '[flipkartOffer]',
    template: `
            <div class="text-center product-item">
                <h4 class="title pull-right"><a href="{{item.url}}" target="_blank">{{item.title}}</a></h4>
                <img-holder [thumbnail]="imageUrl" [url]="item.url"></img-holder>
                <p class="description"><a href="{{item.url}}" target="_blank">{{item.description}}</a></p>
            </div>`,
    host: { 'class': 'col-lg-12 col-md-12 col-sm-12 col-xs-12' }
})

export class FlipkartOfferComponent {
    item: FlipkartOffer;
    imageUrl: string;

    ngOnInit() {
        this.imageUrl = this.item.imageUrls.filter((url) => { return url.resolutionType === "low" })[0].url;
    }
}