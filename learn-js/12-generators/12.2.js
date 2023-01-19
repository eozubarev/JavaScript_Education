// Асинхронные итераторы и генераторы
// https://learn.javascript.ru/async-iterators-generators

async function* generateSequence(start, end) {

    for (let i = start; i <= end; i++) {
  
      // ура, можно использовать await!
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      yield i;
    }
  
  }
  
  (async () => {
  
    let generator = generateSequence(1, 5);
    for await (let value of generator) {
      console.log(value); // 1, потом 2, потом 3, потом 4, потом 5
    }
  
  })();




  let range = {
    from: 1,
    to: 5,
  
    async *[Symbol.asyncIterator]() { // то же, что и [Symbol.asyncIterator]: async function*()
      for(let value = this.from; value <= this.to; value++) {
  
        // пауза между значениями, ожидание
        await new Promise(resolve => setTimeout(resolve, 1000));
  
        yield value;
      }
    }
  };
  
  (async () => {
  
    for await (let value of range) {
      console.log(value); // 1, потом 2, потом 3, потом 4, потом 5
    }
  
  })();



  // Пример с гитом
  
  async function* fetchCommits(repo) {
    let url = `https://api.github.com/repos/${repo}/commits`;
  
    while (url) {
      const response = await fetch(url, { // (1)
        headers: {'User-Agent': 'Our script'}, // GitHub требует заголовок user-agent
      });
  
      const body = await response.json(); // (2) ответ в формате JSON (массив коммитов)
  
      // (3) Ссылка на следующую страницу находится в заголовках, извлекаем её
      let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
      nextPage = nextPage && nextPage[1];
  
      url = nextPage;
  
      for(let commit of body) { // (4) вернуть коммиты один за другим, до окончания страницы
        yield commit;
      }
    }
  }
  
  (async () => {
  
    let count = 0;
  
    for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {
  
      console.log(commit.author.login);
  
      if (++count == 100) { // остановимся на 100 коммитах
        break;
      }
    }
  
  })();