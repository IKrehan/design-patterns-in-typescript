# Observer Pattern 👁

## General Research 📚

**What is it?**

Observer is a pattern that creates a one-to-many relationship between objects (a Subject and its Observers), that relation allows the Observers to receive a notification and be updated every time the Subject changes state.

## Domain Research 📚

**Whats is it for?**

When a system is separated in a collection of cooperating classes the consistency between them is necessary, the observer pattern allows this relation without making classes tightly coupled, encouraging the re-usability of the code.

## Applied Research 📚

**How it works?**

The observer pattern consists in two classes, a Subject (also known as Observable) and a Observer. One Subject may have multiple observers, but an observer only have one Subject. To maintain its children synchronized, every time a Subject changes state all observers that are watching it are updated as well, to update them the Subject have a collection of all classes that are observing it.

Here is an example of how this pattern can be implemented:

![Observer UML](/docs/observer-uml.png)

As the ISubject interface shows, a Subject class has 3 methods, they are:

- addObserver: attach an Observer to the Subject by adding it in some kind of collection.
- removeObserver: de-attach an Observer from the Subject by removing it of some kind of collection.
- notify: notify all the attached observers when it state changes.

The Observer class only needs a update method that will be executed by the ISubject when notifying.

**How to do it?**

Here we are going to implement a Chat-like application as example of how to use this pattern.

First thing to do is create the interfaces:

```typescript
interface ISubject {
  addObserver(observer: IObserver): void;
  removeObserver(observer: IObserver): void;
  notify(): void;
}

interface IObserver {
  update(): void;
}
```

We will also use some interfaces that are specific for this project:

```typescript
interface IChatroom {
  getMessageHistory(): IMessage[];
  sendMessage(message: IMessage): void;
}

interface IMessage {
  user: string;
  message: string;
}
```

IChatroom will be implemented by the same class implementing ISubject, it adds 2 methods:

- getMessageHistory: return all the messages stored in the class.
- endMessage: add a message to the class state and notify observers.

IMessage have the message itself and the user (Observer) that sent it.

```typescript
class Chatroom implements ISubject, IChatroom {
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
```

```typescript
class Device implements IObserver {
  subject: ISubject & IChatroom;
  user: string;
  messagesHistory: IMessage[];

  constructor(observable: ISubject & IChatroom, subject: string) {
    this.observable = observable;
    this.messagesHistory = [];
    this.subject = subject;
  }

  update(): void {
    this.messagesHistory = this.observable.getMessageHistory();
  }

  send(message: string): void {
    this.observable.sendMessage({ user: this.subject, message });
  }
}
```

```typescript
const chatroom = new Chatroom();
const device1 = new Device(chatroom, "Device 1");
const device2 = new Device(chatroom, "Device 2");
chatroom.addObserver(device1);
chatroom.addObserver(device2);

device1.send("Hello, how are you?");
device2.send("Hi, I'm fine. What about you?");
device1.send("I'm fine as well, thanks for asking!");

device1.messagesHistory.map((message: IMessage) =>
  console.log(`[${message.user}]  ${message.message}`)
);
// => [Device 1]  Hello, how are you?
// => [Device 2]  Hi, I'm fine. What about you?
// => [Device 1]  I'm fine as well, thanks for asking!
```

