    let a = 13.123456789;
    let b = 2.123;
    let precision = 5;

    let aNormalized = Math.round(a % 1 * Math.pow(10, precision));

    let bNormalized = Math.round(b % 1 * Math.pow(10, precision));

    console.log('Исходные числа равны', a === b);
    console.log('Числа равны', aNormalized === bNormalized);
    console.log('Первое число больше', aNormalized > bNormalized);
    console.log('Первое число меньше', aNormalized < bNormalized);
    console.log('Первое число больше или равно', aNormalized >= bNormalized);
    console.log('Первое число меньше или равно', aNormalized <= bNormalized);
    console.log('Числа не равны', aNormalized !== bNormalized);

    /*
    let a = 13.890123;
    let b = 2.891564;
    let precision = 2;

    let aNormalized = Math.round(a % 1 * Math.pow(10, precision));

    let bNormalized = Math.round(b % 1 * Math.pow(10, precision));

    console.log('Исходные числа равны', a === b);
    console.log('Числа равны', aNormalized === bNormalized);
    console.log('Первое число больше', aNormalized > bNormalized);
    console.log('Первое число меньше', aNormalized < bNormalized);
    console.log('Первое число больше или равно', aNormalized >= bNormalized);
    console.log('Первое число меньше или равно', aNormalized <= bNormalized);
    console.log('Числа не равны', aNormalized !== bNormalized);
    */

    /*
    let a = 13.890123;
    let b = 2.891564;
    let precision = 3;

    let aNormalized = Math.round(a % 1 * Math.pow(10, precision));

    let bNormalized = Math.round(b % 1 * Math.pow(10, precision));

    console.log('Исходные числа равны', a === b);
    console.log('Числа равны', aNormalized === bNormalized);
    console.log('Первое число больше', aNormalized > bNormalized);
    console.log('Первое число меньше', aNormalized < bNormalized);
    console.log('Первое число больше или равно', aNormalized >= bNormalized);
    console.log('Первое число меньше или равно', aNormalized <= bNormalized);
    console.log('Числа не равны', aNormalized !== bNormalized);
    */
