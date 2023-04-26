class HarshadNumber {
    static getHarshadNumbers() {
        const LIMIT = 1000;
        for (let number = 1; number <= LIMIT; number++) {
            if (number % HarshadNumber.sumDigitsOfNumber(number) === 0) {
                console.log(number);
            }
        }
    }

    static sumDigitsOfNumber(number) {
        let sum = 0;
        while (number > 0) {
            let digit = number % 10;
            sum += digit;
            number = (number - digit) / 10;
        }
        return sum;
    }
}

HarshadNumber.getHarshadNumbers();
