import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerChangeAddressEvent from "./customer-change-address.event";
import SendConsoleLogHandler from "./handler/send-console-log-handle";

describe("Customer change address event tests", () => {
  it("should register an event CustomerChangeAddressEvent", () => {

    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLogHandler();
    
    eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);
    
    expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]).toMatchObject(eventHandler);
   
  });

 

  it("should trigger a handler SendConsoleLogHandler", () => {

    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLogHandler();
    eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]).toMatchObject(eventHandler);
   

    const customerChangeAddressEvent = new CustomerChangeAddressEvent({
      id: "123",
      name: "Customer-1",
      address: "Address",
      newAddress: "New address"

      
    });

    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    
    eventDispatcher.notify(customerChangeAddressEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  })
});