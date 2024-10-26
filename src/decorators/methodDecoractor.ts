console.clear();

function LogMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalFunction = descriptor.value;
    descriptor.value = function(...args: any[]) {
        console.log(`calling ${propertyKey} with arguments`, args);
        const result = originalFunction.apply(this, args);
        console.log(result);
        return result;
    }
    return descriptor;
}

function Memoize(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalFunction = descriptor.value;
    const cache = new Map<string, any>();
    descriptor.value = function(...args: any[]) { 
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            console.log('Returning from cache');
            return cache.get(key);
        }
        const result = originalFunction.apply(this, args);
        cache.set(key, result)
        return result;
    }
}

export class Math {
    //@LogMethod
    @Memoize
    static add(a: number, b: number) {
        console.log('calling original method');
        return a + b
    }
    static multiply(a: number, b: number) {
        return a * b
    }
}

const result1 = Math.add(5,6);
const result2 = Math.add(5,6);
const result3 = Math.add(5,6);
const result4 = Math.add(5,7);
const result5 = Math.add(5,7);