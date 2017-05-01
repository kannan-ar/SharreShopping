import { Http, Jsonp } from "@angular/http";
import { Injectable, ComponentFactoryResolver, ViewContainerRef, ComponentFactory } from "@angular/core";
import {Observable} from "rxjs/Rx";
import { Observer } from "rxjs/Observer";

import {ISearchService} from "../search.service";
import {AmazonProduct} from "../../models/amazon/amazon-product";
import {AmazonProductComponent} from "../../views/amazon/amazon-product.component";

@Injectable()
export class AmazonSearchService implements ISearchService {
    private url: string = "/api/search/amazon?query=";
    private currentIndex: number;
    private results: AmazonProduct[];
    private rowCount: number;
    private componentFactory: ComponentFactory<AmazonProductComponent>;

    constructor(
        private http: Http,
        private componentFactoryResolver: ComponentFactoryResolver) {
        this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(AmazonProductComponent);
    }

    transformResults(xml: string): AmazonProduct[] {
        let items: AmazonProduct[] = new Array<AmazonProduct>();
        return items;
    }

    loadItem(container: ViewContainerRef): boolean {
        if (this.currentIndex == this.results.length) {
            return false;
        }

        const model: AmazonProduct = this.results[this.currentIndex++];
        let amazonComponent = container.createComponent(this.componentFactory);
        amazonComponent.instance.item = model;

        return true;
    }

    loadItems(containers: ViewContainerRef[], count: number): void {
        let index = 0;
        let rowIndex = 0;

        while (index < count) {
            if (!this.loadItem(containers[rowIndex])) {
                return;
            }

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

    loadScrollItems(containers: ViewContainerRef[]): void {
        this.loadItems(containers, this.rowCount);
    }

    removeData(): void {
        this.results = new Array<AmazonProduct>();
    }

    hasData(): boolean {
        return this.results != null && this.results.length > 0;
    }
}