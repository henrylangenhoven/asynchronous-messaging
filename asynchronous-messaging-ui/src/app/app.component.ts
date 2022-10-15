import {Component, OnDestroy} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

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
        ref.orderBy('timestamp', 'desc'))
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c =>
            ({id: c.payload.doc.id, ...(c.payload.doc.data() as object)})
          )
        )
      );
  }

  ngOnDestroy(): void {
    // this.subscription.uns;
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
  body: any;

}
