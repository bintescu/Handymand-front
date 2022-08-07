import { Component, OnInit } from '@angular/core';
import { SignalrService } from 'src/app/services/signalr.service';
import { faSmile } from '@fortawesome/free-regular-svg-icons';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  title = 'chat-ui';
  text: string = "";
  fasmile = faSmile;
  fapaperclip = faPaperclip;
  fapaperplane = faPaperPlane;


  constructor(public signalRService: SignalrService) {

  }

  ngOnInit(): void {
    this.signalRService.connect();
  }

  sendMessage(): void {
    this.signalRService.sendMessageToApi(this.text).subscribe({
      next: _ => this.text = '',
      error: (err) => console.error(err)
    });


    // this.signalRService.sendMessageToHub(this.text).subscribe({
    //   next: (resp:any) => this.text = '',
    //   error: (err:any) => console.error(err)
    // });
  }

}
