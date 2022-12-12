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

// TS Tests
// https://www.typescriptlang.org/play#code/PQKgUABFEMYDYEMDOSIBUCmCAOB7ALhAIIAKAkmJNPgK4BOAdgPIMQC0EguCCAMIIOIg3gIRBAMiARAXCCAOEED8IIHkQXoFYQQLwg4uVSi1GTAGab2EQPgggARA5BwEwggkRJnylK6BAQATBwHUE+DHV2AUEEB8IIG4QcWEIEx9AFhBAaRBVCDoMAFtcADcMV3dPDkAkEHCAoJDQwGEQKJh6GIZ8FI9dPX883kCLfzYQ4LDw4Ih+QE4QJVFbajjsDzd6DF1AYhBAdhAFcwgBOUAeEEljQTyDAqjAchBuLvFRCHE5uTkBPbnA7kAxEHFAORAIACIfQFEQP25ANhBQxXFpW4hQnzEfOZTAQKHwdGbzRYGZYGVoAJgAzBBAMwgUPygEEQbhRW6APBAnq93jZviZRH4rvwjmjpAAaCCSHxovxyWn+EFIv6WWQfaQQAKARhB2T4kaFuBB6QJuCCTOIAlEOdZlHtwQslgIViKTOFABIgTNEAKBII6kBAwEo8GQqEwOAIEAA3pQ7NgaAAjOAASxgEHcsQGdCGMQAXBAGDRYk6KgBeCAABgA3FFHS73bBihhSuU6IHg6GI9G4w66K6Em4RjFHLgGHAAJ4QBK4OAhjCZkNhuh56DYAtF9zRLAOctViCxV0MABqCHryWLGaDzZzAEYo7H453iz2yxXq3RcLhYphvYN1I2Z9nPJGEW2oB3C6vS32NxAnXXhwBzPc+v1HrMtiCRgCcv4vCAry7EZ8FdWIPDIBwACFcFdN0GGfJsTwgAAfCAACUMHUBg0ErAYAB58HwjBcB0JBsLIUoPCLOAAD4f1zZdr27MCILoKCAGFtwQpDj2-dCsJwvDCOIgYyIgCj8Co1JaIYyMl0KcskHwOgaBgfBcDoAAKWt6wg5CWwASltKI7HwAALV0kAAOj0htGPsiDAIAX3tdsC1KTiU1KIh4hoUotHTbSTLtOw7BgZS6wwGy4FwZ9tIAA3SFo2k6bo5EDAASG1LOsmyijoEoyinFyIDmPwbMSoyojc5ivJ8-A3wPYYgqnELTPC6BIoYJBoti+KksAIhAIRVNU0q2DLstyqzbK9d9DzKgAGzjqtq9y1HoZgGA6sKuogV0dG0vLbMK4r0wgAjPVmmyh1HccaEnVJQrM-aer6uAYrihKAHJABwQbg-D+XJwgAQh+mr9vC97+u+pLODkHxeQeMJ9j+U4lDmPI5mmk7buHMcJwujg8bO1MStSMqKqqyH9rKjA4Aozqoe6qLPoG370hJMluBuOUPjkCHXq6vGVIQOh8C0WD4JfELhfC0XNOwLRuKfRC5ahty7Dq8ytq0TRdvlw6IGOm75pamIIAYqMXpZ6BgGACAAAF8CQNhXWfBgtIweWIs+8WZJo8dTfytjIJguDeNpu2YfZuGfsyUU0XFSVpXEMQpE5GwbKFu21BusWJZVnjZej8L6cZkY9pjtmvsGn7Nm2XY8heJkNW56xc7p9aokcFx2oAdynQyPFt-bjZD07GougBqCAh9SS7rvypyMDHu3SenqcIBnyMF48QCodjuuEuS1opgCAJpv3ugqcqiB0naSadkyiAcs3oryfTO+afliumerizY+HNtI-UAIQgARNS6jmOVVkwMWhdy6lraAOtoAxHiEkYKN8R50HXuFCeN8l4f3OlOPBUNiFf23mwPeU5D5vVriAs+wQshp2vqVGyD8n5N1fu-G6ZM0ylXKpVNamsIAMwAb7VmvVYaDWSlwjKEAFBHAgMnfwQhdTNAiL-TWPdmIgUkvgcWktNDS14obchZtwLh1MS+RiUlA50FotpDq4YGKAKhhPPG5tfSHiITdR8vFmo+OGGQvOXj+gWxGLvCAc5JFdWAXDRKvDQ4ROCTEFyK0RF53-lXOJ4UHbO1du7T23s8l+ywBxaijjg5eKsRxCOMtEJlzzrABh8dG7dBURyAQ0pKSIJacvWyhdjGqzMc07umsaTwkXGXVBl4VzdmGcXNWCVQlQE8WbVJH5LqRjxluHcQSPxrIVgXJWyyxl-zEZXZmG9LHsS4iXRCdjKJVKcS4txZToAbJSfuNJIwCK7Juvs3cWzDzHJaYrXAytNCjNLp8qAOSbkDPMps352zqExPhdDNpsjcTPDeALeROxuAcJGsqKEqooS41RQtYYy1VrjLtsgplNIACsMy-493zCxEYKkoXnNLkiuwBSXZuw9l7GI8t4AVIcU42p9yHCwqaT3OqYBQAQBAJqjVWrNUgHQAAUQAMpoENdqvVuqzUapNJQApYCfDjGFIARRAYHiAUMnCUaIxDPDRBiMA71CDuE0OORiDAMAD3QFgPA+BtJznZTbSgYBA3jhsjhFgHUCmAHQQbgkg8holENweYKjyqA3CDA3UfhGgAk0ZEJNcAbJ92CrGm2EACm+ACGYQtIMfh-CUUjFGoQ0ZsnKq6-Y2NMS1vrU4RtcaTIFMMEjPIhbIRyGyEIRNGAg11vQYkJ6HgY3NoKZkdtBaYH8GTiIEG67N02SvA1T+vl-KBU0BdOdBgfAmGMNIQt5bK3VsoBO1N2h02Oz0OEcU8xKTMI7nUGkKMgahAUOEME6UdhXuTamnas7HZZpzXmk9GcrAC0oFJNAVjcA0Gje820LaQNGBhB2stmd5RMnkEYcYEBERojkKIPICgIhRAA3rIDZcJ23vwN5e9TVQWtWfdvV977P2FtmOS6EBQXI0gXIueNarHYjWTuIVYhbHj4oJAqX4-xASCANEqSE0JIhgCAA

class Teapot {

    public temperature: number = 0;
    public currentWater: number = 0;
    private readonly volume: number;
    private readonly minValueWater: number = 100;
    private readonly roomTemperature: number = 23;
    private readonly bolingTemperature: number = 99;
    private timerIdBoiling: number | ReturnType<typeof setInterval> = 0;
    private timerIdCooling: number | ReturnType<typeof setInterval> = 0;

    constructor(volume: number) {
        this.volume = volume;
    }

    printCurrentAmountOfWater() {
        console.log(`Воды в чайнике: ${this.currentWater} мл.`)
    }

    printCurrentTemperatureOfWater() {
        console.log(`Температура в чайнике: ${this.temperature} °C`)
    }

    turnOn() {
        if (this.currentWater < this.minValueWater) {
            console.log('Мало воды!')
            console.log(`Необходимо минимум: ${this.minValueWater - this.currentWater} мл.`)
        } else {
            console.log('Включаю кипячение')
            this.startOfBoiling()
            this.stopOfCooling()
        }
    }

    turnOff() {
        if (this.temperature > 0) {
            // @ts-ignore
            clearInterval(this.timerIdBoiling)
            console.log('Вы остановили кипячение.')
            this.startOfCooling()
        } else {
            console.log('Чайник уже выключен')
        }
    }

    addWater(water: number) {
        if (this.currentWater + water < this.volume) {
            this.currentWater += water;
            console.log(`Вы налили: ${water} мл. В чайнике: ${this.currentWater} мл.`)
        } else {
            console.log('Слишком много воды')
        }
    }

    removeWater(water: number) {
        if (water < this.currentWater) {
            this.currentWater -= water;
            console.log(`Вы вылили: ${water}. В чайнике: ${this.currentWater} мл.`)
        } else {
            console.log(`В чайнике нет столько воды.`)
        }
    }


    private startOfBoiling() {
        this.timerIdBoiling = setInterval(() => {
            if (this.temperature < this.bolingTemperature) {
                this.temperature += 1
                console.log(`${this.temperature}°C`)
            } else {
                // @ts-ignore
                clearInterval(this.timerIdBoiling)
                console.log('Чайник скипятился')
                this.startOfCooling()
            }
        }, 300)
    }

    private startOfCooling() {
        if (this.temperature <= this.roomTemperature) {
            this.stopOfCooling()
        } else {
            this.timerIdCooling = setInterval(() => {
                if (this.temperature <= this.roomTemperature) {
                    this.stopOfCooling()
                } else {
                    this.temperature -= 1
                    console.log(`Охлаждение чайника. Температура: ${this.temperature} °C`)
                }
            }, 500)
        }
    }

    private stopOfCooling() {
        // @ts-ignore
        clearInterval(this.timerIdCooling)
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

