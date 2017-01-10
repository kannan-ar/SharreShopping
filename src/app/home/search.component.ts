import {Component} from "@angular/core";

@Component({
    selector: 'search',
    template: `
        <div class="row">
            <div class="col-xs-1 col-sm-1 col-md-1"></div>
            <div class="col-xs-10 col-sm-10 col-md-10">
                <form>
                    <div class="form-group">
                        <input id="search" name="search"  type="text" class="form-control  input-lg" [(ngModel)]="searchTerm" placeholder="Search with any keywords" />
                    </div>
                </form>
            </div>
            <div class="col-xs-1 col-sm-1 col-md-1"></div>
        </div>
    `
})

export class SearchComponent {
    searchTerm: string;
}