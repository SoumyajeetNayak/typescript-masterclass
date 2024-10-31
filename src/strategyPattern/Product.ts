console.clear();

export interface DiscountStrategy {
    applyDiscount(price: number): number;
}

export class PercentageDiscount implements DiscountStrategy {
    private readonly percentage: number;

    constructor(percentage: number) {
        this.percentage = percentage;
    }

    applyDiscount(price: number): number {
        return price - (price * (this.percentage / 100));
    }
}

export class FlatDiscount implements DiscountStrategy {
    private readonly discountAmount: number;

    constructor(discountAmount: number) {
        this.discountAmount = discountAmount;
    }

    applyDiscount(price: number): number {
        return price - this.discountAmount;
    }
}

export class Product {
    private name: string;
    private price: number;
    private discountStrategy: DiscountStrategy;

    constructor(name: string, price: number, discountStrategy: DiscountStrategy) {
        this.name = name;
        this.price = price;
        this.discountStrategy = discountStrategy;
    }

    setDiscountStrategy(strategy: DiscountStrategy): void {
        this.discountStrategy = strategy;
    }

    getPriceWithDiscount(): number {
        return this.discountStrategy.applyDiscount(this.price);
    }

    getName(): string {
        return this.name;
    }
}

function main() {
    const productWithPercentageDiscount = new Product('Laptop', 1000, new PercentageDiscount(10));
    console.log(`${productWithPercentageDiscount.getName()} price with percentage discount: $${productWithPercentageDiscount.getPriceWithDiscount()}`);


    const productWithFlatDiscount = new Product('Phone', 1000, new FlatDiscount(150));
    console.log(`${productWithFlatDiscount.getName()} price with flat discount: $${productWithFlatDiscount.getPriceWithDiscount()}`);
}

main();
