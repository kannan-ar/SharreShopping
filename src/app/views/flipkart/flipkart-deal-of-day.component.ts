import {Component, OnInit} from "@angular/core";

import {FlipkartDealOfDay} from "../../models/flipkart/flipkart-deal-of-day";

@Component({
    selector: '[flipkartDeal]',
    template: `
        <div class="text-center product-item">
            <h4 class="title"><a href="{{item.url}}" target="_blank">{{item.title}}</a></h4>
            <img-holder [thumbnail]="imageUrl" [url]="item.url"></img-holder>
            <p class="description"><a href="{{item.url}}" target="_blank">{{item.description}}</a></p>
        </div>`,
    host: { 'class': 'col-lg-2 col-md-3 col-sm-4 col-xs-12' }
})

export class FlipkartDealOfDayComponent {
    item: FlipkartDealOfDay;
    imageUrl: string;

    ngOnInit() {
        this.imageUrl = this.item.imageUrls.filter((url) => { return url.resolutionType === "low" })[0].url;
    }
}