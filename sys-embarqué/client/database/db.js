import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('achats.db');
// Define a function to create the table
const createTable = () => {
    db.transaction((tx) => {
        tx.executeSql(
        'CREATE TABLE IF NOT EXISTS achats (id INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT, quantite INT);'
        );
    });
}

// Define a function to insert a new record into the table
const insertRecord = (nom, quantite) => {
    db.transaction((tx) => {
        tx.executeSql(
        'INSERT INTO achats (nom, quantite) VALUES (?, ?);',
        [nom, quantite],
        () => {
            console.log('Record inserted successfully!');
        },
        (_, error) => {
            console.log('Error inserting record:', error);
        }
        );
    });
};

// Define a function to update a record in the table
const updateRecord = (id, nom, quantite) => {
    db.transaction((tx) => {
        tx.executeSql(
        'UPDATE achats SET nom = ?, quantite = ? WHERE id = ?;',
        [nom, quantite, id],
        () => {
            console.log('Record updated successfully');
        },
        (_, error) => {
            console.log('Error updating record:', error);
        }
        );
    });
};

// Define a function to delete a record from the table
const deleteRecord = (id) => {
    db.transaction((tx) => {
        tx.executeSql(
        'DELETE FROM achats WHERE id = ?;',
        [id],
        () => {
            console.log('Record deleted successfully');
        },
        (_, error) => {
            console.log('Error deleting record:', error);
        }
        );
    });
};

// Define a function to delete all records from the table
const deleteAllRecords = () => {
    db.transaction((tx) => {
        tx.executeSql(
        'DELETE FROM achats;',
        [],
        () => {
            console.log('All records deleted successfully');
        },
        (_, error) => {
            console.log('Error deleting records:', error);
        }
        );
    });
};

// Define a function to retrieve all records from the table
const selectAllRecords = async () => {
  let result = db.transaction((tx) => {
        tx.executeSql(
        'SELECT * FROM achats;',
        [],
        (_, { rows }) => {
            console.log('Records retrieved successfully');
            console.log(rows);
            return rows.length > 0 ? rows._array : [];
        },
        (_, error) => {
            console.log('Error retrieving records:', error);
        }
        );
    });
    return result;
};

export {
    createTable,
    insertRecord,
    updateRecord,
    deleteRecord,
    deleteAllRecords,
    selectAllRecords,
};
