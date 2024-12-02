console.clear();

function getFirstArrayElement<T>(arr: T[]): T {
    return arr[0];
}

const numberArray = [1,2,3,4,5];
const firstNumberArrayItem = getFirstArrayElement<number>(numberArray);

const stringArray = ['apple', 'banana'];
const firstStringArrayItem = getFirstArrayElement<string>(stringArray);


function createTuple<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

const item1 = createTuple('apple', 4);
const item2 = createTuple('banana', false);


class Stack<T> {
    private items: T[] = [];
    push(item: T) {
        this.items.push(item);
    }
    pop(): T | undefined {
        return this.items.pop();
    }
}

const numberStack = new Stack<number>();
numberStack.push(9);
numberStack.push(10);
const result = numberStack.pop();

const stringStack = new Stack<string>();
stringStack.push('apple');
const resultString = stringStack.pop();


class KeyValueStore<K, V> {
    private store: Map<K, V> = new Map();

    set(key: K, value: V): void {
        this.store.set(key, value);
    }

    get(key: K): V|undefined {
        return this.store.get(key);
    }

    hasKey(key: K): boolean {
        return this.store.has(key);
    }
}

const store = new KeyValueStore();
store.set('apple', 4);

const newStore = new KeyValueStore();
store.set('apple', false);

interface User {
    id: string;
    name: string;
    email: string;
}
interface Product {
    id: string;
    name: string;
    description: string;
}

interface Repository<T> {
    add(item: T): void
    getAll(): T[];
    getById(id: string): T;
    update(id: string, item: T): void;
    delete(id: string): void
}

class ORMRepository<T> implements Repository<T> {
    add(item: T): void {
        throw new Error("Method not implemented.");
    }
    getAll(): T[] {
        throw new Error("Method not implemented.");
    }
    getById(id: string): T {
        throw new Error("Method not implemented.");
    }
    update(id: string, user: T): void {
        throw new Error("Method not implemented.");
    }
    delete(id: string): void {
        throw new Error("Method not implemented.");
    }
    
}

const userRepository = new ORMRepository<User>();
const allUsers = userRepository.getAll();

const productRepository = new ORMRepository<Product>();
const allProducts = productRepository.getAll();
