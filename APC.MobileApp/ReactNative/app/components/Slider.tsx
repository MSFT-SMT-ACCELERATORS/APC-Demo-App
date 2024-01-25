import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState, useEffect } from 'react';
import { Text, View, StyleSheet, PanResponder, Animated, DimensionValue, StyleProp, ViewStyle } from 'react-native';
import Colors from '../themes/Colors';

interface Props {
    minValue: number;
    maxValue: number;
    style?: StyleProp<ViewStyle>;
    sliderColor?: string;
    gradientColors?: string[];
    formatter?: (value: number) => string;
    value?: number;
    onChange?: (value: number) => void;
}

const defaultFormatter = (value: number) => {
    return value.toString();
}

const Slider: React.FC<Props> = ({
    minValue,
    maxValue,
    style,
    sliderColor = '#4ad896',
    gradientColors = ['#00fdee', '#4ad896'],
    formatter = defaultFormatter,
    value=minValue,
    onChange
}) => {
    const pan = useRef(new Animated.Value(0)).current;
    const lastPanValue = useRef(0);
    const [sliderWidth, setSliderWidth] = useState(minValue);
    const [sliderValue, setSliderValue] = useState(minValue);
    const [progressWidth, setProgressWidth] = useState(0);
    
    useEffect(() => {
        if(onChange) {
            const roundedValue = Math.round(sliderValue);
            onChange(roundedValue);
        }
    }, [sliderValue, onChange]);

    useEffect(() => {
        const listenerId = pan.addListener((value) => {
            lastPanValue.current = value.value;
            if (sliderWidth !== null) {
                if(value.value < 0)
                    value.value = 0;
                
                if(value.value > sliderWidth)
                    value.value = sliderWidth;

                setProgressWidth(value.value);
                setSliderValue(interpolate(value.value, 0, sliderWidth, minValue, maxValue));
            }
        });

        return () => {
            pan.removeListener(listenerId);
        };
    }, [pan, sliderWidth]);

    const panResponder = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            pan.setOffset(lastPanValue.current);
            pan.setValue(0);
        },
        onPanResponderMove: Animated.event([
            null,
            { dx: pan }
        ], { useNativeDriver: false }),
        onPanResponderRelease: () => {
            pan.flattenOffset();
        },
    })).current;

    const interpolate = (value: number, oldMin: number, oldMax: number, newMin: number, newMax: number) => {
        const proportion = (value - oldMin) / (oldMax - oldMin);
        return newMin + (proportion * (newMax - newMin));
    }

    return (
        <View style={[styles.container, style]}>
            <View style={[styles.limitContainer]}>
                <Text style={styles.limitText}>{formatter(minValue)}</Text>
                <Text style={styles.limitText}>{formatter(maxValue)}</Text>
            </View>
            <View
                style={[styles.sliderBar]}
                onLayout={(event) => {
                    const { width } = event.nativeEvent.layout;
                    setSliderWidth(width);
                }}
            >
                <Animated.View style={[styles.progressBar]} >
                    <LinearGradient
                        colors={gradientColors}
                        style={[styles.progressGradient, { width: progressWidth } ]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    />
                </Animated.View>

                {sliderWidth && (
                    <Animated.View
                        style={[
                            {
                                transform: [
                                    { translateY: (styles.sliderBar.height - styles.slider.height) / 2 },
                                    { translateX: pan.interpolate({
                                        inputRange: [0, sliderWidth],
                                        outputRange: [0, sliderWidth - styles.slider.width],
                                        extrapolate: 'clamp',
                                    })}
                                ]
                            },
                            styles.slider,
                            { backgroundColor: sliderColor }
                        ]}
                        {...panResponder.panHandlers}
                    >
                        <Text style={styles.sliderText}>{formatter(sliderValue)}</Text>
                    </Animated.View>
                )}
            </View>
        </View >
    );

};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 35
    },
    sliderBar: {
        width: '100%',
        height: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#8e8e97',
    },
    progressBar: {
        height: 10
    },
    progressGradient: {
        flex: 1,
        borderRadius: 10,
    },
    slider: {
        position: 'absolute',
        width: 55,
        height: 55,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',

        borderColor: 'white',
        borderWidth: 2
    },
    sliderText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        verticalAlign: 'middle',
        color: 'black'
    },
    limitContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between',          
        marginBottom: 20,
        width: '100%'
    },
    limitText: {
        color: Colors.accent200,
    }
});

export default Slider;