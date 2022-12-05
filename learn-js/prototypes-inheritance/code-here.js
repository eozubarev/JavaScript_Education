const obj = {
    name: 'kot',
    age: 25
}

Object.defineProperty(obj, 'lastName', {
    value: 'крутой'
})

console.log(obj.lastName)