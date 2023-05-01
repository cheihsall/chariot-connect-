/* import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';

export default function Ascan() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }
  return (
    <View style={styles.container}>
  
 <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>

     <View style={styles.bar}></View>
      <Button title="" />
      <StatusBar backgroundColor='blue' style='light' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  bar: {
   backgroundColor: 'red',
  },
});
 */


import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as db from '../database/db.js'


const { width, height } = Dimensions.get('window');
const scannerWidth = width * 0.8;
const scannerHeight = scannerWidth;


const Ascan = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    db.createTable();
  }, []);

  const handleBarCodeScanned = ({ type, data, bounds }) => {
    setScanned(true);
    console.log(bounds);
    db.insertRecord('test', 1);
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  return (
    <View style={styles.container}>
      {hasPermission === null ? (
        <Text>Autoriser cette application à accéder à votre caméra</Text>
      ) : hasPermission === false ? (
        <Text>Pas d'accés à la caméra</Text>
      ) : (
          <>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
            /*barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr, BarCodeScanner.Constants.BarCodeType.code128]}*/
          />
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

          {scanned && <Button title={'Tap to Scan Again'} onPress={() => {
            setScanned(false);
            navigation.navigate('Achats');
          }} />}
          </>
      )}
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
  scanText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Ascan;