import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { StyleSheet, Text, View, Button, Dimensions, TouchableOpacity,FlatList, ScrollView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import BottomSheet, {useBottomSheet} from '@gorhom/bottom-sheet';
import { Audio } from 'expo-av';

import * as SQLite from 'expo-sqlite';
import * as db from '../database/db.js'
const db1 = SQLite.openDatabase('achats.db');

const { width, height } = Dimensions.get('window');
const scannerWidth = width * 0.8;
const scannerHeight = scannerWidth;

/* import { createServer } from "miragejs"

if (window.server) { 
  server.shutdown()
}

window.server = createServer({
  routes() {
    this.get("/api/produits", () => {
      return {
        products: [
          { id: 1, libelle: "Lait", reference: "6923052271683", prix: 5000 },
          { id: 2, libelle: "Filament 3D", reference: "1441172945", prix: 50000 },
        ],
      }
    })
    //3092305057138
    this.get("/api/produits/:reference", (schema, request) => {
      let reference = request.params.reference
      console.log(reference);
      const product = [
        { id: 1, libelle: "Lait", reference: "6923052271683", prix: 5000 },
        { id: 2, libelle: "Filament 3D", reference: "1441172945", prix: 50000 },
      ].find((product) => product.reference == reference)
      return {
        product: product,
      }
    })
  },
}) */


const Ascan = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [achats, setAchats] = useState([]);
  const [operationStatus, setOperationStatus] = useState(false);
  const [sound, setSound] = React.useState();

  /* Bottom Sheet */

  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  /* Bottom Sheet */

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    db.createTable();
    setScanned(false);
  }, []);

 /* Beep */

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( require('../assets/beep.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    db1.transaction((tx) => {
      tx.executeSql(
      'SELECT * FROM ventes;',
      [],
      (_, { rows }) => {
          console.log('Records retrieved successfully');
          console.log(rows);
          setAchats(rows._array);
      },
      (_, error) => {

          console.log('Error retrieving records:', error);
      }
      );
    });
  }, []);

 /* Beep */

  const handleBarCodeScanned = ({ type, data, bounds }) => {
   // db.dropTable()
    setScanned(true);
    playSound();
    let product = {}
    let quantite = 1;
    let prix = 0;
    //fetch("http://192.168.1.151:3000/produit/reference/"+ data).then((res) => res.json()).then((products) => console.log(products));
    fetch("http://192.168.1.121:3000/produit/reference/"+ data).then((res) => res.json()).then((productInfo) => {
      console.log("productInfo", productInfo);
      //db.dropTable();
      console.log(data);
      ///db.insertRecord(productInfo.product.libelle, productInfo.product.reference, quantite, productInfo.product.prix);
     product = productInfo;
     console.log(product);
      db.db.transaction((tx) => {
        tx.executeSql(
        'SELECT * FROM ventes WHERE reference = ?;',
        [product.reference],
        (_, { rows }) => {
            console.log('Record retrieved successfully');
            console.log(rows);
            if (rows.length > 0) {
              console.log("entree");
              quantite = rows._array[0].quantite + 1;
              prix = product.prix * quantite;
              db.updateRecord(product.reference, quantite, prix);
              console.log('Record updated successfully');
            } else {
              console.log("entree 122");
              db.insertRecord(product.libelle, product.reference, quantite, product.prix, product.id);
              console.log('Record inserted successfully');
            }
        },
        (_, error) => {
            console.log('Error retrieving record:', error);
        }
        );
      });
      
    }).catch((error) => {
      console.log("No product found");
    });
    
    setTimeout(() => {
      db1.transaction((tx) => {
        tx.executeSql(
        'SELECT * FROM ventes ORDER BY id DESC LIMIT 3;',
        [],
        (_, { rows }) => {
            console.log('Records retrieved successfully');
            console.log(rows);
            setAchats(rows._array);
        },
        (_, error) => {
            console.log('Error retrieving records:', error);
        }
        );
      });
      setScanned(false);
    }, 3000);
    console.log(scanned);
    console.log(achats);
    
    //console.log(db.getAllRecords());
    /*db.deleteAllRecords();*/
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };


  if (hasPermission === null) {
    return <Text>Autoriser cette application à accéder à votre caméra</Text>;
  }

  if (hasPermission === false) {
    return <Text>Pas d'accés à la caméra</Text>;
  }

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.libelle}</Text>
      <Text style={styles.itemText}>{item.quantite}</Text>
      <Text style={styles.itemText}>{item.prix}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        /*barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr, BarCodeScanner.Constants.BarCodeType.code128]}*/
      />
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Achats')}>
          <Text style={{
            color: 'white',
            fontSize: 20,
            textAlign: 'center',
            marginBottom: 90,
            backgroundColor: '#4c7fc7',
            paddingHorizontal: 20,
            borderRadius: 20,
          }}>panier: {achats.length}</Text>
        </TouchableOpacity>
      </View>
      <View style={{
        width: scannerWidth,
        height: scannerHeight,
        /*borderWidth: 5,
        borderColor: 'white',
        borderRadius: 20,*/
      }}>
        <View style={{
          width: 50,
          height: 50,
          borderLeftWidth: 5,
          borderTopWidth: 5,
          borderRadius: 5,
          borderColor: 'red',
          position: 'absolute',
          left: 0,
          top: 0,
        }} />
        <View style={{
          width: 50,
          height: 50,
          borderRightWidth: 5,
          borderTopWidth: 5,
          borderRadius: 5,
          borderColor: 'red',
          position: 'absolute',
          right: 0,
          top: 0,
        }} />
        <View style={{
          width: 50,
          height: 50,
          borderLeftWidth: 5,
          borderBottomWidth: 5,
          borderRadius: 5,
          borderColor: 'red',
          position: 'absolute',
          left: 0,
          bottom: 0,
        }} />
        <View style={{
          width: 50,
          height: 50,
          borderRightWidth: 5,
          borderBottomWidth: 5,
          borderRadius: 5,
          borderColor: 'red',
          position: 'absolute',
          right: 0,
          bottom: 0,
        }} />
      </View>
      {/* {scanned && <Button title={'Voir mes achats'} onPress={() => {
        setScanned(false);
        navigation.navigate('Achats');
      }} />} */}
      {scanned && <Text style={styles.scanText}>Barcode scanné avec succés!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
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
  scanText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default Ascan;