import {Component, OnInit} from "@angular/core";

import {FlipkartDealOfDay} from "../../models/flipkart/flipkart-deal-of-day";

@Component({
    selector: 'flipkart-deal',
    template: `
    <div class="col-md-3 col-sm-4 col-xs-12">
        <div class="text-center flipkart-deal-item">
            <h4><a href="{{item.url}}">{{item.title}}</a></h4>
            <img-holder [thumbnail]="imageUrl"></img-holder>
            <p>{{item.description}}</p>
        </div>
    </div>`,
    styles: [`
        .flipkart-deal-item {
            border: 1px solid #14819C;
        }
    `]
})

export class FlipkartDealOfDayComponent {
    item: FlipkartDealOfDay;
    imageUrl: string;
    
    ngOnInit() {
       this.imageUrl =  this.item.imageUrls.filter((url) => {return url.resolutionType === "low"})[0].url;
    }
}