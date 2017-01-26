import { Http } from "@angular/http";
import { Injectable, ComponentFactoryResolver, ViewContainerRef, ComponentFactory } from "@angular/core";
import { Observable } from "rxjs/Observable";

import {ISearchService} from "../search.service";
import {FlipkartSearch} from "../../models/flipkart/flipkart-search";
import {FlipkartSearchComponent} from "../../views/flipkart/flipkart-search.component";

@Injectable()
export class FlipkartSearchService implements ISearchService {
    url: string = "/api/search/flipkart?query=";
    currentIndex: number;
    results: FlipkartSearch[];
    private componentFactory: ComponentFactory<FlipkartSearchComponent>;

    constructor(
        private http: Http,
        private componentFactoryResolver: ComponentFactoryResolver) {
        this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(FlipkartSearchComponent);
    }

    /*
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
    }
    */

    loadItem(container: ViewContainerRef): boolean {
        if (this.currentIndex == this.results.length) {
            return false;
        }

        const model: FlipkartSearch = this.results[this.currentIndex++];
        let flipkartComponent = container.createComponent(this.componentFactory);
        flipkartComponent.instance.item = model;

        return true;
    }

    getResults(query: string): Observable<any> {
        return this.http.get(this.url + query)
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