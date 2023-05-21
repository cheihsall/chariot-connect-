import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('achats.db');

const Achats = () => {
  const [records, setRecords] = useState([]);

  const handleItemPress = (item) => {
    Alert.alert('Suppression', 'Voulez vous supprimer cet article', [
      {
        text: 'NON',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OUI', onPress:() => deleteItem(item)},
    ]);
  };

  const deleteItem = (item) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM ventes WHERE id=?;',
        [item.id],
        (_, { rows }) => {
          console.log('Record deleted successfully');
          setRecords(records.filter((record) => record.id !== item.id));
        },
        (_, error) => {
          console.log('Error deleting record:', error);
        }
      );
    });
  };

  const sendOrder = () => {
    Alert.alert('Validation', 'Voulez vous validez vos achats', [
      {
        text: 'NON',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OUI', onPress:() => sendToDistanteServer()},
    ]);
  };

  //arduino socket

  const sendToDistanteServer = () => {
    console.log(records);
    const commande = {}
    commande.chariot = 1;
    commande.produit = [];
    records.forEach((record) => {
      commande.produit.push({id: record.produitId, quantite: record.quantite});
    });
    commande.montant = records.reduce((a, b) => a + (b['prix'] || 0), 0);

   fetch('http://192.168.1.151:3000/commande/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commande),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };




  useEffect(() => {
    console.log('Fetching records from SQLite DB');
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM ventes;',
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
      <Text style={styles.itemText}>{item.libelle}</Text>
      <Text style={[styles.itemText, styles.itemQte]}>{item.quantite}</Text>
      <Text style={[styles.itemText, styles.itemPrice]}>{item.prix}</Text>
      <TouchableOpacity onPress={() => handleItemPress(item)}>
        <Image
            style={styles.deleteIcon}
            source={require('../assets/delete.png')}
          />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={records}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <View style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#4c7fc7',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <View>
        <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: 'white'}}>Total: {records.reduce((a, b) => a + (b['prix'] || 0), 0)} cfa</Text>
        </View>
      <TouchableOpacity style={styles.bottomButton} onPress={() => sendOrder()}>
        <Image
          style={styles.bottomButtonImage}
          source={require('../assets/valider.png')}
        />
        <Text style={styles.bottomButtonText}>Valider</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    backgroundColor: '#4c7fc7',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    flex: 1,
    fontSize: 18,
    color: 'white',
  },
  itemPrice: {
    fontWeight: 'bold',
    color: '#febc11'
  },
  itemQte: {
    fontWeight: 'bold',
    color: 'darkgrey',
    textAlign: 'center',
  },
  bottomButton: {
    backgroundColor: '#febc11',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
   /*  position: 'absolute', */
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomButtonText: {
    fontSize: 18,
    color: '#4c7fc7',
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
  },
  bottomButtonImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  deleteIcon: {
    width: 20,
    height: 20,
    marginLeft: 15,
  },
});

export default Achats;
