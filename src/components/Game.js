import React from 'react';
import PropTypes from 'prop-types';

import RandomNumber from './RandomNumber';

import {View, Text, StyleSheet} from 'react-native';

class Game extends React.Component {
static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
    initialSeconds: PropTypes.number.isRequired,
};
state = {
    selectedIds: [],
    remainingSeconds: this.props.initialSeconds,
};

randomNumbers = Array
    .from({ length: this.props.randomNumberCount})
    .map(() => 1 + Math.floor (10* Math.random()),
    );
target = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);

componentDidMount() {
    this.IntervalId = setInterval(() => {
        this.setState((prevState) => {
            return { remainingSeconds: prevState.remainingSeconds - 1 };
        }, () => {
            if (this.state.remainingSeconds === 0) {
                clearInterval(this.IntervalId); // Use the same variable name
            }
        });
    }, 1000);
}

componentWillUnmount() {
    clearInterval(this.intervalId);
}

    isNumberSelected = (numberIndex) => {
        return this.state.selectedIds.includes(numberIndex);
    };
    selectNumber = (numberIndex) => {
        this.setState((state) => ({
            selectedIds: [...state.selectedIds, numberIndex],
        }));
    };
    //playing, won, lost
    gameStatus = () => {
        const sumSelected = this.state.selectedIds.reduce((acc, curr) => {
            return acc + this.randomNumbers[curr];
        }, 0);
        if (this.state.remainingSeconds === 0) {
            return 'LOST';
        }
        if (sumSelected < this.target) {
                    return 'PLAYING';
                }
                if (sumSelected === this.target) {
                    return 'WON';
                }
                if (sumSelected > this.target) {
                    return 'LOST';
        }
    };


    render() {
    const gameStatus = this.gameStatus();
        return (
            <View style = {styles.container}>
                <Text style = {[styles.target, styles[`STATUS_${gameStatus}`]]}>
                      {this.target}
                </Text>
                <View style={styles.randomContainer}>
                {this.randomNumbers.map((randomNumber, index) => (
                    <RandomNumber
                        key={index}
                        id={index}
                        number={randomNumber}
                        isDisabled={this.isNumberSelected(index) || gameStatus !== 'PLAYING'}
                        onPress={this.selectNumber}
                    />
                ))}
                </View>
                <Text>{this.state.remainingSeconds}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ddd',
        flex: 1,
    },

    target: {
        fontSize: 50,
        margin: 50,
        textAlign: 'center',
    },

    randomContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },

    STATUS_PLAYING: {
        backgroundColor: '#bbb',
    },

    STATUS_WON: {
            backgroundColor: 'green',
    },

    STATUS_LOST: {
                backgroundColor: 'red',
    },

});

export default Game;