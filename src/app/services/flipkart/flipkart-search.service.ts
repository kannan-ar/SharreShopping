import { Http } from "@angular/http";
import { Injectable, ComponentFactoryResolver, ViewContainerRef, ComponentFactory } from "@angular/core";
import { Observable } from "rxjs/Observable";

import {ISearchService} from "../search.service";
import {FlipkartProduct} from "../../models/flipkart/flipkart-product";
import {FlipkartProductComponent} from "../../views/flipkart/flipkart-product.component";

@Injectable()
export class FlipkartSearchService implements ISearchService {
    url: string = "/api/search/flipkart?query=";
    currentIndex: number;
    rowCount: number;
    results: FlipkartProduct[];
    private componentFactory: ComponentFactory<FlipkartProductComponent>;

    constructor(
        private http: Http,
        private componentFactoryResolver: ComponentFactoryResolver) {
        this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(FlipkartProductComponent);
    }

    loadItem(container: ViewContainerRef): boolean {
        if (this.currentIndex == this.results.length) {
            return false;
        }

        const model: FlipkartProduct = this.results[this.currentIndex++];
        let flipkartComponent = container.createComponent(this.componentFactory);
        flipkartComponent.instance.item = model;

        return true;
    }

    loadScrollItems(containers: ViewContainerRef[]): void {
        this.loadItems(containers, this.rowCount);
    }

    loadItems(containers: ViewContainerRef[], count: number): void {
        let index = 0;
        let rowIndex = 0;
        let hasItem = true;

        while (index < count && hasItem) {
            hasItem = this.loadItem(containers[rowIndex]);

            ++index;
            ++rowIndex;

            if (rowIndex == this.rowCount) {
                rowIndex = 0;
            }
        }
    }

    search(query: string, rowCount: number, containers: ViewContainerRef[]): void {
        this.rowCount = rowCount;

        this.http.get(this.url + query)
            .map(response => response.json())
            .subscribe(results => {
                this.currentIndex = 0;
                this.results = results;
                this.loadItems(containers, 20);
            });
    }
    /*
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
    */
    removeData(): void {
        this.results = new Array<FlipkartProduct>();
    }

    hasData(): boolean {
        return this.results != null && this.results.length > 0;
    }
}