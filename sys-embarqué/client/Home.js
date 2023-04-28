
import { StatusBar } from 'expo-status-bar';
/*import { StyleSheet, Text, View, Button } from 'react-native';


export default function Home({navigation}) {
    return( <View style={styles.container}>
      <Text>chariot</Text>
      <Button title="commencer" style={styles.bouttonAccueil} />
      <StatusBar style="auto" />
      <Button onPress={() => navigation.navigate('Produit')}
                title="Login"
               />
              
  
    </View>)
  }
  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    bouttonAccueil: {
      marginTop: '20px',
    }
  });*/


  import { View, Text, StyleSheet, Image,  Button, TouchableOpacity, Alert } from 'react-native';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

 

  export default function HomeScreen({navigation}) {
     createTreeButtonAlert = () =>
  Alert.alert('Validation', 'Voulez vous validez vos achats', [
    {
      text: 'NON',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OUI', onPress:() => navigation.navigate('Produit')},
  ]);
  return (
    <View style={styles.container}>
        <Text style={{
            fontSize: 30,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 10,
            color: '#4c7fc7',
        }}>Chariot connecté</Text>
        <View style={{
            width: '85%',
            height: '40%',
            backgroundColor: '#febc11',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: 0.5,
            shadowRadius: 5,
            elevation: 10,
        }}>
            <Image
                style={styles.image}
                source={require('./assets/chariot3x.png')}
                placeholder={blurhash}
                contentFit="cover"
                transition={1000}
            />
        </View>
        <View style={{
            width: '85%',
            height: '35%',
            alignItems: 'center',
            marginTop: 15,
        }}>
            <Text style={{
                fontSize: 14,
                fontWeight: 'bold',
                textAlign: 'justify',
            }}>
                Cette plateforme est destinée à améliorer la vitesse de traitement des paiements dans les supermarchés. 
                Elle repose sur une technologie de scan des produits par code 
                barre et de génération de code QR pour faciliter le 
                processus d'achat. La solution permettra également un suivi en temps réel 
                du solde du chariot pour aider les clients à mieux gérer leur budget.
            </Text>
        </View>
        
      <TouchableOpacity style={{
                backgroundColor: '#4c7fc7',
                position: 'absolute',
                bottom: 0,
                width: '100%',
                padding:10,            
                }} 
                onPress={() => createTreeButtonAlert()}
               //</View> onPress={() => navigation.navigate('Produit')}
                >
                <Text  style={{
                textAlign:'center',
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: '#fff',
                }}
                >Commencer</Text>
            </TouchableOpacity>

          
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  bouttonAccueil: {
    
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
  }})