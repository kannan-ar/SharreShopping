import {Component, Input} from "@angular/core";

@Component({
    selector: 'img-holder',
    template: `
    <div>
        <a class="img-holder" href="{{url}}" target="_blank"><img src="{{thumbnail}}" alt="" border="0" class="img-responsive center-block" /></a>
    </div>
    `,
    styles: [`
        .img-holder {
            text-decoration: none;
        }
    `]
})

export class ImageHolderComponent {
    @Input() thumbnail: string
    @Input() url: string
}