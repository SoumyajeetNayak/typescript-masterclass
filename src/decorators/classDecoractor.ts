console.clear();

type GenericBaseClass = new (...args: any[]) => {};

function Timestamp(allow: boolean) {
    return function<T extends GenericBaseClass>(ClassEntity: T): T {
        class newClass extends ClassEntity {
            constructor(...args: any[]) {
                super(args);
                if (allow) {
                    console.log('Object crated at', new Date().toDateString());
                }
                
            }
        }
        return newClass;
    }
}



function Singleton<T extends GenericBaseClass>(ClassEntity: T): T {
    let instance: InstanceType<T>;
    class newClass extends ClassEntity {
        constructor(...args: any[]) {
            if(!instance) {
                instance = super(...args) as InstanceType<T>
            }
            return instance;
            
        }
    }
    return newClass;
}

const ENABLE_TIMESTAMP = false;

@Timestamp(ENABLE_TIMESTAMP)
@Singleton
class Employee {
    public name: string = '';
    constructor(name: string) {
        this.name = name
    }
};

@Timestamp(ENABLE_TIMESTAMP)
class Student {
    public rollNumber: string = '';
    constructor(rollNumber: string) {
        this.rollNumber = rollNumber
    }
};

const employee1 = new Employee('');
const employee2 = new Employee('');

console.log(employee1 === employee2);
