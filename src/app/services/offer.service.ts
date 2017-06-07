import { Injectable, ViewContainerRef, Inject } from "@angular/core";
import {Subject} from "rxjs/Subject";

import Masonry from "masonry-layout";

export interface IOfferService {
    resetIndex(): void;
    getOffers(container: ViewContainerRef, gridSelector: string, grid: Masonry, count: number): Subject<boolean>;
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

    loadOffers(container: ViewContainerRef, gridSelector: string, grid: Masonry): Subject<boolean> {
        const count: number = 6;
        let response: Subject<boolean> = new Subject<boolean>();

        this.services.forEach(service => {
            service.getOffers(container, gridSelector, grid, count).subscribe((data) => {
                response.next(data);
            });
        });

        return response;
    }
}