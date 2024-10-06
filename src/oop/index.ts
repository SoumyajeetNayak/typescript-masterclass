console.clear();
import { Company, Department, FinanceDepartment, ItDepartment, Legal, Marketing } from "./Department";

const itDept = new ItDepartment(70);
itDept.assignHod('Peter');
itDept.displayInformation();

const finance = new FinanceDepartment(80, 'Sam');
const finance2 = new FinanceDepartment(90, 'John');

console.log(finance === finance2);

finance.displayInformation();


console.log(Company.getCompanyName());

const legal1 = Legal.getInstance();
const legal2 = Legal.getInstance();

console.log(legal1 === legal2);


try {
    const m1 = Marketing.getInstance();
    const m2 = Marketing.getInstance();
    const m3 = Marketing.getInstance();
    const m4 = Marketing.getInstance();
    const m5 = Marketing.getInstance();
    const m6 = Marketing.getInstance()
    console.log('success');
} catch (error: any) {
    console.log(error?.message);
    
}