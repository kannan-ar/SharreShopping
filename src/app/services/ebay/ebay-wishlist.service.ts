import { HttpClient } from "@angular/common/http";
import { Injectable, ComponentFactoryResolver, ViewContainerRef, ComponentFactory, ComponentRef } from "@angular/core";
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
        private httpClient: HttpClient,
        private componentFactoryResolver: ComponentFactoryResolver) {
        this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(EbayWishlistComponent);
    }

    private onComponentRemoved(component: ComponentRef<EbayWishlistComponent>, grid: Masonry) {
        component.destroy();
        grid.layout();
    }

    loadComponent(product: EbayProduct, container: ViewContainerRef, gridSelector: string, grid: Masonry): void {
        let ebayComponent = container.createComponent(this.componentFactory);
        ebayComponent.instance.item = product;
        ebayComponent.instance.onItemRemoved.subscribe(e => {
            this.onComponentRemoved(ebayComponent, grid);
        });

        grid.appended(ebayComponent.location.nativeElement);
        imagesLoaded(gridSelector, function () {
            grid.layout();
        });
    }

    loadItem(id: string, container: ViewContainerRef, gridSelector: string, grid: Masonry) {
        this.httpClient.get<EbayProduct>("/api/wishlist/ebay/" + id)
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
        this.httpClient.get<string[]>("/api/wishlist/ebay")
            .subscribe(results => {
                this.loadWishlist(results, container, gridSelector, grid);
            });
    }
}
