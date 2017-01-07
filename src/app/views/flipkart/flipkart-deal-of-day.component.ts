import {Component, OnInit} from "@angular/core";

import {FlipkartDealOfDay} from "../../models/flipkart/flipkart-deal-of-day";

@Component({
    selector: 'flipkart-deal',
    template: `
    <div class="col-md-3 col-sm-4 col-xs-12">
        <div class="text-center flipkart-deal-item">
            <h4 class="title"><a href="{{item.url}}" target="_blank">{{item.title}}</a></h4>
            <img-holder [thumbnail]="imageUrl" [url]="item.url"></img-holder>
            <p class="description"><a href="{{item.url}}" target="_blank">{{item.description}}</a></p>
        </div>
    </div>`,
    styles: [`
        .flipkart-deal-item {
            border: 1px solid #f8f8f8;
            background-color: #fff;
            padding: 5px;
        }

        .flipkart-deal-item .title {
            color: #383f76;
        }

        .flipkart-deal-item .title a {
            text-decoration: none;
        }

        .flipkart-deal-item .description {
            margin-top: 10px;
            font-weight: bold;
        }

        .flipkart-deal-item .description a {
            text-decoration: none;
            color: #000000;
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