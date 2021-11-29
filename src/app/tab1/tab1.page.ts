import { Component } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { StorageService } from '../_services/storage.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  userSpeech: string;

  constructor(
    private speechRecognition: SpeechRecognition,
    private storage: StorageService,
    private toast: ToastController
  ) {
    this.speechRecognition
      .isRecognitionAvailable()
      .then((available: boolean) => console.log(available));
  }

  startRecognition() {
    this.speechRecognition.hasPermission().then((hasPermission: boolean) => {
      if (hasPermission) {
        this.speechRecognition.startListening().subscribe(
          (matches: string[]) => {
            this.userSpeech = matches[0];
            this.storage.set(
              new Date().toLocaleDateString() + '-' + new Date().valueOf(),
              this.userSpeech
            );
            this.presentToast();
          },
          (onerror) => console.log('error:', onerror)
        );
      } else {
        this.speechRecognition.requestPermission().then(
          () => this.startRecognition(),
          () => console.log('Denied')
        );
      }
    });
  }

  async presentToast() {
    const toast = await this.toast.create({
      message: 'User input saved: ' + this.userSpeech,
      duration: 3000,
      translucent: true,
      position: 'top',
      animated: true,
      color: 'success',
    });
    toast.present();
  }
}
