import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  private apiUrl = this.baseUrl + '/api/chat';




  
  constructor(private http: HttpClient) { }

  public connect = () => {
    this.startConnection();
    this.addListeners();
  }

  public sendMessageToApi(message: string) {
    return this.http.post(this.apiUrl, this.buildChatMessage(message))
      .pipe(tap(_ => console.log("message sucessfully sent to api controller")));
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

    console.log("get connection called :")
    console.log(mpp);
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
      console.log("acum messages contine:")
      console.log(this.messages)
    })
    this.hubConnection.on("messageReceivedFromHub", (data: ChatMesage) => {
      console.log("message received from Hub")
      this.messages.push(data);
    })
    this.hubConnection.on("newUserConnected", _ => {
      console.log("new user connected");
    })
  }
}