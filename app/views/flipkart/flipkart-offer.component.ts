import {Component, OnInit} from "@angular/core";

import {FlipkartOffer} from "../../models/flipkart/flipkart-offer";

@Component({
        selector: 'flipkart-offer',
        template: `
        <div class="col-md-3 col-sm-4 col-xs-12">
                <div class="text-center flipkart-offer-item">
                        <h4><a href="{{item.url}}">{{item.title}}</a></h4>
                         <img-holder [thumbnail]="imageUrl"></img-holder>
                        <p>{{item.description}}</p>
                </div>
        </div>`,
        styles: [`
                .flipkart-offer-item {
                        border: 1px solid #14819C;
                }
        `]
})

export class FlipkartOfferComponent {
        item: FlipkartOffer;
        imageUrl: string;

        ngOnInit() {
                this.imageUrl =  this.item.imageUrls.filter((url) => {return url.resolutionType === "low"})[0].url;
        }
}