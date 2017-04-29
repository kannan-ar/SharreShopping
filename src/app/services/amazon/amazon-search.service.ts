import { Http, Jsonp } from "@angular/http";
import { Injectable, ComponentFactoryResolver, ViewContainerRef, ComponentFactory } from "@angular/core";
import {Observable} from "rxjs/Rx";
import { Observer } from "rxjs/Observer";

import {ISearchService} from "../search.service";
import {AmazonSearch} from "../../models/amazon/amazon-search";
import {AmazonSearchComponent} from "../../views/amazon/amazon-search.component";

@Injectable()
export class AmazonSearchService implements ISearchService {
    private url: string = "/api/search/amazon?query=";
    private currentIndex: number;
    private results: AmazonSearch[];
    private rowCount: number;
    private componentFactory: ComponentFactory<AmazonSearchComponent>;

    constructor(
        private http: Http,
        private componentFactoryResolver: ComponentFactoryResolver) {
        this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(AmazonSearchComponent);
    }

    transformResults(xml: string): AmazonSearch[] {
        let items: AmazonSearch[] = new Array<AmazonSearch>();
        return items;
    }

    loadItem(container: ViewContainerRef): boolean {
        if (this.currentIndex == this.results.length) {
            return false;
        }

        const model: AmazonSearch = this.results[this.currentIndex++];
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

    /*
    getResults(query: string): Observable<any> {
        return this.http.get(this.url + query)
            .map(response => response.json())
            .catch(response => Observable.of({}));
    }

    saveResults(items: any[]): void {
        this.results = new Array<AmazonSearch>();

        items.forEach(item => {
            this.results.push(item);
        });

        this.currentIndex = 0;
    }
    */
    removeData(): void {
        this.results = new Array<AmazonSearch>();
    }

    hasData(): boolean {
        return this.results != null && this.results.length > 0;
    }
}