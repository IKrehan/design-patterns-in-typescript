interface ISubject {
  addObserver(observer: IObserver): void;
  removeObserver(observer: IObserver): void;
  notify(): void;
}

interface IObserver {
  update(): void;
}

interface IChatroom {
  getMessageHistory(): IMessage[];
  sendMessage(message: IMessage): void;
}

interface IMessage {
  user: string;
  message: string;
}

class Chatroom implements ISubject {
  observersCollection: IObserver[];
  messagesHistory: IMessage[];

  constructor() {
    this.observersCollection = [];
    this.messagesHistory = [];
  }
  addObserver(observer: IObserver): void {
    this.observersCollection.push(observer);
  }

  removeObserver(observer: IObserver): void {
    const observerPosition = this.observersCollection.indexOf(observer);
    this.observersCollection.splice(1, observerPosition);
  }

  notify(): void {
    for (const observer of this.observersCollection) {
      observer.update();
    }
  }

  getMessageHistory(): IMessage[] {
    return this.messagesHistory;
  }

  sendMessage(message: IMessage): void {
    this.messagesHistory.push(message);
    this.notify();
  }
}

class Device implements IObserver {
  observable: ISubject & IChatroom;
  user: string;
  messagesHistory: IMessage[];

  constructor(observable: ISubject & IChatroom, user: string) {
    this.observable = observable;
    this.messagesHistory = [];
    this.user = user;
  }

  update(): void {
    this.messagesHistory = this.observable.getMessageHistory();
  }

  send(message: string): void {
    this.observable.sendMessage({ user: this.user, message });
  }
}

const chatroom = new Chatroom();
const device1 = new Device(chatroom, "Irvig");
const device2 = new Device(chatroom, "John");
chatroom.addObserver(device1);
chatroom.addObserver(device2);

device1.send("Hello, how are you?");
device2.send("Hi, I'm fine. What about you?");
device1.send("I'm fine as well, thanks for asking!");

device1.messagesHistory.map((message: IMessage) =>
  console.log(`[${message.user}]  ${message.message}`)
);
