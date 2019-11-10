import React, { Component } from 'react';
// import axios from 'axios';
import ArticleList from '../ArticleList/ArticleList';
import Loader from '../Loader/Loader';
import ErrorNotification from '../ErrorNotification/ErrorNotification';
// import { fetchArticles } from '../../services/article-api';
import * as articleAPI from '../../services/article-api';
import SearchForm from '../SearchForm/SearchForm';
// import SearchBox from '../SearchBox/SearchBox';
import CategorySelector from '../CategorySelector/CategorySelector';

// const BASE_URL = 'https://hn.algolia.com/api/v1/search?query=';
// const DEFAULT_QUERY = 'react';

const mapper = articles => {
  return articles.map(({ objectID: id, url: link, ...props }) => ({
    id,
    link,
    ...props,
  }));
};

export default class ArticleListContainer extends Component {
  state = {
    articles: [],
    isLoading: false,
    error: null,
    category: '',
    // query: '',
  };

  componentDidMount() {
    this.fetchArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    const { category } = this.state;
    if (prevState.category !== category) {
      this.fetchArticles(category);
    }
  }

  fetchArticles = query => {
    this.setState({ isLoading: true });

    articleAPI
      .fetchArticles(query)
      .then(({ data }) => this.setState({ articles: mapper(data.hits) }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  handleCategoryChange = e => {
    this.setState({ category: e.target.value });
  };

  // fetchArticles = () => {
  //   this.setState({ isLoading: true });

  //   articleAPI
  //     .fetchArticles(this.state.query)
  //     .then(({ data }) => this.setState({ articles: mapper(data.hits) }))
  //     .catch(error => this.setState({ error }))
  //     .finally(() => this.setState({ isLoading: false }));
  // };

  // handleQueryChange = e => {
  //   this.setState({ query: e.target.value });
  // };

  render() {
    // statusText это свойство , кторое кинет axios в catch
    const { articles, isLoading, error, category } = this.state;
    return (
      <div>
        <SearchForm onSubmit={this.fetchArticles} />
        {/* <SearchBox
          value={query}
          onChange={this.handleQueryChange}
          onSearch={this.fetchArticles}
        /> */}
        <CategorySelector
          options={['html', 'css', 'js', 'react']}
          value={category}
          onChange={this.handleCategoryChange}
        />
        {error && <ErrorNotification text={error.message} />}
        {isLoading && <Loader />}
        {articles.length > 0 && <ArticleList items={articles} />}
      </div>
    );
  }
}
