// 1. Получаем данные с бэка любым удобным способом (fetch, async await, promise...)

/*
Список пользователей: https://jsonplaceholder.typicode.com/users
Список постов: https://jsonplaceholder.typicode.com/posts
Список комментов: https://jsonplaceholder.typicode.com/comments
*/

function sendRequest(method, url) {
    // метод fetch нам возвращает сразу Promise / 1-м параметром принимает url
    // по умолчанию будет выполнять метод 'GET'
    const headers = {
        'Content-type' : 'application/json'
    }
    return fetch(url, {
        method: method,
        headers: headers
    }).then(response => { // response это то, что мы получаем с сервера, но обёрнутое в Fetch api
        if (response.ok) { // описываем логику для отлавливания ошибок(>= 400)
            return response.json()
        } else {
            response.json().then(error => {
                const myError = new Error('Что-то пошло не так')
                myError.data = error
                throw myError 
            })
        }
        
    })
}

// // posts 1
// let posts = []
// let postsUrl = 'https://jsonplaceholder.typicode.com/posts';
// sendRequest('GET', postsUrl)
//     .then(response => { 
//         posts = response 
//         console.log(posts);
//     })
//     .catch(error => console.log(error))

// // users 2
// let users = []
// let usersUrl = 'https://jsonplaceholder.typicode.com/users';
// sendRequest('GET', usersUrl)
//     .then(response => { 
//         users = response 
//         console.log(users);
//     })
//     .catch(error => console.log(error))

// // comments 3
// let comments = []
// let commentsUrl = 'https://jsonplaceholder.typicode.com/comments';
// sendRequest('GET', commentsUrl)
//     .then(response => { 
//         comments = response 
//         console.log(comments);
//     })
//     .catch(error => console.log(error))



/* ======================================================================================================================== */


// 2. Описываем функцию, которая будет агрегировать 3 массива в один

// Input
const users = [
    {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
    },
    {
        id: 2,
        name: "Ervin Howell",
        username: "Antonette",
        email: "Shanna@melissa.tv",
    },
    {
        id: 3,
        name: "Clementine Bauch",
        username: "Samantha",
        email: "Nathan@yesenia.net",
    },
];

const posts = [
    {
        userId: 1,
        id: 1,
        title: "Cooking pancakes",
        body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    },
    {
        userId: 2,
        id: 2,
        title: "3 ways to say no",
        body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
    },
    {
        userId: 3,
        id: 3,
        title: "Moose flew into Space",
        body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
    },
];

const comments = [
    {
        postId: 1, // userId
        id: 1,
        name: "Leanne Graham",
        email: "Sincere@april.biz",
        body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
    },
    {
        postId: 1,  // userId
        id: 2,
        name: "Leanne Graham",
        email: "Sincere@april.biz",
        body: "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et",
    },
    {
        postId: 2,  // userId
        id: 3,
        name: "Ervin Howell",
        email: "Shanna@melissa.tv",
        body: "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione",
    },
];

// Output
const output = [
    {
        userName: "Leanne Graham",
        title: "Cooking pancakes",
        comentsCount: 2,
        id: 1,
    },
//  {...},
//  {...}
]


function mergeArrays(posts, users, comments) {
    const resultArr = posts.map((post) => {
        let user = users.find((userItem) => userItem.id == post.userId);
        let comment = comments.filter((comentsItem) => comentsItem.postId == post.id);

        return {
            id: post.id,
            title: post.title,
            userName: user.name,
            comentsCount: comment.length,
        };

    });

    return resultArr

}


console.log(mergeArrays(posts, users, comments));