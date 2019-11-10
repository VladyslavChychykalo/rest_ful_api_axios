import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SearchForm extends Component {
  state = { query: '' };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleChange = e => {
    this.setState({
      query: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={query} onChange={this.handleChange} />
      </form>
    );
  }
}
