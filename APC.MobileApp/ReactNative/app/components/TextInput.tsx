import React from 'react';
import { View, TextInput as BaseTextInput, StyleSheet, Image, ImageSourcePropType, TextInputProps as BaseTextInputProps } from 'react-native';

// Define la interfaz de props extendiendo las props estándar de TextInput
interface TextInputProps /*extends BaseTextInputProps*/ {
  isVerified?: boolean;
  iconSource?: ImageSourcePropType;
}

// Componente TextInput con TypeScript
const TextInput: React.FC<TextInputProps> = ({
  isVerified = false, // Default a false si no se proporciona
  iconSource,
  // style,
  //...rest // Resto de las props de TextInput
}) => {
  return (
    <View style={[styles.inputContainer, /*style*/]}>
      <BaseTextInput
        //{...rest} // Propaga todas las props restantes a TextInput
        // style={styles.input}
      />
      {isVerified && iconSource && (
        <Image
          source={iconSource}
          style={styles.icon}
        />
      )}
    </View>
  );
};

// Estilos para el componente TextInput
const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#000', // Puedes ajustar el color según tus necesidades
    borderBottomColor: '#28D890', // Color de la línea de acento
    borderBottomWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 50, // Ajustar según necesidades
  },
  input: {
    color: '#FFF', // Color del texto
    flex: 1,
  },
  icon: {
    width: 24, // Ajustar según necesidades
    height: 24, // Ajustar según necesidades
    resizeMode: 'contain',
  },
});

export default TextInput;
