import React from 'react';
import { Modal, StyleSheet, Text, View, Pressable, Alert, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import StyledText from './StyledText';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import palette from '../themes/Colors';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  text: string;
  iconLib?: 'Ionicons' | 'FontAwesome' | 'MaterialIcons' | 'MaterialCommunity';
  iconName?: any;
  iconSize?: number;
  iconColor?: string;
}

const CustomModal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  text,
  iconLib = 'Ionicons',
  iconName,
  iconSize = 70,
  iconColor = palette.danger200 }) => {

  let IconComponent;

  switch (iconLib) {
    case 'FontAwesome':
      IconComponent = FontAwesome;
      break;
    case 'MaterialIcons':
      IconComponent = MaterialIcons;
      break;
    case 'MaterialCommunity':
      IconComponent = MaterialCommunityIcons;
      break;
    default:
      IconComponent = Ionicons;
  }

  return (

    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        onClose();
      }}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <IconComponent name={iconName} size={iconSize} color={iconColor} />
              <StyledText customStyle={['extrabold', 'title4']} color='black' style={styles.modalText}>{title}</StyledText>
              <StyledText customStyle={['bold', 'standar']} color='black' style={styles.modalText}>{text}</StyledText>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: palette.danger100,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: palette.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: palette.danger200,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default CustomModal;
