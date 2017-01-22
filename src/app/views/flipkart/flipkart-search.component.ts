﻿import {Component} from "@angular/core";

import {FlipkartSearch} from "../../models/flipkart/flipkart-search";

@Component({
    selector: '[flipkartSearch]',
    template: `
    <div class="text-center product-item">
        <div class="title"><a href="{{item.productUrl}}" target="_blank">{{item.title}}</a></div>
        <img-holder [thumbnail]="item.imageUrl" [url]="item.url"></img-holder>
        <p class="description"><a href="{{item.url}}" target="_blank">{{item.description}}</a></p>
    </div>
    `,
    host: { 'class': 'col-lg-12 col-md-12 col-sm-12 col-xs-12' }
})

export class FlipkartSearchComponent {
    item: FlipkartSearch;
}