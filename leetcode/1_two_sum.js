// Моё решение  - реальность


var twoSum = function(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let k = i + 1; k < nums.length; k++) {
            if ((nums[i] + nums[k]) == target) {
                return [i, k]
            } 
        }
    }
    return []
};



// Крутое решение с источников - ожидание
var twoSum = function(nums, target) {
    let map = new Map();
    for (let i = 0; i < nums.length; i++) {
        let num1 = nums[i];
        let num2 = target - num1;
        if (map.has(num2)) {
            return [i, map.get(num2)];
        }
        map.set(num1, i);
    }
};
