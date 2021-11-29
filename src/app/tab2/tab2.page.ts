import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  userInputs: any[];

  constructor(
    private storage: StorageService,
    private actionSheet: ActionSheetController
  ) {}

  ionViewWillEnter() {
    this.loadData();
  }

  loadData() {
    this.storage.getAll().then((res) => {
      this.userInputs = res;
    });
  }

  doRefresh($event: any) {
    this.loadData();
    $event.target.complete();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheet.create({
      header: 'History',
      buttons: [
        {
          text: 'Delete all',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.storage.clear();
            this.loadData();
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();
    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  deleteInput(input) {
    this.storage.remove(input.value);
    this.userInputs.splice(this.userInputs.indexOf(input), 1);
  }
}
