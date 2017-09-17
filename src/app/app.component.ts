import {Component} from "@angular/core";

@Component({
    selector: "shopping",
    template: `
    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="navbar-header">
            <button type="button" class="collapsed navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">SharreShopping</a>
        </div>
        <div class="collapse navbar-collapse" id="navbar-collapse-1">
            <p class="navbar-text navbar-left">
                <img src="/images/amazon-color.png" />&nbsp;Amazon&nbsp;
                <img src="/images/ebay-color.png" />&nbsp;Ebay&nbsp;
                <img src="/images/flipkart-color.png" />&nbsp;Flipkart
            </p>
            <ul topMenu class="nav navbar-nav navbar-right">
            </ul>
        </div>
    </nav>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <router-outlet></router-outlet>
            </div>
        </div>
    </div>`,
    styles: [
        `
            .login-info {
                padding-right:10px;
            }

            .amazon-box {
                background-color:#ff9900;
                width:10px;
                height:10px;
                display:block;
            }
        `]
})

export class AppComponent {
}