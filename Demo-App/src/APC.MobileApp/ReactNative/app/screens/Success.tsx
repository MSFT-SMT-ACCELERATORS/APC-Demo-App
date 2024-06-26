import { StyleSheet, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AppContainer from "../components/AppContainer";
import StyledText from "../components/StyledText";
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from "../themes/Colors";
import { StatusBar } from 'expo-status-bar';
import { useEffect } from "react";

interface SuccessProps {
    setLoading: (isLoading: boolean, text?: string) => void;
}

const Success: React.FC<SuccessProps> = ({ setLoading }) => {
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLoading(false);
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <AppContainer >
            <StatusBar style='light' />
            <View style={[styles.container]}>
                <FontAwesome5 name="check-circle" size={200} color={Colors.accent200} />
                <StyledText customStyle={['title2']} color='accent200'>Credit is being evaluated</StyledText>
                <StyledText style={styles.textCentered} customStyle={['title4']} color='accent200'>Congratulations! Your credit is being evaluated. You will be contacted soon by email with a loan confirmation</StyledText>
            </View>

        </AppContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: "center",
        gap: 20,
        width: '100%'
    },
    textCentered: {
        textAlign: 'center'
    }
});

export default Success;