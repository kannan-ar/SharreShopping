import {Component} from "@angular/core";

import {AmazonSearch} from "../../models/amazon/amazon-search";

@Component({
    selector: '[amazonSearch]',
    template: `<div class="text-center product-item">
                    <div class="title"><a href="{{item.url}}" target="_blank">{{item.title}}</a></div>
                    <img-holder [thumbnail]="item.imageUrl" [url]="item.url"></img-holder>
                    <div>{{item.formattedPrice}}</div>
               </div>`,
    host: { 'class': 'col-lg-12 col-md-12 col-sm-12 col-xs-12' }
})

export class AmazonSearchComponent {
    item: AmazonSearch;
}