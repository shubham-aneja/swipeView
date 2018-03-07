import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    PanResponder,
    Animated,
    Dimensions
} from 'react-native';

const CARD_DIMENTION = 280

var { height, width } = Dimensions.get('window');

const CardContent = ({ index }) => {
    return (<View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Card # {index + 1} </Text>
        </View>
        <View style={styles.footerContainer}>
            <Text style={styles.footerText}>I can customize the card furthur</Text>
            <Text style={styles.footerAction}>View Now</Text>
        </View>


    </View>)
}
export default class Card extends Component {
    constructor(props) {
        super(props);
        this.initialIndex = props.index
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
        const boundValue = width / 2 - (CARD_DIMENTION / 2);
        if (x > boundValue || x < -boundValue) {
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
        const commonStyle = [styles.cardContainer, shouldAnimate && { elevation: 10 }]
        let renderedCard = (
            <Animated.View {...this.panResponder.panHandlers}
                style={[...commonStyle, this.state.pan.getLayout()]}>
                <CardContent index={this.initialIndex} />
            </ Animated.View>
        )
        if (!shouldAnimate) {
            renderedCard = (
                <View
                    style={commonStyle}>
                    <CardContent index={this.initialIndex} />
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
        marginBottom: -CARD_DIMENTION + 10,
        height: CARD_DIMENTION,
        width: CARD_DIMENTION,
        backgroundColor: 'white',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'black'
    },
    contentContainer: { flex: 1, padding: 20 },
    titleContainer: { flex: 1 },
    title: { textAlign: 'center', color: 'black', fontWeight: 'bold' },
    footerContainer: {},
    footerText: { color: 'black', fontSize: 14 },
    footerAction: { textAlign: 'center', paddingVertical: 30, color: 'purple' },

});

