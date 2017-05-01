import { Injectable, ViewContainerRef } from "@angular/core";

@Injectable()
export class ContainerDistributionService {
    private containers: ViewContainerRef[];

    constructor(containers: ViewContainerRef[]) {
        this.containers = containers;
    }

    public getNext(): ViewContainerRef {
        let selected: ViewContainerRef;

        this.containers.forEach(container => {
            if (selected == null) {
                selected = container;
            }
            else if (selected.length > container.length) {
                selected = container;
            }
        });

        return selected;
    }
}