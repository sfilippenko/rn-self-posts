import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('post.db');

export class DB {
  static init = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY NOT NULL,
            text TEXT NOT NULL,
            img TEXT,
            date TEXT,
            booked BOOLEAN
          )`,
          [],
          resolve,
          (_, error) => {
            reject(error);
          },
        );
      });
    });
  };

  static getPosts = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM posts`,
          [],
          (_, result) => resolve(result.rows._array),
          (_, error) => {
            reject(error);
          },
        );
      });
    });
  };

  static createPost = (post) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO posts (text, date, booked, img) VALUES (?, ? , ?, ?)`,
          [post.text, post.date, post.booked, post.img],
          (_, result) => resolve(result.insertId),
          (_, error) => {
            reject(error);
          },
        );
      });
    });
  };

  static setPostBooked = (data) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `UPDATE posts SET booked = ? WHERE id = ?`,
          [data.booked, data.id],
          resolve,
          (_, error) => {
            reject(error);
          },
        );
      });
    });
  };

  static deletePost = (id) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(`DELETE FROM posts WHERE id = ?`, [id], resolve, (_, error) => {
          reject(error);
        });
      });
    });
  };
}
