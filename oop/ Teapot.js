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
        } else if (this.#timerIdBoiling === 0) {
            console.log('Включаю кипячение')
            this.#startOfBoiling()
            this.#stopOfCooling()
        } else {
            console.log('Чайник уже включён')
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
            // добавить логику с подсчётом, сколько имеется и сколько осталось долить до минимума
            console.log('Слишком много воды')
        }
    }

    removeWater(water) {
        if (water < this.currentWater) {
            this.currentWater -= water;
            console.log(`Вы вылили: ${water}. В чайнике: ${this.currentWater} мл.`)
        } else {
            // добавить логику с подсчётом, сколько минимум и сколько пытаемся вылить воды
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

