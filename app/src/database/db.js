import SQLite from 'react-native-sqlite-storage';

// Enable debugging
SQLite.DEBUG(true);
SQLite.enablePromise(false);

// Open the database
const db = SQLite.openDatabase(
  { name: 'chatApp.db', location: 'default' },
  () => console.log("✅ Database opened"),
  error => console.log("❌ DB Open Error: ", error)
);

// Create messages table if it doesn't exist
export const initDB = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        chatTitle TEXT NOT NULL,
        sender TEXT NOT NULL,
        text TEXT NOT NULL
      );`,
      [],
      () => console.log("✅ Table created or already exists"),
      (tx, error) => console.log("❌ Table creation error:", error)
    );
  });
};

// Insert a new message into the messages table
export const addMessage = (chatTitle, sender, text, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO messages (chatTitle, sender, text) VALUES (?, ?, ?)',
      [chatTitle, sender, text],
      (_, result) => {
        console.log("✅ Inserted ID:", result.insertId);
        callback(result.insertId);
      },
      (tx, error) => console.log("❌ Insert error:", error)
    );
  });
};

// Get all messages for a specific chat
export const getMessagesByChat = (chatTitle, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM messages WHERE chatTitle = ?',
      [chatTitle],
      (_, results) => {
        const messages = [];
        for (let i = 0; i < results.rows.length; i++) {
          messages.push(results.rows.item(i));
        }
        callback(messages);
      },
      (tx, error) => console.log("❌ Query error:", error)
    );
  });
};

// Optional: Delete a message by ID
export const deleteMessage = (id, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM messages WHERE id = ?',
      [id],
      (_, result) => callback(result.rowsAffected),
      (tx, error) => console.log("❌ Delete error:", error)
    );
  });
};

// Optional: Update message text by ID
export const updateMessage = (id, newText, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE messages SET text = ? WHERE id = ?',
      [newText, id],
      (_, result) => callback(result.rowsAffected),
      (tx, error) => console.log("❌ Update error:", error)
    );
  });
};
