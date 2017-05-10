import { Injectable, ViewContainerRef, Inject } from "@angular/core";
import {Observable} from "rxjs/Rx";

import Masonry from "masonry-layout";

export interface IOfferService {
    resetIndex(): void;
    getOffers(container: ViewContainerRef, gridSelector: string, grid: Masonry, count: number): void;
}

@Injectable()
export class OfferService {
    constructor(
        @Inject('OfferServices') private services) {
    }

    resetIndex(): void {
        this.services.forEach(service => {
            service.resetIndex();
        });
    }

    loadOffers(container: ViewContainerRef, gridSelector: string, grid: Masonry): void {
        const count: number = 6;

        this.services.forEach(service => {
            service.getOffers(container, gridSelector, grid, count);
        });
    }
}