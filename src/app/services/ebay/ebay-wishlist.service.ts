import { Http, Headers, URLSearchParams } from "@angular/http";
import { Injectable, ComponentFactoryResolver, ViewContainerRef, ComponentFactory } from "@angular/core";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";

import {IWishlistService} from "../wishlist.service";
import {AccountService} from "../account/account.service";
import {EbayWishlistComponent} from "../../views/ebay/ebay-wishlist.component";
import {EbayProduct} from "../../models/ebay/ebay-product";

@Injectable()
export class EbayWishlistService implements IWishlistService {

    private componentFactory: ComponentFactory<EbayWishlistComponent>;

    constructor(
        private http: Http,
        private componentFactoryResolver: ComponentFactoryResolver) {
        this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(EbayWishlistComponent);
    }

    transformResult(result: any): EbayProduct {
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

        if (result != null && result.item != null) {
            let item = result.item;

            condition = item.conditionDisplayName;
            galleryURL = item.galleryURL;
            itemId = item.itemId;
            location = item.location;

            if (item.paymentMethods != null && item.paymentMethods.length > 0) {
                paymentMethod = item.paymentMethods[0];
            }

            categoryName = item.primaryCategoryName;

            if (item.currentPrice != null) {
                currencyId = item.currentPrice.currencyId;
                currentPrice = item.currentPrice.value;
            }

            title = item.title;
            subtitle = item.subtitle;
            viewItemURL = item.viewItemURLForNaturalSearch;
        }

        let product: EbayProduct = new EbayProduct(condition, galleryURL, itemId, location, paymentMethod, categoryName,
            currencyId, currentPrice, sellingState, title, subtitle, viewItemURL);

        return product;
    }

    loadComponent(product: EbayProduct, container: ViewContainerRef, gridSelector: string, grid: Masonry): void {
        let ebayComponent = container.createComponent(this.componentFactory);
        ebayComponent.instance.item = product;

        grid.appended(ebayComponent.location.nativeElement);
        imagesLoaded(gridSelector, function () {
            grid.layout();
        });
    }

    loadItem(id: string, container: ViewContainerRef, gridSelector: string, grid: Masonry) {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + AccountService.getToken());

        this.http.get("/api/wishlist/ebay/" + id, { headers: headers })
            .map(response => response.json())
            .subscribe(result => {
                this.loadComponent(result, container, gridSelector, grid);
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
