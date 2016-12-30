import {Component, OnInit} from "@angular/core";

import {FlipkartDealOfDay} from "../../models/flipkart/flipkart-deal-of-day";
import {ImageHolderComponent} from "../../shared/image-holder.component";

@Component({
    selector: 'flipkart-deal',
    template: `<div class="col-md-3 col-sm-6 col-xs-12">
        <div class="text-center">
            <h4>{{item.title}}</h4>
            <img-holder [thumbnail]="imageUrl"></img-holder>
            <p>{{item.description}}</p>
        </div>
    </div>`
})

export class FlipkartDealOfDayComponent {
    item: FlipkartDealOfDay;
    imageUrl: string;

    ngOnInit() {
       this.imageUrl =  this.item.imageUrls.filter((url) => {return url.resolutionType === "low"})[0].url;
    }
}