import {Component, OnInit} from "@angular/core";

import {FlipkartOffer} from "../../models/flipkart/flipkart-offer";
import {ImageHolderComponent} from "../../shared/image-holder.component";

@Component({
        selector: 'flipkart-offer',
        template: `
        <div class="col-md-3 col-sm-4 col-xs-12">
                <div class="text-center flipkart-deal-item">
                        <h4><a href="{{item.url}}">{{item.title}}</a></h4>
                        <img-holder [thumbnail]="imageUrl"></img-holder>
                        <p>{{item.description}}</p>
                </div>
        </div>`
})

export class FlipkartOfferComponent {
        item: FlipkartOffer;
        imageUrl: string;

        ngOnInit() {
                this.imageUrl =  this.item.imageUrls.filter((url) => {return url.resolutionType === "low"})[0].url;
        }
}