import { Jsonp, URLSearchParams } from "@angular/http";
import { Injectable, ComponentFactoryResolver, ViewContainerRef, ComponentFactory } from "@angular/core";
import { Observable } from "rxjs/Observable";

import {ISearchService} from "../search.service";
import {EbaySearch} from "../../models/ebay/ebay-search";
import {EbaySearchComponent} from "../../views/ebay/ebay-search.component";

@Injectable()
export class EbaySearchService implements ISearchService {
    private url: string = "http://svcs.ebay.com/services/search/FindingService/v1";
    private results: EbaySearch[];
    private currentIndex: number;
    private componentFactory: ComponentFactory<EbaySearchComponent>;

    constructor(
        private jsonp: Jsonp,
        private componentFactoryResolver: ComponentFactoryResolver) {
        this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(EbaySearchComponent);
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

        this.results = new Array<EbaySearch>();

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

            let ebay: EbaySearch = new EbaySearch(condition, galleryURL, itemId, location, paymentMethod,
                categoryName, currencyId, currentPrice, sellingState, title, subtitle, viewItemURL);

            this.results.push(ebay);
        });
    }
    
    loadItem(container: ViewContainerRef): boolean {
        if (this.currentIndex == this.results.length) {
            return false;
        }

        const model: EbaySearch = this.results[this.currentIndex++];
        let ebayComponent = container.createComponent(this.componentFactory);
        ebayComponent.instance.item = model;

        return true;
    }

    getResults(query: string): Observable<any> {
        let params = new URLSearchParams();

        params.set("OPERATION-NAME", "findItemsByKeywords");
        params.set("SERVICE-NAME", "FindingService");
        params.set("SERVICE-VERSION", "1.0.0");
        params.set("GLOBAL-ID", "EBAY-IN");
        params.set("SECURITY-APPNAME", "ShareSho-7fbb-407c-8989-2000fa0722c4");
        params.set("RESPONSE-DATA-FORMAT", "JSON");
        params.set("callback", "JSONP_CALLBACK");
        params.set("keywords", query);

        return this.jsonp.get(this.url, { search: params })
            .map(response => response.json())
            .catch(response => Observable.of({}));
    }

    saveResults(items: any[]): void {
        this.transformResults(items);
        this.currentIndex = 0;
    }

    removeData(): void {
        this.results = new Array<EbaySearch>();
    }

    hasData(): boolean {
        return this.results != null && this.results.length > 0;
    }
}