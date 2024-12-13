console.clear();
import 'reflect-metadata';

function MinLength(length: number) {
    return function(target: any, prototypeKey: string) {
        Reflect.defineMetadata('minLength', length, target, prototypeKey);
    }
}

class Employee {
    @MinLength(5)
    private name: string;
    constructor(name: string) {
        const result = this.validate(name);
        if (!result) {
            throw new Error('invalid length');
        }
        this.name = name;
    }
    @Reflect.metadata('role', 'user')
    getName() {
        return this.name;
    }
    getRole() {
        return Reflect.getMetadata('role', this)
    }
    removeRole() {
        return Reflect.deleteMetadata('role', this);
    }
    hasRole() {
        return Reflect.hasMetadata('role', this);
    }
    validate(name: string) {
        const minLength = Reflect.getMetadata('minLength', this, 'name');
        return name.length >= minLength;
    }
}

class EmployeeFactory {
    static create(role: string, name: string) {
        const emp = new Employee(name);
        Reflect.defineMetadata('role', role, emp);
        return emp;
    }
}

function getEmployeeRole(emp: Employee) {
    return Reflect.getMetadata('role', emp);
}

const emp1 = new Employee('code with soumyajeet');
const role = Reflect.getMetadata('role', emp1, 'getName');
console.log(role, emp1.getName());


const Sheldon = EmployeeFactory.create('admin', 'Sheldon');
const Leonard = EmployeeFactory.create('moderator', 'Leonard');

console.log(Sheldon.getName(), Sheldon.getRole());
console.log(Leonard.getName(), Leonard.getRole());

console.log('HasRole Before', Sheldon.hasRole());

console.log(Sheldon.removeRole());
console.log(Sheldon.removeRole());

console.log('HasRole After',Sheldon.hasRole());


function Role(role: string) : ClassDecorator {
    return function (target: any) {
        Reflect.defineMetadata('role', role, target)
    }
}


@Role('admin')
class AdminPanel {
    getSetting() {
        return {
            sendNotification: true,
        }
    }
}

function canAccessAdminPanel(emp: Employee) {
    const empRole = Reflect.getMetadata('role', emp);
    const adminPanelRole = Reflect.getMetadata('role', AdminPanel.prototype);
    return empRole === adminPanelRole;
}

console.log('Can access admin panel', canAccessAdminPanel(Leonard));


try {
    const raj = EmployeeFactory.create('moderator', 'Raj');
} catch (error: any) {
    console.error(error?.message)
}


class HrEmployee extends Employee {};

Reflect.defineMetadata('path', '/emp', Employee.prototype)
const hrEmpRole = Reflect.getMetadata('path', HrEmployee.prototype);
console.log('hrEmpRole', hrEmpRole);
