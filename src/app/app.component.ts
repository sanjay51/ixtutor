import { UIInteractionService } from './shared/ui-interaction.service';
import { FooterComponent } from './footer/footer.component';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';

@Component({
    selector: 'my-app',
    styleUrls: ['./app.component.css'],
    templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
    constructor(private uiInteractionService: UIInteractionService) { }
    ngOnInit() { }

    isFooterVisible(): boolean {
        return this.uiInteractionService.isFooterVisible();
    }
}
