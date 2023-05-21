import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('achats.db');
// Define a function to create the table
const createTable = () => {
    db.transaction((tx) => {
        tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ventes (id INTEGER PRIMARY KEY AUTOINCREMENT, libelle TEXT, reference TEXT, quantite INT, prix INT, produitId INT);'
        );
    });
}

//define a function to drop the table
const dropTable = () => {
    db.transaction((tx) => {
        tx.executeSql(
        'DROP TABLE IF EXISTS ventes;'
        );
    });
}

// Define a function to insert a new record into the table
const insertRecord = (libelle, reference, quantite, prix, produitId) => {
    db.transaction((tx) => {
        tx.executeSql(
        'INSERT INTO ventes (libelle, reference, quantite, prix, produitId) VALUES (?, ?, ?, ?, ?);',
        [libelle, reference, quantite, prix, produitId],
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
const updateRecord = (reference, quantite, prix) => {
    db.transaction((tx) => {
        tx.executeSql(
        'UPDATE ventes SET quantite = ?, prix = ? WHERE reference = ?;',
        [quantite, prix, reference],
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
        'DELETE FROM ventes WHERE id = ?;',
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
        'DELETE FROM ventes;',
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
        'SELECT * FROM ventes;',
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

//Define a function to retrieve a record from the table
/*const selectRecord = (id) => {
    db.transaction((tx) => {
        tx.executeSql(
        'SELECT * FROM ventes WHERE id = ?;',
        [id],
        (_, { rows }) => {
            console.log('Record retrieved successfully');
            console.log(rows);
        },
        (_, error) => {
            console.log('Error retrieving record:', error);
        }
        );
    });
};*/

export {
    createTable,
    dropTable,
    insertRecord,
    updateRecord,
    deleteRecord,
    deleteAllRecords,
    selectAllRecords,
    db
};
