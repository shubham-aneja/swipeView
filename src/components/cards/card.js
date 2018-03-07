import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    PanResponder,
    Animated
} from 'react-native';
const CARD_DIMENTION = 200

export default class Card extends Component {
    constructor(props) {
        super(props);
        const shouldAnimate = true;
        this.state = {
            pan: new Animated.ValueXY()
        };
        this._animatedValueX = 0;
        this._animatedValueY = 0;
        this.state.pan.x.addListener((value) => this._animatedValueX = value.value);
        this.state.pan.y.addListener((value) => this._animatedValueY = value.value);

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => shouldAnimate,
            onStartShouldSetResponderCapture: (evt, gestureState) => shouldAnimate,
            onMoveShouldSetPanResponder: (evt, gestureState) => shouldAnimate,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => shouldAnimate,
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
        const x = this._animatedValueX
        const { handleRemoveCard } = this.props;
        if (x > 200 || x < -200) {
            // console.warn('Moved more than 100', x)
            Animated.spring(
                this.state.pan,
                { toValue: { x: x > 0 ? 1000 : -1000, y: 0 } }
            ).start();

            handleRemoveCard && handleRemoveCard();
        } else {
            Animated.spring(
                this.state.pan,
                { toValue: { x: 0, y: 0 } }
            ).start();
            // console.warn('DId not Move more than 100 ', x)
        }
        // console.warn('111 this.state.pan   gesture  event', this.state.pan, gesture, event)
    }
    render() {
        const { shouldAnimate } = this.props;
        const cardContent = (<View><Text>Hello card </Text></View>)
        const commonStyle = [styles.cardContainer, {elevation: this.props.index * 2}] 
        let renderedCard = (
            <Animated.View {...this.panResponder.panHandlers}
                style={[...commonStyle, this.state.pan.getLayout()]}>
                {cardContent}
            </ Animated.View>
        )
        if (!shouldAnimate) {
            renderedCard = (
                <View
                    style={commonStyle}>
                    <Text>{this.props.index}</Text>
                    {cardContent}
                </ View>
            )
        }
        return (
            renderedCard
        )
    }
}
const styles = StyleSheet.create({
    cardContainer: {
        marginBottom: -CARD_DIMENTION/3*2,
        height: CARD_DIMENTION,
        width: CARD_DIMENTION,
        backgroundColor: 'red',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'black'
    }
});
