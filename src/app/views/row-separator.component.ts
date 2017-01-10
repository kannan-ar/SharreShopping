import {Component, HostBinding, Input} from "@angular/core";

@Component({
    selector: '[rowSeparator]',
    template: ``,
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