import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { ToastService } from 'src/app/_services/toastservice';
import { Notification } from '../_models/Notifications';

@Injectable({
  providedIn: 'root'
})
export class SignalrService{

  private hubConnection: signalR.HubConnection;
  constructor(public ts: ToastService) {
  }

  public async startConnection() {
    debugger;
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:59660/Notify').build();

    await this.hubConnection.start();

    this.hubConnection.on('privateMessageMethodName', (data) => {
      debugger;
      console.log('private Message:' + data);
    });

    this.hubConnection.on('publicMessageMethodName', (data: Notification) => {
      debugger;
      // console.log('public Message:' + data.message);
      this.ts.showWarning(data.title, data.message);
      // alert(data.message);
    });

    this.hubConnection.on('clientMethodName', (data) => {
      debugger;
      console.log('server message:' + data);
    });

    this.hubConnection.on('WelcomeMethodName', (data) => {
      debugger;
      console.log('client Id:' + data);
      this.hubConnection.invoke('GetDataFromClient', 'abc@abc.com', data).catch(err => console.log(err));
    });
  }
}
