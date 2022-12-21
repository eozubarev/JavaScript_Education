// Промисификация
/*
    Промисификация – это длинное слово для простого преобразования. Мы берём функцию,
    которая принимает колбэк и меняем её, чтобы она вместо этого возвращала промис.
    Такие преобразования часто необходимы в реальной жизни,
    так как многие функции и библиотеки основаны на колбэках, а использование промисов более удобно,
    поэтому есть смысл «промисифицировать» их.
 */


function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`Ошибка загрузки скрипта ${src}`));

    document.head.append(script);
}

// использование:
// loadScript('path/script.js', (err, script) => {...})

let loadScriptPromise = function(src) {
    return new Promise((resolve, reject) => {
        loadScript(src, (err, script) => {
            if (err) reject(err)
            else resolve(script);
        });
    })
}

// использование:
// loadScriptPromise('path/script.js').then(...)