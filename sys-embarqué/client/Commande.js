import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Alert,ScrollView  } from 'react-native';
import { useEffect, useState } from "react";

const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function CommandeScreen({ navigation }) {
    const [produits, setProduits] = useState([]);

    const createTreeButtonAlert = () => {
        Alert.alert('Validation', 'Voulez-vous valider vos achats ?', [
            {
                text: 'NON',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'OUI', onPress: () => navigation.navigate('Produit') },
        ]);
    };

    useEffect(() => {
        /* Récupération des données de l'historique */
        fetch('https://bakend-serre-production.up.railway.app/parametres', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            response.json().then((data) => {
                setProduits(data);
            });
        });
    }, []);

    return (
        <View style={styles.container}>
          

          <ScrollView style={{  width: '85%'}}>
              
                    {produits.map((produit, index) => (
                        <View key={index} style={{  width: '95%',
                        height: '10%',
                        backgroundColor: '#ffff',
                        borderBottomColor: '#000000',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 10,
                        shadowColor: '#0f0f0f',
                        shadowOffset: {
                            width: 10,
                            height: 10,
                        },
                        shadowOpacity: 3,
                        shadowRadius: 10,
                        elevation: 5,}}>
                            <Text style={{
                    fontSize: 20,
                    color: '#000000',
                    fontWeight: 'bold',
                }}>Produit: {produit.humidite} <Text style={{
                    fontSize: 15,
                    color: '#828282',
                   
                }}>Produit: {produit.humidite}</Text></Text>
                        </View>
                    ))}
               
           </ScrollView>

            <TouchableOpacity style={{
                backgroundColor: '#14c738',
                position: 'absolute',
                bottom: 70,
                width: '100%',
                padding: 10,
                borderRadius: 12,
            }}
                onPress={() => createTreeButtonAlert()}
            >
                <Text style={{
                    textAlign: 'center',
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: '#fff',
                }}
                >Valider</Text>
            </TouchableOpacity>

            <View style={{
    backgroundColor: '#4c7fc7',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 20,
}}>
    <Text style={{
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    }}>
        {produits.length > 0 ? `Nbre: ${produits.length} - Total(FCFA): ${produits.reduce((totalp, produit) => totalp + parseFloat(produit.temperature), 0)}` : 'Aucun produit sélectionné'}
    </Text>
</View>


        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#bdbdbd',
        alignItems: 'center',
    },
    bouttonAccueil: {

    },
    image: {
        width: 180,
        height: 180,
        resizeMode: 'contain',
    }
})