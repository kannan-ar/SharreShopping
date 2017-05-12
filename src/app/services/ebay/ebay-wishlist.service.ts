import { Http, Jsonp, Headers, URLSearchParams } from "@angular/http";
import { Injectable, ComponentFactoryResolver, ViewContainerRef, ComponentFactory } from "@angular/core";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";

import {IWishlistService} from "../wishlist.service";
import {AccountService} from "../account/account.service";
import {EbayWishlistComponent} from "../../views/ebay/ebay-wishlist.component";

@Injectable()
export class EbayWishlistService implements IWishlistService {
    private url: string = "http://open.api.ebay.com/shopping";
    private componentFactory: ComponentFactory<EbayWishlistComponent>;

    constructor(
        private http: Http,
        private jsonp: Jsonp,
        private componentFactoryResolver: ComponentFactoryResolver) {
        this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(EbayWishlistComponent);
    }

    loadItem(id: string, container: ViewContainerRef, gridSelector: string, grid: Masonry) {
        let params = new URLSearchParams();

        params.set("callname", "GetSingleItem");
        params.set("responseencoding", "JSON");
        params.set("appid", "ShareSho-7fbb-407c-8989-2000fa0722c4");
        params.set("siteid", "203");
        params.set("version", "967");
        params.set("ItemID", id);
        params.set("IncludeSelector", "Details");
        params.set("callback", "JSONP_CALLBACK");

        this.jsonp.get(this.url, { search: params })
            .map(response => response.json())
            .subscribe(results => {
                console.log(results);
            });
    }

    loadWishlist(ids: string[], container: ViewContainerRef, gridSelector: string, grid: Masonry) {
        ids.forEach(id => {
            this.loadItem(id, container, gridSelector, grid);
        });
    }

    loadAll(container: ViewContainerRef, gridSelector: string, grid: Masonry): void {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + AccountService.getToken());

        this.http.get("/api/wishlist/ebay", {
            headers: headers
        }).map(response => response.json())
            .subscribe(results => {
                this.loadWishlist(results, container, gridSelector, grid);
            });
    }
}
