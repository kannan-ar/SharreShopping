import {Component} from "@angular/core";

import {EbaySearch} from "../../models/ebay/ebay-search";

@Component({
    selector: '[ebaySearch]',
    template: `
    <div class="text-center product-item">
        <div class="title pull-right"><a href="{{item.viewItemURL}}" target="_blank">{{item.title}}</a></div>
        <img-holder [thumbnail]="item.galleryURL" [url]="item.viewItemURL"></img-holder>
        <div>{{item.currencyId}}&nbsp;{{item.currentPrice}}</div>
        <p class="description"><a href="{{item.viewItemURL}}" target="_blank">{{item.subtitle}}</a></p>
    </div>
    `,
    host: { 'class': 'col-lg-12 col-md-12 col-sm-12 col-xs-12' }
})

export class EbaySearchComponent {
    item: EbaySearch;
}