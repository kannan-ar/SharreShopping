import {Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, OnInit} from "@angular/core";

import {FlipkartDealOfDayComponent} from "../views/flipkart/flipkart-deal-of-day.component";
import {DealOfDayService} from "../services/deal-of-day.service";

@Component({
    selector: 'deal-of-day',
    template: `
    <div #deal></div>
    `
})

export class DealOfDayComponent {

    @ViewChild('deal', {read: ViewContainerRef}) deal: ViewContainerRef;
    
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private dealOfDayService: DealOfDayService) {
    }

    ngOnInit() {
        const flipkartComponent = this.componentFactoryResolver.resolveComponentFactory(FlipkartDealOfDayComponent);
        var a = this.deal.createComponent(flipkartComponent);
        a.instance.text = 'One';
    }
}