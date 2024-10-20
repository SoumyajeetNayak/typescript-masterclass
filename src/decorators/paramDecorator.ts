console.clear();

function Uppercase(target: any, propertyKey: string) {
    let value = target[propertyKey];

    const originalDescriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
    const originalGetter = originalDescriptor?.get;
    const originalSetter = originalDescriptor?.set;

    const getter = () => {
        return originalGetter ? originalGetter.call(target) : value;
    }
    const setter = (newValue: string) => {
        const uppercaseValue = newValue.toUpperCase();
        value = originalSetter ? originalSetter.call(target, uppercaseValue): uppercaseValue

    }

    Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true,
    })
}

function LogUpdate(target: any, propertyKey: string) {
    let value = target[propertyKey];

    const originalDescriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
    const originalGetter = originalDescriptor?.get;
    const originalSetter = originalDescriptor?.set;

    const getter = () => {
        return originalGetter ? originalGetter.call(target) : value;
    }
    const setter = (newValue: string) => {
        console.log(`Setting ${propertyKey} from ${value} to ${newValue}`);
        value = newValue;
        if (originalSetter) {
            originalSetter.call(target, newValue);
        }
    }

    Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true,
    })
}


class Person { 
    @LogUpdate
    @Uppercase
    private _name: string;
    constructor(name: string) {
        this._name = name;
    }
    getName() {
        return this._name;
    }
    setName(newNameValue: string) {
        this._name = newNameValue;
    }

}

const person = new Person('alice');
console.log(person.getName());
person.setName('bob');
console.log(person.getName());
person.setName('jane');
console.log(person.getName());

