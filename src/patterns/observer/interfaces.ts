export interface ISubject {
  addObserver(observer: IObserver): void;
  removeObserver(observer: IObserver): void;
  notify(): void;
}

export interface IObserver {
  update(): void;
}

export interface IChatroom {
  getMessageHistory(): IMessage[];
  sendMessage(message: IMessage): void;
}

export interface IMessage {
  user: string;
  message: string;
}
