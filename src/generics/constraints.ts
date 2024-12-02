function getFirstArrayElementWithConstraints<T extends number | string>(arr: T[]): T {
    return arr[0];
}

const numberArrayConstraints = [1,2,3,4,5];
const firstNumberArrayItemConstraints = getFirstArrayElement<number>(numberArray);

const stringArrayConstraints = ['apple', 'banana'];
//const firstStringArrayItem = getFirstArrayElement<boolean>([true, false]);


function greet<T extends { name: string, id: number }>(person: T): string {
    return `Hello ${person.name}`;
}

//const result1 = greet({id: '1', name: 'Alice'});
const result2 = greet({id: 2, email: 'bob@email.com', name: 'bob'});

function callFunctionAndReturnResult<T extends (arg0: V) => U, U, V >(fn: T, arg: V): U {
    return fn(arg);
}

function sayHello(times: number): string {
    return `Hello`.repeat(times);
}

function isLengthGreaterThan100(str: string): boolean {
    return str.length > 100;
}

const resultConstraints = callFunctionAndReturnResult<(arg0: number) => string, string, number >(sayHello, 6);

const greaterThanHundred = callFunctionAndReturnResult<(arg0: string) => boolean, boolean, string>(isLengthGreaterThan100, 'Hello')


function createInstance<T extends { new(...args: any[]) : InstanceType<T>}>(classType: T): InstanceType<T> {
    return new classType()
}

class User {
    constructor() {}
    getUser() {
        return 'bob';
    }
};

const user = createInstance(User);
user.getUser()
//const data = createInstance(4);

type Person = { name: string, email: string }
const person: Person = { name: 'alice', email: 'alice@email.com'}

type Course = { courseName: string, duration: number};
const course: Course = { courseName: 'typescript', duration: 6 };

function getProperty<T extends keyof U, U>(obj: U, key: T): U[T] {
    return obj[key]
}

const personName = getProperty(person, 'name');
//const personId = getProperty('id');

// const getCourseDuration = getProperty<'duration', Course>(person, 'duration');
// const getCourseType = getProperty(course, 'type');


function displaySize<T extends 'small'| 'medium' | 'large'>(size: T) {

}

displaySize('small');
//displaySize('extraLarge');


interface HasGetName {
    getName(): string;
}

function printName<T extends HasGetName>(object:T) : string {
    return object.getName();
}

class Data implements HasGetName {
    getName(): string {
        return '';
    }
}

class Data2 {
    getName(): string {
        return '';
    }
}

const data = new Data();
const data2 = new Data2();

printName(data);
printName(data2)
