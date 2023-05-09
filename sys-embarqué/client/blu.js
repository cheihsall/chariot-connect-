import BleManager from 'react-native-ble-manager';

// Connexion à l'ESP32
BleManager.connect('9F:6E:47:A6:B4:80')
  .then(() => {
    console.log('Connecté à l\'ESP32');
  })
  .catch((error) => {
    console.log('Erreur de connexion :', error);
  });

// Envoi de données à l'ESP32
BleManager.write('9F:6E:47:A6:B4:80', SERVICE_UUID, CHARACTERISTIC_UUID, data)
  .then(() => {
    console.log('Données envoyées à l\'ESP32');
  })
  .catch((error) => {
    console.log('Erreur d\'envoi de données :', error);
  });

// Réception de données de l'ESP32
BleManager.startNotification('9F:6E:47:A6:B4:80', SERVICE_UUID, CHARACTERISTIC_UUID)
  .then(() => {
    console.log('Réception de données de l\'ESP32');
  })
  .catch((error) => {
    console.log('Erreur de réception de données :', error);
  });
