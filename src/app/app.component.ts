import {Component} from "@angular/core";

@Component({
    selector: "shopping",
    template: `
    <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">SharreShopping</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <img src="/images/amazon-color.png" />&nbsp;Amazon&nbsp;
                    <img src="/images/ebay-color.png" />&nbsp;Ebay&nbsp;
                    <img src="/images/flipkart-color.png" />&nbsp;Flipkart
                </li>
            </ul>
            <ul topMenu class="nav navbar-nav ml-auto">
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