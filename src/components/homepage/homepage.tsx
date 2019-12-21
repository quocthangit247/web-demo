import * as React from 'react';
const uuidv4 = require('uuid/v4');
import ApiService from '../../config/apiService';

interface IProps {}

interface IState {
  buttons: number[];
  limit: number;
  bars: number[];
  values: number[];
  selected: number;
}

export default class Homepage extends React.Component<IProps, IState> {
  state = {
    bars: [],
    buttons: [],
    limit: 0,
    values: [],
    selected: 0,
  };

  async componentDidMount() {
    const data = await ApiService.getData();
    this.setState({ ...data, values: Array(data.bars.length).fill(0) });
  }

  renderBar = (index: number) => {
    const { values = [], limit } = this.state;
    const value = values[index];
    const percentage = (value / limit) * 100;
    let width: number;
    if (percentage > 0 && percentage <= 100) {
      width = percentage;
    }
    if (percentage > 100) {
      width = 100;
    }
    if (percentage <= 0) {
      width = 0;
    }

    return (
      <>
        <div className="homepage__progress" key={uuidv4()}>
          <div className="homepage__value"> {value}</div>
          <div
            className={`homepage__percentage ${value > limit && 'homepage__warning'}`}
            style={{ width: `${width}%` }}
            key={uuidv4()}></div>
        </div>
      </>
    );
  };

  handleClick = (item: number) => {
    const { selected, values } = this.state;
    const value = values[selected] + item;
    if (values[selected] >= 0) {
      values[selected] += item;
    }
    if (value < 0 && item < 0) {
      values[selected] = 0;
    }
    this.setState({
      values: [...values],
    });
  };

  handleSelect = (e: any) => {
    const { value } = e.target;
    this.setState({
      selected: value,
    });
  };

  public render() {
    const { bars = [], buttons = [] } = this.state;
    return (
      <section className="homepage">
        <h1 className="homepage__text">Progress Bars</h1>
        {bars.map((item, index) => this.renderBar(index))}
        <div className="homepage__control">
          <select onChange={this.handleSelect}>
            {bars.map((item, index) => (
              <option value={index}>#progress {index}</option>
            ))}
          </select>
          {buttons.map((item, index) => (
            <button className="homepage__button" onClick={e => this.handleClick(item)}>
              {item}
            </button>
          ))}
        </div>
      </section>
    );
  }
}
