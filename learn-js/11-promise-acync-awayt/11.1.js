// Введение: колбэки
// https://learn.javascript.ru/callbacks


// Такие функции называют «асинхронными»,
// потому что действие (загрузка скрипта) будет завершено не сейчас, а потом.
function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;
    script.onload = () => callback(script);
    document.head.append(script);
}

loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
    console.log(`Здорово, скрипт ${script.src} загрузился`);
    console.log( '' ); // функция, объявленная в загруженном скрипте
});




// Колбэк в колбэке
/*
    В примере:
    Мы загружаем 1.js. Продолжаем, если нет ошибок.
    Мы загружаем 2.js. Продолжаем, если нет ошибок.
    Мы загружаем 3.js. Продолжаем, если нет ошибок. И так далее (*).

 */

loadScript('1.js', function(error, script) {

    if (error) {
        handleError(error);
    } else {
        // ...
        loadScript('2.js', function(error, script) {
            if (error) {
                handleError(error);
            } else {
                // ...
                loadScript('3.js', function(error, script) {
                    if (error) {
                        handleError(error);
                    } else {
                        // ...и так далее, пока все скрипты не будут загружены (*)
                    }
                });

            }
        })
    }
});

// Иногда это называют «адом колбэков» или «адской пирамидой колбэков».

// Мы можем попытаться решить эту проблему, изолируя каждое действие в отдельную функцию, вот так:
loadScript('1.js', step1);

function step1(error, script) {
    if (error) {
        handleError(error);
    } else {
        // ...
        loadScript('2.js', step2);
    }
}

function step2(error, script) {
    if (error) {
        handleError(error);
    } else {
        // ...
        loadScript('3.js', step3);
    }
}

function step3(error, script) {
    if (error) {
        handleError(error);
    } else {
        // ...и так далее, пока все скрипты не будут загружены (*)
    }
};

/*
    Код абсолютно рабочий, но кажется разорванным на куски. Его трудно читать, вы наверняка заметили это.
    Приходится прыгать глазами между кусками кода, когда пытаешься его прочесть. Это неудобно, особенно,
    если читатель не знаком с кодом и не знает, что за чем следует.
 */

