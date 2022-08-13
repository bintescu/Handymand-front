import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MessagePackHubProtocol } from '@microsoft/signalr-protocol-msgpack'
import { ChatMesage } from '../interfaces/chat-mesage';
import { environment } from 'src/environments/environment';


@Injectable({

  providedIn: 'root'
})
export class NotificationService {


  private hubConnection!: HubConnection
  private baseUrl: string = environment.baseUrl;
  private connectionUrl = this.baseUrl + '/signalr';
  private notificationUrl = this.baseUrl + '/api/chat/notifications'

  @Output() notifications: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  public connect = () => {
    this.startConnection();
    this.addListeners();
  }

  private pushNotification(data: boolean) {
    this.notifications.emit(data);
  }

  public updateNotifications(corect:boolean){
    return this.http.get(
      this.notificationUrl
    );
  }

  
  private getConnection(): HubConnection {
    var mpp = new MessagePackHubProtocol();


    var hcb = new HubConnectionBuilder();

    hcb.withUrl(this.connectionUrl);

    if(mpp != undefined){
      hcb.withHubProtocol(mpp)
    }

    return hcb.build();
  }

  
  private startConnection() {
    this.hubConnection = this.getConnection();

    this.hubConnection.start()
      .then(() => console.log('connection started pentru un alt utilizator de notificari!'))
      .catch((err) => console.log('error while establishing signalr connection: ' + err))
  }


  private addListeners() {
    this.hubConnection.on("updateNotification", (corect: boolean) => {
      this.pushNotification(corect);
    })

    this.hubConnection.on("newUserConnected", _ => {
      console.log("Un nou utilizator pentru notificari!")
    })
  }

}
