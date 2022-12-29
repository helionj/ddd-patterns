import express, { Request, Response } from "express";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import FindCustomerUseCase from "../../../usecase/customer/find/find.customer.usecase";
import ListCustomerUseCase from "../../../usecase/customer/list/list.customer.usecase";
import CustomerRepository from "../../customer/repository/customer-repository";

export const customerRoute = express.Router();

customerRoute.post('/', async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository());
  try {
    const customerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        city: req.body.address.city,
        zip: req.body.address.zip
      }
    }
    const output = await usecase.execute(customerDto);
    res.status(201).send(output);
  } catch(error) {
    res.status(500).send(error)
  }

});

customerRoute.get('/', async (req: Request, res: Response) => {
  const usecase = new ListCustomerUseCase(new CustomerRepository());
  try {
    
    const output = await usecase.execute();
    res.status(200).send(output);
  } catch(error) {
    res.status(500).send(error)
  }

});

customerRoute.get('/:customerId', async (req: Request, res: Response) => {
  const usecase = new FindCustomerUseCase(new CustomerRepository());
  try {
    const { customerId } = req.params;
    
    const input = {
      id: customerId
    }
    const output = await usecase.execute(input);
    res.status(200).send(output);
  } catch(error) {
    res.status(500).send(error)
  }

});