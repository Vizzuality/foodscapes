import { expose } from 'comlink';
import initSqlJs from 'sql.js';

export class SQLComlink {
  private _db?: any;

  async init() {
    // INIT DB

    if (!!this._db) {
      return;
    }

    const sqlPromise = initSqlJs({
      locateFile: (file) => `https://sql.js.org/dist/${file}`,
    });
    const dataPromise = fetch('/data/foodscapes.db').then((res) => res.arrayBuffer());
    const [SQL, buf] = await Promise.all([sqlPromise, dataPromise]);
    this._db = new SQL.Database(new Uint8Array(buf));
  }

  get(query: string) {
    console.time('get');
    const result = this._db.exec(query);
    console.timeEnd('get');
    return result;
  }
}

expose(SQLComlink);

export interface SQLComlinkProps {
  init(): Promise<void>;
  get(query?: string): any;
}
