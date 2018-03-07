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
import { connect } from 'react-redux'
import Card from './card'

const DEFAULT_CARDS = 7

class Cards extends Component {
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
const mapStateToProps = (appState, ownProps) => {
    return {}
    // const Id = FORM_ID++;

    // return function (updatedState) {
    //     const formAggregateState = updatedState && updatedState.form || {}
    //     const instantialState = formAggregateState[Id] || {}
    //     /* we can use symbol here at our best */
    //     return { counter: instantialState.counter || 0, uniqueId: Id }
    // }
}

const mapDispatchToProps = {
    // formInit,
    // formDestroy,
    // onIncrement: incrementCounter,
    // onIncrementAsync: asyncIncrementCounter,
    // onDecrement: decrementCounter,
    // onDecrementAsync: asyncDecrementCounter

}
Cards = connect(mapStateToProps, mapDispatchToProps)(Cards)
export default Cards;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green',
        alignItems: 'center',
        paddingTop: 100
    }
})

