import React from 'react';
import PropTypes from 'prop-types';

import {Text, StyleSheet, TouchableOpacity} from 'react-native';

class RandomNumber extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        number: PropTypes.number.isRequired,
        isDisabled: PropTypes.bool.isRequired,
        onPress: PropTypes.func.isRequired,
    };
    handlePress = () => {
        this.props.onPress(this.props.id);
    }
    render() {
        return (
            <TouchableOpacity onPress={this.handlePress}>
            <Text style={[styles.random, this.props.isDisabled && styles.Disabled]}>{this.props.number}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
random: {
        backgroundColor: '#999',
        width: 100,
        marginHorizontal: 25,
        marginVertical: 25,
        fontSize: 35,
        textAlign: 'center',
    },
    selected: {
        opacity: 0.3,
    }
 });

export default RandomNumber;