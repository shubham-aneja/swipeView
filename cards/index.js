import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    PanResponder,
    Animated,
    TouchableOpacity
} from 'react-native';
import Card from './card'
const DEFAULT_CARDS = 7
export default class Cards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalCards: DEFAULT_CARDS
        };
        this.handleRemoveCard = this.handleRemoveCard.bind(this)
        this.resetCards = this.resetCards.bind(this);
    }

    handleRemoveCard() {
        this.setState({ totalCards: this.state.totalCards - 1 })
    }

    resetCards() {
        this.setState({ totalCards: DEFAULT_CARDS })
    }
    render() {
        const { totalCards } = this.state;
        const cards = []
        for (let i = 0; i < totalCards; i++) {
            cards.push(<Card key={i} index={i}
                shouldAnimate={i === totalCards - 1}
                handleRemoveCard={this.handleRemoveCard} />)
        }
        return (
            <View style={styles.container}  >
                {cards.length > 0 ? cards :
                    (<View>
                        <TouchableOpacity onPress={this.resetCards}>
                            <Text>No card left, click to load more cards</Text>
                        </TouchableOpacity>
                    </View>)}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green',
        alignItems: 'center',
        paddingTop: 100
    }
})