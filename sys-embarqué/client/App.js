import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>{
   
     <Stack.Navigator>
        <Stack.Screen name="Home
" component={ <View style={styles.container}>
      <Text>chariot</Text>
      <Button title="commencer" style={styles.bouttonAccueil} />
      <StatusBar style="auto" />
      <Button onPress={() => navigation.navigate('Ascan')}
                title="Login"
               />
              

    </View>} />
      </Stack.Navigator>
    }</NavigationContainer>
    
  );
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
});
