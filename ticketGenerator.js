const range = [
    { low: 1, high: 9 },
    { low: 10, high: 19 },
    { low: 20, high: 29 },
    { low: 30, high: 39 },
    { low: 40, high: 49 },
    { low: 50, high: 59 },
    { low: 60, high: 69 },
    { low: 70, high: 79 },
    { low: 80, high: 90 },
]

// select 9 randoms - Every column should have at least 1 number, so no column should be completely blank
let selectedNos = [
    Math.floor(Math.random() * 9) + 1,
    Math.floor(Math.random() * 10) + 10,
    Math.floor(Math.random() * 10) + 20,
    Math.floor(Math.random() * 10) + 30,
    Math.floor(Math.random() * 10) + 40,
    Math.floor(Math.random() * 10) + 50,
    Math.floor(Math.random() * 10) + 60,
    Math.floor(Math.random() * 10) + 70,
    Math.floor(Math.random() * 11) + 80,
]

// Prepare an array of numbers 1..90 and remove all selected in step 1
let remainingNos = [...Array(90).keys()]
remainingNos = remainingNos.filter(i => !selectedNos.includes(i+1))
remainingNos = remainingNos.map(i => i+1)


console.log(selectedNos)
console.log(remainingNos)