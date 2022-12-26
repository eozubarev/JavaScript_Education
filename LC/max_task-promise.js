/*
    Implement the Deferred class so that the following
    code outputs this text once 'resolve' will be called:

    1 hello
    2 a
    3 b

*/

class Deferred {
    constructor(res) {
        this.res = res;
    }
    
    then() {

    }
}

const d = new Deferred();
d.then(function(res){ console.log("1 ", res); return "a"; });
d.then(function(res){ console.log("2 ", res); return "b"; });
d.then(function(res){ console.log("3 ", res); return "c"; });
d.resolve("hello");