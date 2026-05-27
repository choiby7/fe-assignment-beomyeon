/**
 * 모던 자바스크립트
    - 구조분해할당(Destructuring)
    - 스프레드 연산자(Spread Operator)
    - 배열 메서드
    - Promise/async/await - 비동기 처리
 */

// Destructuring, Spread Operator 실습

const person = {
    name: "범연",
    major: "s/w",
    phone: "010-1234-5678",
    mail: "test@dankook.ac.kr"
}

// 1. Destructuring

function Destructuring(person) {
    // 객체의 경우
    console.log("=== Destructuring start ===")
    const {name, major, phone, mail} = person
    console.log(name, major, phone, mail)

    // undefined. 객체의 key와 같은 key어야 한다.
    const {name1, major1, phone1, mail1} = person
    console.log(name1, major1, phone1, mail1)
    console.log("=== Destructuring  end  ===")

    
}

// 2. Spread

function Spread(person) {
    console.log("=== Spread Start ===\n\n")

    const {name, ...rest} = person
    console.log(rest) // 나머지를 객체 형태로 반환한다.


    // 배열의 경우
    const numbers = [1,2,3,4,5];
    const [first_number, ...rest1] = numbers;
    console.log(first_number, rest1);

    // 이렇게 spread 연산자가 맨 뒤가 아니면 안됨.
    // const [...rest2, last_number] = numbers;
    // console.log(last_number, rest2);

    
    console.log("=== Spread  end  ===")
}

// 3. Rest Arguments

function sum(...args) {
    let ret = 0;
    console.log(args)
    args.forEach((arg) => ret = ret + arg);
    return ret;
}

function rest_args(a, b, ...args) {
    console.log(`a: ${a}, b: ${b}, args: ${args}`)
}

Destructuring(person);
Spread(person);


console.log(sum(1,2,3,4,5))
rest_args(1,2,3,4,5)
rest_args(1,2)


