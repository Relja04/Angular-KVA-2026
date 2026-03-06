import { Component } from '@angular/core';

@Component({
    selector: 'app-profile',
    imports: [],
    templateUrl: './profile.html',
    styleUrl: './profile.css',
})
export class Profile {
    selectedTab: string = 'Account settings';

    click(tabName: string) {
        this.selectedTab = tabName;
    }
}
