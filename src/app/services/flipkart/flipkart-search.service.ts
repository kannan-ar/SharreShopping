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
            .map(response => response.json())
            .catch(response => Observable.of({}));
    }

    saveResults(items: any[]): void {
        this.results = new Array<FlipkartSearch>();

        items.forEach(item => {
            this.results.push(item);
        });

        this.currentIndex = 0;
    }

    removeData(): void {
        this.results = new Array<FlipkartSearch>();
    }

    hasData(): boolean {
        return this.results != null && this.results.length > 0;
    }
}