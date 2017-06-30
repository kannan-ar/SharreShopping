import { Jsonp, URLSearchParams } from "@angular/http";
import { Injectable, ComponentFactoryResolver, ViewContainerRef, ComponentFactory } from "@angular/core";
import {Subject} from "rxjs/Subject";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";

import {ISearchService} from "../search.service";
import {EbayProduct} from "../../models/ebay/ebay-product";
import {EbayProductComponent} from "../../views/ebay/ebay-product.component";

@Injectable()
export class EbaySearchService implements ISearchService {
    private url: string = "http://svcs.ebay.com/services/search/FindingService/v1";
    private results: EbayProduct[];
    private currentIndex: number;
    private componentFactory: ComponentFactory<EbayProductComponent>;

    constructor(
        private jsonp: Jsonp,
        private componentFactoryResolver: ComponentFactoryResolver) {
        this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(EbayProductComponent);
    }

    private transformResults(items: any[]): void {
        let item: any = <any>items;

        if (item == null) {
            return;
        }

        if (item.findItemsByKeywordsResponse == null ||
            (item.findItemsByKeywordsResponse != null && item.findItemsByKeywordsResponse.length == 0)) {
            return;
        }

        item = item.findItemsByKeywordsResponse[0];

        if (item.searchResult == null || (item.searchResult != null && item.searchResult.length == 0)) {
            return;
        }

        let searchResult = item.searchResult[0];

        if (searchResult.item == null || (searchResult.item != null && searchResult.item.length == 0)) {
            return;
        }

        this.results = new Array<EbayProduct>();

        searchResult.item.forEach(item => {
            let condition: string;
            let galleryURL: string;
            let itemId: string;
            let location: string;
            let paymentMethod: string;
            let categoryName: string;
            let currencyId: string;
            let currentPrice: number;
            let sellingState: string;
            let title: string;
            let subtitle: string;
            let viewItemURL: string;

            if (item.condition != null && item.condition.length > 0 &&
                item.condition[0].conditionDisplayName != null && item.condition[0].conditionDisplayName.length > 0) {
                condition = item.condition[0].conditionDisplayName[0];
            }
            
            if (item.galleryURL != null && item.galleryURL.length > 0) {
                galleryURL = item.galleryURL[0];
            }
            
            if (item.itemId != null && item.itemId.length > 0) {
                itemId = item.itemId[0];
            }

            if (item.location != null && item.location.length > 0) {
                location = item.location[0];
            }

            if (item.paymentMethod != null && item.paymentMethod.length > 0) {
                paymentMethod = item.paymentMethod[0];
            }

            if (item.primaryCategory != null && item.primaryCategory.length > 0 &&
                item.primaryCategory[0].categoryName != null && item.primaryCategory[0].categoryName.length > 0) {
                categoryName = item.primaryCategory[0].categoryName[0];
            }

            if (item.sellingStatus != null && item.sellingStatus.length > 0 &&
                item.sellingStatus[0].currentPrice != null && item.sellingStatus[0].currentPrice.length > 0) {
                currencyId = item.sellingStatus[0].currentPrice[0].currencyId;
                currentPrice = item.sellingStatus[0].currentPrice[0].value;
            }

            if (item.sellingStatus != null && item.sellingStatus.length > 0 &&
                item.sellingStatus[0].sellingState != null && item.sellingStatus[0].sellingState.length > 0) {
                sellingState = item.sellingStatus[0].sellingState[0];
            }

            if (item.title != null && item.title.length > 0) {
                title = item.title[0];
            }

            if (item.subtitle != null && item.subtitle.length > 0) {
                subtitle = item.subtitle[0];
            }

            if (item.viewItemURL != null && item.viewItemURL.length > 0) {
                viewItemURL = item.viewItemURL[0];
            }

            let ebay: EbayProduct = new EbayProduct(condition, galleryURL, itemId, location, paymentMethod,
                categoryName, currencyId, currentPrice, sellingState, title, subtitle, viewItemURL);

            this.results.push(ebay);
        });
    }
    
    loadItem(gridSelector: string, grid: Masonry, container: ViewContainerRef): void {
        
        const model: EbayProduct = this.results[this.currentIndex++];
        if (model != null) {
            let ebayComponent = container.createComponent(this.componentFactory);
            ebayComponent.instance.item = model;

            grid.appended(ebayComponent.location.nativeElement);
            imagesLoaded(gridSelector, function () {
                grid.layout();
            });
        }
    }

    loadItems(gridSelector: string, count: number, grid: Masonry, container: ViewContainerRef): void {
        let index = 0;

        while (index < count && this.currentIndex < this.results.length) {
            this.loadItem(gridSelector, grid, container);
            ++index;
        }
    }

    search(query: string, gridSelector: string, grid: Masonry, container: ViewContainerRef, count: number): Subject<boolean> {
        let params = new URLSearchParams();
        let response: Subject<boolean> = new Subject<boolean>();

        params.set("OPERATION-NAME", "findItemsByKeywords");
        params.set("SERVICE-NAME", "FindingService");
        params.set("SERVICE-VERSION", "1.0.0");
        params.set("GLOBAL-ID", "EBAY-IN");
        params.set("SECURITY-APPNAME", "ShareSho-7fbb-407c-8989-2000fa0722c4");
        params.set("RESPONSE-DATA-FORMAT", "JSON");
        params.set("callback", "JSONP_CALLBACK");
        params.set("keywords", query);

        this.jsonp.get(this.url, { search: params })
            .map(response => response.json())
            .subscribe(results => {
                this.currentIndex = 0;
                this.transformResults(results);
                this.loadItems(gridSelector, count, grid, container);
                response.next(results.length > 0);
            });

        return response;
    }

    loadScrollItems(gridSelector: string, grid: Masonry, container: ViewContainerRef, count: number): void {
        this.loadItems(gridSelector, count, grid, container);
    }

    removeData(): void {
        this.results = new Array<EbayProduct>();
    }

    hasData(): boolean {
        return this.results != null && this.results.length > 0;
    }
}