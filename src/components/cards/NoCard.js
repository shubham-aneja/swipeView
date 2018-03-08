import React, { PureComponent } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    PanResponder,
    Animated,
    TouchableOpacity
} from 'react-native';

export default class NoCardLeft extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            opacity: new Animated.Value(0)
        }
    }
    componentDidMount() {
        Animated.timing(this.state.opacity, { toValue: 1, duration: 1000 }).start()
    }
    render() {
        const { onGetMore } = this.props
        const animatedStyle = { opacity: this.state.opacity, transform: [{scale: this.state.opacity}] }
        return (<Animated.View style={[styles.contentContainer, animatedStyle]}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>All Done</Text>
            </View>
            <View style={styles.footerContainer}>
                <Text style={styles.footerText}>There is no more content here</Text>
                <TouchableOpacity onPress={onGetMore}>
                    <Text style={styles.footerAction}>Get more!</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>)

    }
}
const styles = StyleSheet.create({
    contentContainer: {
        height: 300,
        width: 300,
        padding: 20,
        borderStyle: 'solid',
        borderWidth: 2,
        backgroundColor: 'white'
    },
    titleContainer: { flex: 1 },
    title: { textAlign: 'center', color: 'black', fontWeight: 'bold' },
    footerContainer: {},
    footerText: { color: 'black', fontSize: 14 },
    footerAction: { textAlign: 'center', paddingVertical: 30, color: 'purple' },
})
