import {Component} from "@angular/core";

import {AmazonSearch} from "../../models/amazon/amazon-search";

@Component({
    selector: '[amazonSearch]',
    template: `<div>test</div>`,
    host: { 'class': 'col-lg-12 col-md-12 col-sm-12 col-xs-12' }
})

export class AmazonSearchComponent {
    item: AmazonSearch;
}