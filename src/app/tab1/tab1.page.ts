import { Component } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  constructor(private speechRecognition: SpeechRecognition) {
    this.speechRecognition
      .isRecognitionAvailable()
      .then((available: boolean) => console.log(available));
  }

  startRecognition() {
    this.speechRecognition.hasPermission().then((hasPermission: boolean) => {
      if (hasPermission) {
        this.speechRecognition.startListening().subscribe(
          (matches: string[]) => console.log(matches),
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
}
