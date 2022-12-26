async function wait() {
    await new Promise(resolve => setTimeout(resolve, 1000));

    return 10;
}

function f() {
    // покажет 10 через 1 секунду
    wait().then(result => console.log(result));
}

f();