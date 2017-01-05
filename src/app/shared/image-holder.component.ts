import {Component, Input} from "@angular/core";

@Component({
    selector: 'img-holder',
    template: `
    <div>
        <img src="{{thumbnail}}" alt="" />
    </div>
    `
})

export class ImageHolderComponent {
    @Input() thumbnail: string
}