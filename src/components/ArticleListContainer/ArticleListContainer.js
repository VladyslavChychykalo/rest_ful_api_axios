import React, { Component } from 'react';
// import axios from 'axios';
import ArticleList from '../ArticleList/ArticleList';
import Loader from '../Loader/Loader';
import ErrorNotification from '../ErrorNotification/ErrorNotification';
// import { fetchArticles } from '../../services/article-api';
import * as articleAPI from '../../services/article-api';

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
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    // get
    // Проверка для ошибки 404
    // fetch(BASE_URL + DEFAULT_QUERY)
    //   .then(response => {
    //     if (response.ok) {
    //       return response.json();
    //     }
    //     throw new Error(response.statusText);
    //   })
    //   .then(({ hits }) => {
    //     this.setState({ articles: hits });
    //   })
    //   .catch(console.log);

    articleAPI
      .fetchArticles()
      .then(({ data }) => this.setState({ articles: mapper(data.hits) }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    // statusText это свойство , кторое кинет axios в catch
    const { articles, isLoading, error } = this.state;
    return (
      <div>
        {error && <ErrorNotification text={error.message} />}
        {isLoading && <Loader />}
        {articles.length > 0 && <ArticleList items={articles} />}
      </div>
    );
  }
}
