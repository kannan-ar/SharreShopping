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
    count: number;

    constructor(
        private http: Http,
        private componentFactoryResolver: ComponentFactoryResolver) {
        this.currentIndex = 0;
    }

    loadItem(containers: ViewContainerRef[], items: any[]): void {
        let index = 0;

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
    }

    getResults(query: string): Observable<any> {
        return this.http.get(this.url + "/" + this.currentIndex + "/" + this.count + "?query=" + query)
            .map(response => response.json());
    }

    incrementCount() {
        this.count += 1;
    }

    resetCount(): void {
        this.count = 0;
    }

    resetIndex(): void {
        this.currentIndex = 0;
    }
}