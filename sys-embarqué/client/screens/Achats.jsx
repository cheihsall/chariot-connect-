import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('achats.db');

const Achats = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    console.log('Fetching records from SQLite DB');
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM achats;',
        [],
        (_, { rows }) => {
            console.log(rows);
          setRecords(rows._array);
          console.log(records);
        },
        (_, error) => {
          console.log('Error fetching records:', error);
        }
      );
    });
    console.log('Records fetched from SQLite DB');
    console.log(records);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.nom}</Text>
      <Text style={styles.itemText}>{item.quantite}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={records}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 18,
  },
});

export default Achats;
