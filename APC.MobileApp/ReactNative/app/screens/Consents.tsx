import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Colors from '../themes/Colors';
import Button from '../components/Button'
import CheckBox from '../components/CheckBox'

function Consents() {
  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={{'fontSize': 40, 'color': '#FFF', fontWeight: "bold", alignSelf: "center" }}>Consents</Text>
      <Text style={{'fontSize': 18, 'color': '#AAA', fontWeight: "normal", alignSelf: "center" }}>Please review and confirm.</Text>
      
      <View style={styles.separatorContainer}>
        <View style={styles.separator} />
      </View>
      <Text style={{'fontSize': 16, 'color': '#AAA', fontWeight: "100", textAlign: 'justify'}}>This application is secured based on the mobile phone line used, checking that the provided information matches certain checks performed by the carrier's network APIs.</Text>
      <Text style={{'fontSize': 16, 'color': '#AAA', fontWeight: "100", textAlign: 'justify' }}>This demo application uses Microsoft Azure Programmable Connectivity (APC) as a single platform interface and under the covers it communicates with any of the multiple supported carriers such as TELEFONICA, ORANGE, AT&T, DT, Singtel, etc.</Text>

      <CheckBox 
        isChecked={isChecked} 
        onCheck={()=>setIsChecked(!isChecked)} 
        text='I authorize and consent this application to verify data such as phone number identification, phone location and SIM swap, for fraud detection safety'/>

      <Button
        title="Accept"
        style={styles.button}
        onPress={() => navigation.navigate('ResidenceLocation')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    flex: 1,
    backgroundColor: Colors.primary300,
    justifyContent: 'center',
    gap: 25,
    padding: 15
  },
  imageContainer:{
    width: '100%',
    height: 90
  },
  image: {
    width: '100%',
    height: '100%'
  },
  button: {
    marginTop: 30,
    alignSelf: 'flex-end',
    width: '100%'
  },
  separatorContainer: {
    // flex: 1,
    width: '100%',
    paddingHorizontal: 30, // Aplica márgenes horizontales al contenedor del separador
  },
  separator: {
    height: 1,
    backgroundColor: Colors.primary100
  }
});

export default Consents;