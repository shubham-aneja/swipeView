import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    PanResponder,
    Animated
} from 'react-native';


export default class Cards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pan: new Animated.ValueXY(),
            totalCards: 1
        };
        this._animatedValueX = 0;
        this._animatedValueY = 0;
        this.state.pan.x.addListener((value) => this._animatedValueX = value.value);
        this.state.pan.y.addListener((value) => this._animatedValueY = value.value);

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderGrant: (evt, gestureState) => {
                this.state.pan.setOffset({ x: this._animatedValueX, y: this._animatedValueY });
                this.state.pan.setValue({ x: 0, y: 0 }); //Initial value
            },
            onPanResponderMove: Animated.event([null, {
                dx: this.state.pan.x,
                // dy: this.state.pan.y
            }]),
            onPanResponderRelease: (e, gesture) => {
                this.handleRelease(e, gesture);
            },
            onPanResponderTerminate: (evt, gesture) => {
                this.handleRelease(evt, gesture);
            },
            onShouldBlockNativeResponder: (evt, gestureState) => true,
            onPanResponderTerminationRequest: (e, gestureState) => false,
        });
    }

    handleRelease(event, gesture) {

        console.warn('111 this.state.pan   gesture  event', this.state.pan, gesture, event)
    }
    render() {
        const renderedCard = (index) => (
            <Animated.View {...this.panResponder.panHandlers} key={index}
                style={[styles.cardContainer, this.state.pan.getLayout()]}>

                <View><Text>Hello card {index}</Text></View>
            </ Animated.View>
        )
        const { totalCards } = this.state;
        const renderedCards = []
        for (let i = 0; i < totalCards; i++) {
            renderedCards.push(renderedCard(i))
        }
        return (
            <View style={styles.container}>
                {renderedCards.length ? renderedCards : <Text>No card left</Text>}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center'

    },
    cardContainer: {
        height: 100,
        width: 100,
        backgroundColor: 'red',
        marginTop: -10,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'black'
    }
});

