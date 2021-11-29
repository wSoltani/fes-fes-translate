import { Component } from '@angular/core';
import {
  LanguageModel,
  MLKitTranslate,
} from '@ionic-native/mlkit-translate/ngx';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  languages: LanguageModel[];
  selectedLanguage: any;
  expressions: any[];
  selectedExpression: any;
  translatedExpression: any;

  constructor(
    private mlkitTranslate: MLKitTranslate,
    private storage: StorageService
  ) {
    mlkitTranslate.getAvailableModels().then((res) => (this.languages = res));
  }

  ionViewWillEnter() {
    this.loadData();
  }

  loadData() {
    this.storage.getAll().then((res) => {
      this.expressions = res;
    });
  }

  translate() {
    this.mlkitTranslate
      .translate(this.selectedExpression, this.selectedLanguage, 'en')
      .then((res: string) => (this.translatedExpression = res))
      .catch((error: string) => console.error(error));
  }
}
