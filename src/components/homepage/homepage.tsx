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
    const { values = [] } = this.state;
    return (
      <>
        <div className={`homepage__progress`} key={uuidv4()}>
          <div className="homepage__value"> {values[index]}</div>
          <div className={`homepage__percentage`} style={{ width: `${values[index]}%` }} key={uuidv4()}></div>
          {/* <div className={`homepage__percentage-${index}`} key={uuidv4()} /> */}
        </div>
      </>
    );
  };

  handleClick = (item: number) => {
    const { selected, values } = this.state;
    if (values[selected] >= 0) {
      values[selected] += item;
    }
    if (values[selected] === 0 && item < 0) {
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
    console.log('>>>>>>>>>>>>', this.state);
    const { bars = [], buttons = [], limit = 0 } = this.state;
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
