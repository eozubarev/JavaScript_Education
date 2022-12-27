// Позволяют добиться "синхронного поведения" кода

async function getPosts (postId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        if (response.status === 200) {
            console.log(response.url)
        }
    } catch(err) {
        console.log(err);
    }
}

getPosts(1)
getPosts(2)
getPosts(3)
getPosts(4)

// https://jsonplaceholder.typicode.com/posts/1
// https://jsonplaceholder.typicode.com/posts/3
// https://jsonplaceholder.typicode.com/posts/2
// https://jsonplaceholder.typicode.com/posts/4

