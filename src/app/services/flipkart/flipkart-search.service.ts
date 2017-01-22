import { Http } from "@angular/http";
import { Injectable, ComponentFactoryResolver, ViewContainerRef } from "@angular/core";
import { Observable } from "rxjs/Observable";

import {ISearchService} from "../search.service";
import {FlipkartSearch} from "../../models/flipkart/flipkart-search";
import {FlipkartSearchComponent} from "../../views/flipkart/flipkart-search.component";

@Injectable()
export class FlipkartSearchService implements ISearchService {
    url: string = "/api/search/flipkart";
    currentIndex: number;
    results: FlipkartSearch[];

    constructor(
        private http: Http,
        private componentFactoryResolver: ComponentFactoryResolver) {
    }

    loadItem(containers: ViewContainerRef[], count: number, rowCount: number): void {
        const itemsLeft = this.results.length - this.currentIndex;
        let index = 0;
        let rowIndex = 0;
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FlipkartSearchComponent);

        if (count > itemsLeft) {
            count = itemsLeft;
        }

        while (index < count) {
            const model: FlipkartSearch = this.results[this.currentIndex++];

            let flipkartComponent = containers[rowIndex].createComponent(componentFactory);
            flipkartComponent.instance.item = model;

            ++rowIndex;
            ++index;

            if (rowIndex == rowCount) {
                rowIndex = 0;
            }

        }

        /*
        items.forEach(item => {
            const model: FlipkartSearch = item as FlipkartSearch;
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FlipkartSearchComponent);

            let flipkartComponent = containers[index].createComponent(componentFactory);
            flipkartComponent.instance.item = model;

            index += 1;

            if (index == containers.length) {
                index = 0;
            }
        });

        this.currentIndex += this.count;
        */
    }

    getResults(query: string): Observable<any> {
        return this.http.get(this.url + "?query=" + query)
            .map(response => response.json());
    }

    saveResults(items: any[]): void {
        this.results = new Array<FlipkartSearch>();

        items.forEach(item => {
            this.results.push(item);
        });

        this.currentIndex = 0;
    }
}