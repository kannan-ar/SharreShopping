import {Component} from "@angular/core";

import {FlipkartDealOfDay} from "../../models/flipkart/dealofday/flipkart-deal-of-day";
import {ImageHolderComponent} from "../../shared/image-holder.component";

@Component({
    selector: 'flipkart-deal',
    template: `<div class="col-md-3 col-sm-6 col-xs-12">
        <h4>{{item.title}}</h4>
        <img-holder></img-holder>
        <p>{{item.description}}</p>
    </div>`
})

export class FlipkartDealOfDayComponent {
    item: FlipkartDealOfDay;
}