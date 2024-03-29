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
export class SignalrService {

  private hubConnection!: HubConnection
  public messages: ChatMesage[] = [];
  private baseUrl: string = environment.baseUrl;
  private connectionUrl = this.baseUrl + '/signalr';
  private apiUrl = this.baseUrl + '/api/chat/sendmessage';
  private notificationUrl = this.baseUrl + '/api/chat/notifications'

  @Output() onSignalRMessage: EventEmitter<any> = new EventEmitter();

  
  constructor(private http: HttpClient) { }

  public connect = () => {
    this.startConnection();
    this.addListeners();
  }

  private pushNotification(data: boolean) {
    this.onSignalRMessage.emit(data);
  }


  public sendMessageToApi(message: string) {

    return this.http.post(this.apiUrl, this.buildChatMessage(message))
      .pipe(tap(_ => console.log("message sucessfully sent to api controller")));
  }

  public updateNotifications(corect:boolean){
    return this.http.get(
      this.notificationUrl
    );
  }

  public sendMessageToHub(message: string) {
    var promise = this.hubConnection.invoke("BroadcastAsync", this.buildChatMessage(message))
      .then(() => { console.log('message sent successfully to hub'); })
      .catch((err) => console.log('error while sending a message to hub: ' + err));

    return from(promise);
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

  private buildChatMessage(message: string): ChatMesage {
    return {
      Name:localStorage.getItem("name"),
      ConnectionId: this.hubConnection.connectionId,
      Text: message,
      DateTime: new Date()
    };
  }

  private startConnection() {
    this.hubConnection = this.getConnection();

    this.hubConnection.start()
      .then(() => console.log('connection started'))
      .catch((err) => console.log('error while establishing signalr connection: ' + err))
  }

  private addListeners() {
    this.hubConnection.on("messageReceivedFromApi", (data: ChatMesage) => {
      console.log("message received from API Controller",data)
      this.messages.push(data);
    })

    this.hubConnection.on("messageReceivedFromHub", (data: ChatMesage) => {
      console.log("message received from Hub")
      this.messages.push(data);
    })

    this.hubConnection.on("updateNotification", (corect: boolean) => {
      this.pushNotification(corect);
    })

    this.hubConnection.on("newUserConnected", _ => {
    })
  }
}