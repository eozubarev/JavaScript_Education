const promise2 = Promise.any([
    new Promise((resolve, reject) => {
        reject(new Error("test 1"));
        setTimeout(() => {
            console.log(1)
        }, 3000)
    }),
    new Promise((resolve) => {
        setTimeout(() => {
            console.log(2)
            resolve()
        }, 3000)
    }),
    new Promise((resolve, reject) => {
        reject(new Error("test"));
        setTimeout(() => {
            console.log(3)
        }, 3000)
    }),
])
    .then((value) => console.log(value))
    .then((e) => console.error(e))
