import {Component, OnInit} from "@angular/core";

import {FlipkartOffer} from "../../models/flipkart/flipkart-offer";

@Component({
    selector: '[flipkartOffer]',
    template: `
            <div class="text-center flipkart-offer-item">
                <h4 class="title"><a href="{{item.url}}" target="_blank">{{item.title}}</a></h4>
                <img-holder [thumbnail]="imageUrl" [url]="item.url"></img-holder>
               <p class="description"><a href="{{item.url}}" target="_blank">{{item.description}}</a></p>
            </div>`,
    styles: [`
                .flipkart-offer-item {
                    border: 1px solid #f8f8f8;
                    background-color: #fff;
                    padding: 5px;
                }

                .flipkart-offer-item .title {
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
    host: { 'class': 'col-md-3 col-sm-4 col-xs-12' }
})

export class FlipkartOfferComponent {
    item: FlipkartOffer;
    imageUrl: string;

    ngOnInit() {
        this.imageUrl = this.item.imageUrls.filter((url) => { return url.resolutionType === "low" })[0].url;
    }
}