import {Component} from "@angular/core";

import {FlipkartSearch} from "../../models/flipkart/flipkart-search";

@Component({
    selector: '[flipkartSearch]',
    template: `
    <div class="text-center flipkart-search-item">
        <div class="title"><a href="{{item.productUrl}}" target="_blank">{{item.title}}</a></div>
        <img-holder [thumbnail]="item.imageUrl" [url]="item.url"></img-holder>
        <p class="description"><a href="{{item.url}}" target="_blank">{{item.description}}</a></p>
    </div>
    `,
    styles: [`
        .flipkart-search-item {
            background-color: #fff;
            padding: 5px 15px 5px 15px;
            margin-top: 5px;
            border-radius: 10px;
        }

        .flipkart-search-item .title {
            color: #383f76;
        }

        .flipkart-offer-item .title a {
            text-decoration: none;
         }

            .flipkart-offer-item .description {
                    margin-top: 10px;
                    font-weight: bold;
                }

                .flipkart-offer-item .description a {
                    text-decoration: none;
                    color: #000000;
                }
    `],
    host: { 'class': 'col-lg-12 col-md-12 col-sm-12 col-xs-12' }
})

export class FlipkartSearchComponent {
    item: FlipkartSearch;
}