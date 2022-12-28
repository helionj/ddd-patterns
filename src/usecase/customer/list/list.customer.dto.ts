export interface InputListCustomerDto {}
 

interface CustomerDto {
  id: string;
  name: string;
  address: {
    street: string,
    number: number,
    city: string,
    zip: string
  }
};
export interface OutputListCustomerDto {
  customers: CustomerDto[]
}