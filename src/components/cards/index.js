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
import Card from './card';
import { cardInit, cardDestroy, cardRemoved, cardRefreshed } from '../../actions'

const DEFAULT_CARDS = 7

let CARD_ID = 0;
import NoCardLeft from './NoCard'

class Cards extends Component {
    constructor(props) {
        super(props);
        this.handleRemoveCard = this.handleRemoveCard.bind(this)
        this.resetCards = this.resetCards.bind(this);
    }

    handleRemoveCard() {
        const { cardRemoved, id } = this.props
        cardRemoved({ id });
    }
    componentDidMount() {
        const { cardInit, id } = this.props;
        cardInit({ id, defaultCards: DEFAULT_CARDS });
    }
    componentWillUnmount() {
        const { cardDestroy, id } = this.props;
        cardDestroy({ id });

    }
    resetCards() {
        const { cardRefreshed, id } = this.props
        cardRefreshed({ id });
    }
    render() {
        const { cards } = this.props
        const renderedCards = []
        for (let i = 0; i < cards; i++) {
            renderedCards.push(<Card key={i} index={cards-1-i}
                shouldAnimate={i === cards - 1}
                handleRemoveCard={this.handleRemoveCard} />)
        }
        return (
            <View style={styles.container}  >
                <View style={styles.subContainer}>
                    {renderedCards.length > 0 ? renderedCards :
                        (<NoCardLeft onGetMore={this.resetCards} />)}

                </View>
            </View>
        )
    }
}

const mapStateToProps = (appState, ownProps) => {
    const id = CARD_ID++;

    return function (updatedState) {
        const cardState = updatedState && updatedState.card || {}
        const instantialState = cardState[id] || {}
        return { cards: instantialState.cards || 0, id }
    }
}

const mapDispatchToProps = {
    cardInit,
    cardDestroy,
    cardRemoved,
    cardRefreshed
}
Cards = connect(mapStateToProps, mapDispatchToProps)(Cards)
export default Cards;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green',
        alignItems: 'center',
        paddingTop: 100,
    },
    subContainer: { flexDirection: 'column-reverse' }
})

