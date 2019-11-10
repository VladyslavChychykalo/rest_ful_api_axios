get
    Проверка для ошибки 404
    fetch(BASE_URL + DEFAULT_QUERY)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(({ hits }) => {
        this.setState({ articles: hits });
      })
      .catch(console.log);