import {Component} from "@angular/core";

import {FlipkartSearch} from "../../models/flipkart/flipkart-search";

@Component({
    selector: '[flipkartSearch]',
    template: `
    <div class="text-center product-item">
        <div class="pull-left"><img src="../assets/images/flipkart-icon.png" /></div>
        <div class="title pull-right"><a href="{{item.productUrl}}" target="_blank">{{item.title}}</a></div>
        <img-holder [thumbnail]="item.imageUrl" [url]="item.url"></img-holder>
        <p class="description"><a href="{{item.url}}" target="_blank">{{item.description}}</a></p>
        <div><s>{{item.sellingCurrency}}&nbsp;{{item.sellingAmount}}</s>&nbsp;{{item.mrpCurrency}}&nbsp;{{item.mrpAmount}}</div>
        <div>You saved {{item.discountPercentage}}%</div>
    </div>
    `,
    host: { 'class': 'col-lg-12 col-md-12 col-sm-12 col-xs-12' }
})

export class FlipkartSearchComponent {
    item: FlipkartSearch;
}