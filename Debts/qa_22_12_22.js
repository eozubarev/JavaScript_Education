const myPromise = new Promise((resolve, reject) => {
    resolve(2)
})

myPromise
    .then((val) => {
        console.log(val)
        return val
    })
    .then(val => val + 2)
    .then(console.log)
