import { StyleSheet, View } from "react-native";
import AppContainer from "../components/AppContainer";
import StyledText from "../components/StyledText";
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from "../themes/Colors";

function Success() {
    return (
        <AppContainer >
            <View style={styles.container}>
                <FontAwesome5 name="check-circle" size={200} color={Colors.accent200} />
                <StyledText textStyle="title1" color="accent200">Credit Approved</StyledText>
                <StyledText textStyle="title5" color="accent200" style={{textAlign: "center"}}>Congratulations! Your credit has been approved</StyledText>
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
        margin: 30,
        gap: 20
    }
});

export default Success;