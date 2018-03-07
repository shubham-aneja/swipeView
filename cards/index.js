import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    PanResponder,
    Animated
} from 'react-native';
import Card from './card'

export default class Cards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalCards: 7
        };
        this.handleRemoveCard = this.handleRemoveCard.bind(this)
    }

    handleRemoveCard() {
        this.setState({ totalCards: this.state.totalCards - 1 })
    }
    resetCards() {
        this.setState({ totalCards: 7 })
    }
    render() {
        const { totalCards } = this.state;
        const cards = []
        for (let i = 0; i < totalCards; i++) {
            cards.push(<Card key={i}
                shouldAnimate={i === totalCards - 1}
                handleRemoveCard={this.handleRemoveCard} />)
        }
        return (
            <View style={{ flex: 1 }}  >
                {cards}
            </View>
        )
    }
}
