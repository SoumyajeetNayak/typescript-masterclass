interface SortingStrategy {
    sort(data: number[]): number[];
}

class BubbleSort implements SortingStrategy {
    sort(data: number[]): number[] {
        const arr = [...data];
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
            }
        }
        console.log("Sorted using Bubble Sort:", arr);
        return arr;
    }
}

class QuickSort implements SortingStrategy {
    sort(data: number[]): number[] {
        const arr = [...data];
        
        const quickSort = (arr: number[]): number[] => {
            if (arr.length < 2) return arr;
            const pivot = arr[0];
            const left = arr.slice(1).filter(el => el < pivot);
            const right = arr.slice(1).filter(el => el >= pivot);
            return [...quickSort(left), pivot, ...quickSort(right)];
        };
        
        const sorted = quickSort(arr);
        console.log("Sorted using Quick Sort:", sorted);
        return sorted;
    }
}

// MergeSort strategy
class MergeSort implements SortingStrategy {
    sort(data: number[]): number[] {
        const arr = [...data];
        
        const mergeSort = (arr: number[]): number[] => {
            if (arr.length < 2) return arr;
            const mid = Math.floor(arr.length / 2);
            const left = mergeSort(arr.slice(0, mid));
            const right = mergeSort(arr.slice(mid));
            
            return merge(left, right);
        };
        
        const merge = (left: number[], right: number[]): number[] => {
            const result: number[] = [];
            while (left.length && right.length) {
                if (left[0] <= right[0]) result.push(left.shift() as number);
                else result.push(right.shift() as number);
            }
            return result.concat(left).concat(right);
        };
        
        const sorted = mergeSort(arr);
        console.log("Sorted using Merge Sort:", sorted);
        return sorted;
    }
}

class Sorter {
    private strategy: SortingStrategy;

    constructor(strategy: SortingStrategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy: SortingStrategy) {
        this.strategy = strategy;
    }

    sort(data: number[]): number[] {
        return this.strategy.sort(data);
    }
}


const data = [34, 7, 23, 32, 5, 62];

const sorter = new Sorter(new BubbleSort());
sorter.sort(data);

sorter.setStrategy(new QuickSort());
sorter.sort(data);

// Switch to Merge Sort
sorter.setStrategy(new MergeSort());
sorter.sort(data);
