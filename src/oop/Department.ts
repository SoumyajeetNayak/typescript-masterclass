export abstract class Department {
    protected _name: string;
    protected _count: number;
    constructor(deptName: string, deptCount: number){
        this._name = deptName;
        this._count = deptCount;
    }

    get name(){
        return this._name
    }

    get count() {
        return this._count;
    }

    set count(countValue: number) {
        this._count = countValue;
    }

    abstract displayInformation(): void

    incrementCount(addedCount: number) {
        this._count = this._count + addedCount;
    }
}

export class ItDepartment extends Department {
    private _hod: string
    constructor(deptCount: number){
        super('IT', deptCount);
        this._hod = ''
    }
    assignHod(hodName: string) {
        this._hod = hodName;
    }
    displayInformation(): void {
        console.log(`This is ${this._name} department and has ${this._count} people and is headed by ${this._hod}`);
    }
}

export class FinanceDepartment extends Department {
    private _chairperson: string;
    constructor(deptCount: number, chairPersonName: string) {
        super('Finance', deptCount);
        this._chairperson = chairPersonName;
    }
    displayInformation(): void {
        console.log(`This is ${this._name} department and has ${this._count} people and is chaired by ${this._chairperson}`);
    }
}


export class Company {
    private static companyName = 'Code With Soumyajeet';
    static getCompanyName() {
        return this.companyName;
    }
    private constructor(){}
}


export class Legal {
    static instanceObject: Legal;
    private constructor(){}
    public static getInstance(){
        if (this.instanceObject === undefined){
            this.instanceObject = new Legal();
            return this.instanceObject
        }
        return this.instanceObject;
    }
}


export class Marketing {
    static instanceObject: Marketing;
    private static MAX_INSTANCE_COUNT = 5;
    private static currentCount = 0;
    private constructor(){}
    public static getInstance() {
        this.currentCount++;
        if (this.currentCount <= this.MAX_INSTANCE_COUNT) {
            return new Marketing();
        } else {
            throw new Error('You cannot create more instances');
        }
    }
}