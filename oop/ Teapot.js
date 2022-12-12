/*
    class Teapot API

    turnOn - Начать кипячение
    turnOff - Прервать кипячение
    addWater - Долить воды
    removeWater - Вылить воду
    currentWater - Получить кол-во воды в чайнике
    temperature - Узнать температуру

    Чайник имеет имитацию "охлаждения" до комнатной температуры 23 градуса
    "Охлаждение" включается, после полного кипячения либо когда остановили
    кипячение и температура выше комнатной
 */

class Teapot {

    constructor(volume) {
        this._volume = volume;
        this.currentWater = 0;
        this.temperature = 0;
    }

    // private props
    #minValueWater = 100;
    #roomTemperature = 23;
    #bolingTemperature = 99;
    #timerIdBoiling = 0;
    #timerIdCooling = 0;

    printCurrentAmountOfWater() {
        console.log(`Воды в чайнике: ${this.currentWater} мл.`)
    }

    printCurrentTemperatureOfWater() {
        console.log(`Температура в чайнике: ${this.temperature} °C`)
    }

    turnOn() {
        if (this.currentWater < this.#minValueWater) {
            console.log('Мало воды!')
            console.log(`Необходимо минимум: ${this.#minValueWater - this.currentWater} мл.`)
        } else {
            console.log('Включаю кипячение')
            this.#startOfBoiling()
            this.#stopOfCooling()
        }
    }

    turnOff() {
        if (this.temperature > 0) {
            clearInterval(this.#timerIdBoiling)
            console.log('Вы остановили кипячение.')
            this.#startOfCooling()
        } else {
            console.log('Чайник уже выключен')
        }
    }

    addWater(water) {
        if (this.currentWater + water < this._volume) {
            this.currentWater += water;
            console.log(`Вы налили: ${water} мл. В чайнике: ${this.currentWater} мл.`)
        } else {
            console.log('Слишком много воды')
        }
    }

    removeWater(water) {
        if (water < this.currentWater) {
            this.currentWater -= water;
            console.log(`Вы вылили: ${water}. В чайнике: ${this.currentWater} мл.`)
        } else {
            console.log(`В чайнике нет столько воды.`)
        }
    }

    #startOfBoiling() {
        this.#timerIdBoiling = setInterval(() => {
            if (this.temperature < this.#bolingTemperature) {
                this.temperature += 1
                console.log(`${this.temperature}°C`)
            } else {
                clearInterval(this.#timerIdBoiling)
                console.log('Чайник скипятился')
                this.#startOfCooling()
            }
        }, 300)
    }

    #startOfCooling() {
        if (this.temperature <= this.#roomTemperature) {
            this.#stopOfCooling()
        } else {
            this.#timerIdCooling = setInterval(() => {
                if (this.temperature <= this.#roomTemperature) {
                    this.#stopOfCooling()
                } else {
                    this.temperature -= 1
                    console.log(`Охлаждение чайника. Температура: ${this.temperature} °C`)
                }
            }, 500)
        }
    }

    #stopOfCooling() {
        clearInterval(this.#timerIdCooling)
    }

}


/* *** *** *** TESTS *** *** *** */


// Создаём инстанс класса
const tefal = new Teapot(1500)


tefal.turnOn() // Запускаем с малым кол-вом воды
tefal.addWater(150) // Доливаем воды до необходимого минимума
tefal.addWater(1500) // Пробуем перелить
tefal.removeWater(10) // Выливаем часть воды
tefal.printCurrentAmountOfWater // Проверяем кол-во воды

tefal.turnOff() // Пытаемся выключить, холодный чайник
tefal.turnOn() // Запускаем кипячение

setTimeout(() => { // Прерываем кипячение через 3 секунды
    tefal.turnOff()
    tefal.printCurrentTemperatureOfWater // Проверяем температуру
}, 10000)

// Тестируем охлаждение до комнатной температуры
