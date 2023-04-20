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

  public startConnection() {
    debugger;
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:59660/Notify').build();

    this.hubConnection.start().then(() => {
      console.log('connection started');
    }).catch(err => console.log(err));

    this.hubConnection.onclose(() => {
      debugger;
      setTimeout(() => {
        console.log('try to re start connection');
        debugger;
        this.hubConnection.start().then(() => {
          debugger;
          console.log('connection re started');
        }).catch(err => console.log(err));
      }, 5000);
    });

    this.hubConnection.on('privateMessageMethodName', (data) => {
      debugger;
      console.log('private Message:' + data);
    });

    this.hubConnection.on('publicMessageMethodName', (data: Notification) => {
      debugger;
      //console.log('public Message:' + data);
      // this.showNotification(data);
      this.ts.showWarning(data.title, data.message);
      //alert(data.message);
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

  public stopConnection() {
    this.hubConnection.stop().then(() => {
      console.log('stopped');
    }).catch(err => console.log(err));
  }

  // public startConnection = () => {
  //     debugger;
  //     this.hubConnection = new signalR.HubConnectionBuilder()
  //                             .withUrl('https://localhost:7132/Notify',{ skipNegotiation: true,
  //                             transport: signalR.HttpTransportType.WebSockets})
  //                             .build();
  //     this.hubConnection
  //     .start()
  //     .then(() => console.log('Connection started'))
  //     .catch(err => console.log('Error while starting connection: ' + err))
  // }

  // public addProductListner = () => {
  //   this.hubConnection.on('SendMessage', (notification: Notification) => {
  //     this.showNotification(notification);
  //   });
  // }

  // showNotification(notification: Notification) {
  //   debugger;
  //   this.ts.warning( notification.message,notification.title);
  // }
}
