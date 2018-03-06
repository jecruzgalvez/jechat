import * as React from 'react';

interface CounterProps {
  value: number;
  onIncrement(): void;
  onDecrement(): void;
}

class Counter extends React.Component <CounterProps, {}> {
  render() {
    const {value, onIncrement, onDecrement} = this.props;
    return(
      <p>
        Clicked: {value} times
        {' '}
        <button onClick={onIncrement}>
          +
        </button>
        <button onClick={onDecrement}>
          -
        </button>
      </p>
    );
  }
}

export default Counter;
