import * as React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, GestureResponderEvent, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { APCApi, Configuration } from '../api/generated';
import Colors from '../themes/Colors';
import Button from '../components/Button'
import ProgressBar from '../components/ProgressBar';
import palette from '../themes/Colors';
import StyledInputText from '../components/StyledInputText';
import { RadioButton } from 'react-native-paper';
import StyledText from '../components/StyledText';
import { useState } from 'react';
import textStyles from '../themes/Texts';

function ResidenceLocation() {
  const configuration = new Configuration({ basePath: "https://apc-proxy-prv-001.azurewebsites.net" });
  const apiClient = new APCApi(configuration);

  const navigation = useNavigation();
  const [value, setValue] = useState('hacked');
  const [testResponse, setTestResponse] = useState('Click button to test APC proxy');

  async function CallAPCTest(event: GestureResponderEvent) {
    try {
      var response = await apiClient.aPCTestGet("0.0.0.0");
      console.log(response.data);
      setTestResponse(response.data);
    } catch (err) {
      console.log(err);
      setTestResponse(JSON.stringify(err));
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <ProgressBar progress={10} height={15} />
        <Text style={{ 'fontSize': 30, 'color': '#FFF', fontWeight: "bold", alignSelf: "center" }}>Residence Location</Text>
        <Text style={{ 'fontSize': 16, 'color': '#AAA', fontWeight: "normal", alignSelf: "center", width: '100%', textAlign: 'center' }}>Please, select your country and state/province of residence</Text>
        <StyledInputText labelText="Country" placeholder=""></StyledInputText>
        <StyledInputText labelText="State/Province" placeholder=""></StyledInputText>
        <StyledInputText labelText="City" placeholder=""></StyledInputText>
        <View>
          <Button title='Call APC proxy API test endpoint' onPress={CallAPCTest} />
          <Text style={{ color: 'white' }}>{testResponse}</Text>
        </View>
        <View style={styles.btnContainer}>
          <StyledText style={styles.comparisonTitle} textStyle="title6">Internal Comparison with:</StyledText>
          <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
            <View >
              <View>
                <StyledText textStyle="title6" style={{ textAlign: 'center' }}>True GPS</StyledText>
                <View style={styles.optionSubtitleContainer}>
                  <View style={styles.optionSubtitleBadge}>
                    <StyledText>UUS - Ohio - Massillon</StyledText>
                  </View>
                  <View style={styles.optionSubtitleBadge}>
                    <StyledText>40.79434, -81.52214</StyledText>
                  </View>
                </View>
              </View>
            </View>

            <View>
              <View style={styles.flex}>
                <RadioButton value="hacked" />
                <StyledText textStyle="title6">Hacked GPS</StyledText>
              </View>
              <View style={styles.optionSubtitleContainer}>
                <View style={styles.optionSubtitleBadge}>
                  <StyledText >US - NY - New York</StyledText>
                </View>
                <View style={styles.optionSubtitleBadge}>
                  <StyledText>40.61454, -73.82024</StyledText>
                </View>
              </View>
            </View>

            <View>
              <View style={styles.flex}>
                <RadioButton value="acp" />
                <StyledText textStyle="title6">Azure Programmable Connectivity Backend</StyledText>
              </View>

              <View style={styles.optionSubtitleContainer}>
                <View style={styles.optionSubtitleBadge}>
                  <StyledText>US - Ohio - Massillon</StyledText>
                </View>
                <View style={styles.optionSubtitleBadge}>
                  <StyledText>40.79161, -81.52079</StyledText>
                </View>
              </View>
            </View>
          </RadioButton.Group>
        </View>
        <Button
          title="Submit"
          style={styles.button}
          onPress={() => navigation.navigate('StarterPage')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    flex: 1,
    backgroundColor: Colors.primary300,
    // justifyContent: 'flex-start',
    gap: 5,
    padding: 15
  },
  imageContainer: {
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
    paddingHorizontal: 30,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.primary100
  },
  btnContainer: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: palette.secondary200,
    backgroundColor: palette.secondary100,
    padding: 15,
    marginHorizontal: 10,

  },
  comparisonTitle: {
    textAlign: 'center',
    marginBottom: 10
  },
  option: {
    flexDirection: 'row',
    marginVertical: 10
  },
  optionSubtitleContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  optionSubtitleBadge: {
    backgroundColor: Colors.secondary200,
    paddingHorizontal: 5,
    marginRight: 5,
    borderRadius: 10
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default ResidenceLocation;