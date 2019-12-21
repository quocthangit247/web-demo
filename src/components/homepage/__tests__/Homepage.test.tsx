import { shallow } from 'enzyme';
import * as React from 'react';
import Homepage from '../Homepage';

describe('Homepage', () => {
  it('should render my component', () => {
    const state = {
      buttons: [36, 25, -41],
      bars: [30, 46, 66, 28],
      limit: 200,
      values: [],
      selected: 0,
    };

    const wrapper = shallow(<Homepage />);
    wrapper.setState(state);
    expect(wrapper.find('.homepage__text').length).toEqual(1);
    expect(wrapper.find('.homepage__progress').length).toEqual(4);
    expect(wrapper.find('.homepage__value').length).toEqual(4);
    expect(wrapper.find('.homepage__button').length).toEqual(3);
    expect(wrapper);
  });

  it('should click component', () => {
    const state = {
      buttons: [36, 25, -41],
      bars: [30, 46, 66, 28],
      limit: 200,
      values: [0, 0, 0, 0],
      selected: 0,
    };

    const wrapper = shallow(<Homepage />);
    wrapper.setState(state);
    wrapper
      .find('button')
      .at(0)
      .simulate('click', { target: { value: 36 } });
    expect(wrapper.state('values')[0]).toBe(36);
    wrapper
      .find('button')
      .at(2)
      .simulate('click', { target: { value: -41 } });
    expect(wrapper.state('values')[0]).toBe(0);
  });

  it('should change bar', () => {
    const state = {
      buttons: [36, 25, -41],
      bars: [30, 46, 66, 28],
      limit: 200,
      values: [0, 0, 0, 0],
      selected: 0,
    };

    const wrapper = shallow(<Homepage />);
    wrapper.setState(state);
    wrapper
      .find('select')
      .at(0)
      .simulate('change', { target: { value: 1 } });
    expect(wrapper.state('selected')).toBe(1);
    wrapper
      .find('button')
      .at(1)
      .simulate('click', { target: { value: 25 } });
    expect(wrapper.state('values')[1]).toBe(25);
  });
});
