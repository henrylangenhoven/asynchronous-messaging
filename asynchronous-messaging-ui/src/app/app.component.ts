import {Component} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'asynchronous-messaging-ui';

  messages: Observable<Message[]> = new Observable<Message[]>();

  constructor(private db: AngularFirestore) {
    this.getData();
  }

  private readonly _path = "messages";

  getData() {
    // @ts-ignore
    this.messages = this.db
      .collection(this._path, ref =>
        ref.orderBy('Timestamp', 'desc'))
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c =>
            ({id: c.payload.doc.id, ...(c.payload.doc.data() as object)})
          )
        )
      );
  }

  stringify(text: any) {
    return JSON.stringify(text);
  }

  deleteMessage(id: string) {
    this.db.doc(this._path + "/" + id).delete();
  }
}

export interface Message {
  id: string;
  Message: any;
  Timestamp: any;
  Subject: any;
  SubscribeURL: any;
}
