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
  gameStatus: 'PLAYING', // Add gameStatus to the initial state
};

gameStatus = 'PLAYING';

randomNumbers = Array
    .from({ length: this.props.randomNumberCount})
    .map(() => 1 + Math.floor (10* Math.random()),
    );
target = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);
    //TODO: Shuffle the random numbers

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
  clearInterval(this.IntervalId);
}

    isNumberSelected = (numberIndex) => {
        return this.state.selectedIds.includes(numberIndex);
    };
    selectNumber = (numberIndex) => {
        this.setState((state) => ({
            selectedIds: [...state.selectedIds, numberIndex],
        }));
    };

    componentWillUpdate(nextProps, nextState) {
      if (nextState.selectedIds !== this.state.selectedIds || nextState.remainingSeconds === 0) {
        const gameStatus = this.calcGameStatus(nextState);
        this.setState({ gameStatus }); // Update the state with the new gameStatus
        if (gameStatus !== 'PLAYING') {
          clearInterval(this.IntervalId); // Clear the interval
        }
      }
    }

    //playing, won, lost
    calcGameStatus = (nextState) => {
        const sumSelected = nextState.selectedIds.reduce((acc, curr) => {
            return acc + this.randomNumbers[curr];
        }, 0);
        if (nextState.remainingSeconds === 0) {
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
    const gameStatus = this.state.gameStatus;

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