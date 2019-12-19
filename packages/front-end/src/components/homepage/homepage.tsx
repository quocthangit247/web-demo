import * as React from 'react';

interface IProps {
  name: string;
}

export default class Homepage extends React.Component<IProps> {
  handleClick = (e: any) => {
    alert('clicked');
  };

  public render() {
    return (
      <section className="homepage">
        <h1 className="homepage__text">Hello {this.props.name}! 111</h1>
        <button onClick={this.handleClick}>Click here</button>
      </section>
    );
  }
}
