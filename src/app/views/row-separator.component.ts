import {Component, HostBinding, Input} from "@angular/core";

@Component({
    selector: '[rowSeparator]',
    template: `<div class="shopping-row-separator"></div>`,
    styles: [`
        .shopping-row-separator {
            margin-top: 5px;
        }
    `],
    host: {
        'class': 'clearfix'
    }
})

export class RowSeparatorComponent {
    @HostBinding('class.visible-md-block')
    @Input()
    isMdBlock: boolean;

    @HostBinding('class.visible-sm-block')
    @Input()
    isSmBlock: boolean;

    @HostBinding('class.visible-lg-block')
    @Input()
    isLgBlock: boolean;
}