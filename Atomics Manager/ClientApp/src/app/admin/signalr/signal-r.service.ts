import { Injectable, EventEmitter } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HttpTransportType } from '@aspnet/signalr';
import { Data } from './data';
import { ConfigService } from '../services/config.service';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  messageReceived = new EventEmitter<Data>();
  connectionEstablished = new EventEmitter<Boolean>();

  private connectionIsEstablished = false;
  private _hubConnection: HubConnection;

  constructor() {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }

  sendChatMessage(message: Data) {
    this._hubConnection.invoke('getData', message);
  }

  private createConnection() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(ConfigService.rootUrl + '/dataHub', {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
    })

      .build();
  }

  private startConnection(): void {
    this._hubConnection
      .start()
      .then(() => {
        this.connectionIsEstablished = true;
        console.log('Hub connection started');
        this.connectionEstablished.emit(true);
      })
      .catch(err => {
        console.log('Error while establishing connection, retrying...');
        setTimeout(this.startConnection(), 5000);
      });
  }

  private registerOnServerEvents(): void {
    this._hubConnection.on('ReceiveMessage', (data: any) => {
      this.messageReceived.emit(data);
    });
  }
}
