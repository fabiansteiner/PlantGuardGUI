import * as React from 'react';
import {Container, Provider, Subscribe} from "unstated";
import Sockette from "sockette"
import {Plant, Identifiers, PlantType, ErrorState} from "./ItemInterfaces";


interface ItemState {
    ws: Sockette;
    items: Array<any>, // <-- this holds every item, the list is passed down to every component
    error: ErrorState
    loading: boolean
}

// Create a Container for our React Context. This container will
// hold state and methods just like a react component would:
export class ItemContainer extends Container<ItemState> {
    static websocket_url = "ws://localhost:8000/";
    //static websocket_url = "ws://" + window.location.hostname + "/ws";
    // @ts-ignore
    state: ItemState = {ws: null, items: [], error:{/*waterPressureHigh:true, notEnoughWaterFlow:true, oneOrMoreValveErrors:true, oneOrMoreValvesNotClosed:true, oneOrMoreValvesOffline:true*/}, loading: true};
    timeout;


    constructor() {
        super();
        this.renewTimeout();


        // @ts-ignore
        this.setState({
            ws: new Sockette(ItemContainer.websocket_url, {
                timeout: 5e3,
                maxAttempts: 10,
                onopen: e => {
                    console.log('Connected!');
                    this.requestData()
                },
                onmessage: e => {
                    //console.log("New message!", e);
                    this.handleData(e.data)
                },
                onclose: e => {
                    console.log("Websocket closed!");
                }
            }),
            items: [
                /*
                {
                    id: 1,
                    name: "Planti",
                    waterAmount: 500,
                    fertilizerAmount: 5,
                    soilMoisture: 25,
                    threshold: 25,
                    wateringStatus: Identifiers.STATUS_NOTHINSCHEDULED,
                    valveStatus: Identifiers.CLOSED,
                    autoWatering: Identifiers.AUTOWATERING_OFF,
                    progress: 0,
                    unsuccessfulRequests: 0,
                    safetyTimeActive: 0,
                    safetyMinutesLeft: 0,
                    type: PlantType.CUCUMBER
                },
                {
                        id: 2,
                        name: "Planti",
                        waterAmount: 500,
                        fertilizerAmount: 5,
                        soilMoisture: 25,
                        threshold: 25,
                        wateringStatus: Identifiers.STATUS_NOTHINSCHEDULED,
                        valveStatus: Identifiers.CLOSED,
                        autoWatering: Identifiers.AUTOWATERING_OFF,
                        progress: 0,
                        unsuccessfulRequests: 0,
                        safetyTimeActive: 0,
                        safetyMinutesLeft: 0,
                        type: PlantType.CUCUMBER
                },
                {
                    id: 3,
                    name: "Planti",
                    waterAmount: 500,
                    fertilizerAmount: 5,
                    soilMoisture: 25,
                    threshold: 25,
                    wateringStatus: Identifiers.STATUS_NOTHINSCHEDULED,
                    valveStatus: Identifiers.CLOSED,
                    autoWatering: Identifiers.AUTOWATERING_OFF,
                    progress: 0,
                    unsuccessfulRequests: 0,
                    safetyTimeActive: 0,
                    safetyMinutesLeft: 0,
                    type: PlantType.CUCUMBER
                },
                {
                    id: 4,
                    name: "Planti",
                    waterAmount: 500,
                    fertilizerAmount: 5,
                    soilMoisture: 25,
                    threshold: 25,
                    wateringStatus: Identifiers.STATUS_NOTHINSCHEDULED,
                    valveStatus: Identifiers.CLOSED,
                    autoWatering: Identifiers.AUTOWATERING_OFF,
                    progress: 0,
                    unsuccessfulRequests: 0,
                    safetyTimeActive: 0,
                    safetyMinutesLeft: 0,
                    type: PlantType.CUCUMBER
                },
                {
                    id: 5,
                    name: "Planti",
                    waterAmount: 500,
                    fertilizerAmount: 5,
                    soilMoisture: 25,
                    threshold: 25,
                    wateringStatus: Identifiers.STATUS_NOTHINSCHEDULED,
                    valveStatus: Identifiers.CLOSED,
                    autoWatering: Identifiers.AUTOWATERING_OFF,
                    progress: 0,
                    unsuccessfulRequests: 0,
                    safetyTimeActive: 0,
                    safetyMinutesLeft: 0,
                    type: PlantType.CUCUMBER
                },
                {
                    id: 6,
                    name: "Planti",
                    waterAmount: 500,
                    fertilizerAmount: 5,
                    soilMoisture: 25,
                    threshold: 25,
                    wateringStatus: Identifiers.STATUS_NOTHINSCHEDULED,
                    valveStatus: Identifiers.CLOSED,
                    autoWatering: Identifiers.AUTOWATERING_OFF,
                    progress: 0,
                    unsuccessfulRequests: 0,
                    safetyTimeActive: 0,
                    safetyMinutesLeft: 0,
                    type: PlantType.CUCUMBER
                },
                {
                    id: 7,
                    name: "Planti",
                    waterAmount: 500,
                    fertilizerAmount: 5,
                    soilMoisture: 25,
                    threshold: 25,
                    wateringStatus: Identifiers.STATUS_NOTHINSCHEDULED,
                    valveStatus: Identifiers.CLOSED,
                    autoWatering: Identifiers.AUTOWATERING_OFF,
                    progress: 0,
                    unsuccessfulRequests: 0,
                    safetyTimeActive: 0,
                    safetyMinutesLeft: 0,
                    type: PlantType.CUCUMBER
                },
                {
                    id: 8,
                    name: "Planti",
                    waterAmount: 500,
                    fertilizerAmount: 5,
                    soilMoisture: 25,
                    threshold: 25,
                    wateringStatus: Identifiers.STATUS_NOTHINSCHEDULED,
                    valveStatus: Identifiers.CLOSED,
                    autoWatering: Identifiers.AUTOWATERING_OFF,
                    progress: 0,
                    unsuccessfulRequests: 0,
                    safetyTimeActive: 0,
                    safetyMinutesLeft: 0,
                    type: PlantType.CUCUMBER
                },
                {
                    id: 9,
                    name: "Planti",
                    waterAmount: 500,
                    fertilizerAmount: 5,
                    soilMoisture: 25,
                    threshold: 25,
                    wateringStatus: Identifiers.STATUS_NOTHINSCHEDULED,
                    valveStatus: Identifiers.CLOSED,
                    autoWatering: Identifiers.AUTOWATERING_OFF,
                    progress: 0,
                    unsuccessfulRequests: 0,
                    safetyTimeActive: 0,
                    safetyMinutesLeft: 0,
                    type: PlantType.CUCUMBER
                },
                {
                    id: 10,
                    name: "Planti",
                    waterAmount: 500,
                    fertilizerAmount: 5,
                    soilMoisture: 25,
                    threshold: 25,
                    wateringStatus: Identifiers.STATUS_NOTHINSCHEDULED,
                    valveStatus: Identifiers.CLOSED,
                    autoWatering: Identifiers.AUTOWATERING_OFF,
                    progress: 0,
                    unsuccessfulRequests: 0,
                    safetyTimeActive: 0,
                    safetyMinutesLeft: 0,
                    type: PlantType.CUCUMBER
                },
                {
                    id: 11,
                    name: "Planti",
                    waterAmount: 500,
                    fertilizerAmount: 5,
                    soilMoisture: 25,
                    threshold: 25,
                    wateringStatus: Identifiers.STATUS_NOTHINSCHEDULED,
                    valveStatus: Identifiers.CLOSED,
                    autoWatering: Identifiers.AUTOWATERING_OFF,
                    progress: 0,
                    unsuccessfulRequests: 0,
                    safetyTimeActive: 0,
                    safetyMinutesLeft: 0,
                    type: PlantType.CUCUMBER
                },
                {
                    id: 12,
                    name: "Planti",
                    waterAmount: 500,
                    fertilizerAmount: 5,
                    soilMoisture: 25,
                    threshold: 25,
                    wateringStatus: Identifiers.STATUS_NOTHINSCHEDULED,
                    valveStatus: Identifiers.CLOSED,
                    autoWatering: Identifiers.AUTOWATERING_OFF,
                    progress: 0,
                    unsuccessfulRequests: 0,
                    safetyTimeActive: 0,
                    safetyMinutesLeft: 0,
                    type: PlantType.CUCUMBER
                },
                {
                    id: 13,
                    name: "Planti",
                    waterAmount: 500,
                    fertilizerAmount: 5,
                    soilMoisture: 25,
                    threshold: 25,
                    wateringStatus: Identifiers.STATUS_NOTHINSCHEDULED,
                    valveStatus: Identifiers.CLOSED,
                    autoWatering: Identifiers.AUTOWATERING_OFF,
                    progress: 0,
                    unsuccessfulRequests: 0,
                    safetyTimeActive: 0,
                    safetyMinutesLeft: 0,
                    type: PlantType.CUCUMBER
                },
                {
                    id: 14,
                    name: "Planti",
                    waterAmount: 500,
                    fertilizerAmount: 5,
                    soilMoisture: 25,
                    threshold: 25,
                    wateringStatus: Identifiers.STATUS_NOTHINSCHEDULED,
                    valveStatus: Identifiers.CLOSED,
                    autoWatering: Identifiers.AUTOWATERING_OFF,
                    progress: 0,
                    unsuccessfulRequests: 0,
                    safetyTimeActive: 0,
                    safetyMinutesLeft: 0,
                    type: PlantType.CUCUMBER
                },
                {
                    id: 15,
                    name: "Planti",
                    waterAmount: 500,
                    fertilizerAmount: 5,
                    soilMoisture: 25,
                    threshold: 25,
                    wateringStatus: Identifiers.STATUS_NOTHINSCHEDULED,
                    valveStatus: Identifiers.CLOSED,
                    autoWatering: Identifiers.AUTOWATERING_OFF,
                    progress: 0,
                    unsuccessfulRequests: 0,
                    safetyTimeActive: 0,
                    safetyMinutesLeft: 0,
                    type: PlantType.CUCUMBER
                },
                {
                    id: 16,
                    name: "Planti",
                    waterAmount: 500,
                    fertilizerAmount: 5,
                    soilMoisture: 25,
                    threshold: 25,
                    wateringStatus: Identifiers.STATUS_NOTHINSCHEDULED,
                    valveStatus: Identifiers.CLOSED,
                    autoWatering: Identifiers.AUTOWATERING_OFF,
                    progress: 0,
                    unsuccessfulRequests: 0,
                    safetyTimeActive: 0,
                    safetyMinutesLeft: 0,
                    type: PlantType.CUCUMBER
                },
                {
                    id: 17,
                    name: "Planti",
                    waterAmount: 500,
                    fertilizerAmount: 5,
                    soilMoisture: 25,
                    threshold: 25,
                    wateringStatus: Identifiers.STATUS_NOTHINSCHEDULED,
                    valveStatus: Identifiers.CLOSED,
                    autoWatering: Identifiers.AUTOWATERING_OFF,
                    progress: 0,
                    unsuccessfulRequests: 0,
                    safetyTimeActive: 0,
                    safetyMinutesLeft: 0,
                    type: PlantType.CUCUMBER
                },
                {
                    id: 18,
                    name: "Planti",
                    waterAmount: 500,
                    fertilizerAmount: 5,
                    soilMoisture: 25,
                    threshold: 25,
                    wateringStatus: Identifiers.STATUS_NOTHINSCHEDULED,
                    valveStatus: Identifiers.CLOSED,
                    autoWatering: Identifiers.AUTOWATERING_OFF,
                    progress: 0,
                    unsuccessfulRequests: 0,
                    safetyTimeActive: 0,
                    safetyMinutesLeft: 0,
                    type: PlantType.CUCUMBER
                },
                {
                    id: 19,
                    name: "Planti",
                    waterAmount: 500,
                    fertilizerAmount: 5,
                    soilMoisture: 25,
                    threshold: 25,
                    wateringStatus: Identifiers.STATUS_NOTHINSCHEDULED,
                    valveStatus: Identifiers.CLOSED,
                    autoWatering: Identifiers.AUTOWATERING_OFF,
                    progress: 0,
                    unsuccessfulRequests: 0,
                    safetyTimeActive: 0,
                    safetyMinutesLeft: 0,
                    type: PlantType.CUCUMBER
                },
                {
                    id: 20,
                    name: "Planti",
                    waterAmount: 500,
                    fertilizerAmount: 5,
                    soilMoisture: 25,
                    threshold: 25,
                    wateringStatus: Identifiers.STATUS_NOTHINSCHEDULED,
                    valveStatus: Identifiers.CLOSED,
                    autoWatering: Identifiers.AUTOWATERING_OFF,
                    progress: 0,
                    unsuccessfulRequests: 0,
                    safetyTimeActive: 0,
                    safetyMinutesLeft: 0,
                    type: PlantType.CUCUMBER
                },
                {
                    id: 21,
                    name: "Planti",
                    waterAmount: 500,
                    fertilizerAmount: 5,
                    soilMoisture: 25,
                    threshold: 25,
                    wateringStatus: Identifiers.STATUS_NOTHINSCHEDULED,
                    valveStatus: Identifiers.CLOSED,
                    autoWatering: Identifiers.AUTOWATERING_OFF,
                    progress: 0,
                    unsuccessfulRequests: 0,
                    safetyTimeActive: 0,
                    safetyMinutesLeft: 0,
                    type: PlantType.CUCUMBER
                },
                {
                    id: 22,
                    name: "Planti",
                    waterAmount: 500,
                    fertilizerAmount: 5,
                    soilMoisture: 25,
                    threshold: 25,
                    wateringStatus: Identifiers.STATUS_NOTHINSCHEDULED,
                    valveStatus: Identifiers.CLOSED,
                    autoWatering: Identifiers.AUTOWATERING_OFF,
                    progress: 0,
                    unsuccessfulRequests: 0,
                    safetyTimeActive: 0,
                    safetyMinutesLeft: 0,
                    type: PlantType.CUCUMBER
                },
                {
                    id: 23,
                    name: "Planti",
                    waterAmount: 500,
                    fertilizerAmount: 5,
                    soilMoisture: 25,
                    threshold: 25,
                    wateringStatus: Identifiers.STATUS_NOTHINSCHEDULED,
                    valveStatus: Identifiers.CLOSED,
                    autoWatering: Identifiers.AUTOWATERING_OFF,
                    progress: 0,
                    unsuccessfulRequests: 0,
                    safetyTimeActive: 0,
                    safetyMinutesLeft: 0,
                    type: PlantType.CUCUMBER
                },
                {
                    id: 24,
                    name: "Planti",
                    waterAmount: 500,
                    fertilizerAmount: 5,
                    soilMoisture: 25,
                    threshold: 25,
                    wateringStatus: Identifiers.STATUS_NOTHINSCHEDULED,
                    valveStatus: Identifiers.CLOSED,
                    autoWatering: Identifiers.AUTOWATERING_OFF,
                    progress: 0,
                    unsuccessfulRequests: 0,
                    safetyTimeActive: 0,
                    safetyMinutesLeft: 0,
                    type: PlantType.CUCUMBER
                },
                {
                    id: 25,
                    name: "Planti",
                    waterAmount: 500,
                    fertilizerAmount: 5,
                    soilMoisture: 25,
                    threshold: 25,
                    wateringStatus: Identifiers.STATUS_NOTHINSCHEDULED,
                    valveStatus: Identifiers.CLOSED,
                    autoWatering: Identifiers.AUTOWATERING_OFF,
                    progress: 0,
                    unsuccessfulRequests: 0,
                    safetyTimeActive: 0,
                    safetyMinutesLeft: 0,
                    type: PlantType.CUCUMBER
                },
                {
                    id: 26,
                    name: "Planti",
                    waterAmount: 500,
                    fertilizerAmount: 5,
                    soilMoisture: 25,
                    threshold: 25,
                    wateringStatus: Identifiers.STATUS_NOTHINSCHEDULED,
                    valveStatus: Identifiers.CLOSED,
                    autoWatering: Identifiers.AUTOWATERING_OFF,
                    progress: 0,
                    unsuccessfulRequests: 0,
                    safetyTimeActive: 0,
                    safetyMinutesLeft: 0,
                    type: PlantType.CUCUMBER
                },
                {
                    id: 27,
                    name: "Planti",
                    waterAmount: 500,
                    fertilizerAmount: 5,
                    soilMoisture: 25,
                    threshold: 25,
                    wateringStatus: Identifiers.STATUS_NOTHINSCHEDULED,
                    valveStatus: Identifiers.CLOSED,
                    autoWatering: Identifiers.AUTOWATERING_OFF,
                    progress: 0,
                    unsuccessfulRequests: 0,
                    safetyTimeActive: 0,
                    safetyMinutesLeft: 0,
                    type: PlantType.CUCUMBER
                },
                {
                    id: 28,
                    name: "Planti",
                    waterAmount: 500,
                    fertilizerAmount: 5,
                    soilMoisture: 25,
                    threshold: 25,
                    wateringStatus: Identifiers.STATUS_NOTHINSCHEDULED,
                    valveStatus: Identifiers.CLOSED,
                    autoWatering: Identifiers.AUTOWATERING_OFF,
                    progress: 0,
                    unsuccessfulRequests: 0,
                    safetyTimeActive: 0,
                    safetyMinutesLeft: 0,
                    type: PlantType.CUCUMBER
                },
                {
                    id: 29,
                    name: "Planti",
                    waterAmount: 500,
                    fertilizerAmount: 5,
                    soilMoisture: 25,
                    threshold: 25,
                    wateringStatus: Identifiers.STATUS_NOTHINSCHEDULED,
                    valveStatus: Identifiers.CLOSED,
                    autoWatering: Identifiers.AUTOWATERING_OFF,
                    progress: 0,
                    unsuccessfulRequests: 0,
                    safetyTimeActive: 0,
                    safetyMinutesLeft: 0,
                    type: PlantType.CUCUMBER
                },
                {
                    id: 30,
                    name: "Planti",
                    waterAmount: 500,
                    fertilizerAmount: 5,
                    soilMoisture: 25,
                    threshold: 25,
                    wateringStatus: Identifiers.STATUS_NOTHINSCHEDULED,
                    valveStatus: Identifiers.CLOSED,
                    autoWatering: Identifiers.AUTOWATERING_OFF,
                    progress: 0,
                    unsuccessfulRequests: 0,
                    safetyTimeActive: 0,
                    safetyMinutesLeft: 0,
                    type: PlantType.CUCUMBER
                },
                {
                    id: 31,
                    name: "Planti",
                    waterAmount: 500,
                    fertilizerAmount: 5,
                    soilMoisture: 25,
                    threshold: 25,
                    wateringStatus: Identifiers.STATUS_NOTHINSCHEDULED,
                    valveStatus: Identifiers.CLOSED,
                    autoWatering: Identifiers.AUTOWATERING_OFF,
                    progress: 0,
                    unsuccessfulRequests: 0,
                    safetyTimeActive: 0,
                    safetyMinutesLeft: 0,
                    type: PlantType.CUCUMBER
                },
                {
                    id: 32,
                    name: "Planti",
                    waterAmount: 500,
                    fertilizerAmount: 5,
                    soilMoisture: 25,
                    threshold: 25,
                    wateringStatus: Identifiers.STATUS_NOTHINSCHEDULED,
                    valveStatus: Identifiers.CLOSED,
                    autoWatering: Identifiers.AUTOWATERING_OFF,
                    progress: 0,
                    unsuccessfulRequests: 0,
                    safetyTimeActive: 0,
                    safetyMinutesLeft: 0,
                    type: PlantType.CUCUMBER
                },
                {
                    id: 33,
                    name: "Planti",
                    waterAmount: 500,
                    fertilizerAmount: 5,
                    soilMoisture: 25,
                    threshold: 25,
                    wateringStatus: Identifiers.STATUS_NOTHINSCHEDULED,
                    valveStatus: Identifiers.CLOSED,
                    autoWatering: Identifiers.AUTOWATERING_OFF,
                    progress: 0,
                    unsuccessfulRequests: 0,
                    safetyTimeActive: 0,
                    safetyMinutesLeft: 0,
                    type: PlantType.CUCUMBER
                },
                {
                    id: 34,
                    name: "Planti",
                    waterAmount: 500,
                    fertilizerAmount: 5,
                    soilMoisture: 25,
                    threshold: 25,
                    wateringStatus: Identifiers.STATUS_NOTHINSCHEDULED,
                    valveStatus: Identifiers.CLOSED,
                    autoWatering: Identifiers.AUTOWATERING_OFF,
                    progress: 0,
                    unsuccessfulRequests: 0,
                    safetyTimeActive: 0,
                    safetyMinutesLeft: 0,
                    type: PlantType.CUCUMBER
                },
                {
                    id: 35,
                    name: "Planti",
                    waterAmount: 500,
                    fertilizerAmount: 5,
                    soilMoisture: 25,
                    threshold: 25,
                    wateringStatus: Identifiers.STATUS_NOTHINSCHEDULED,
                    valveStatus: Identifiers.CLOSED,
                    autoWatering: Identifiers.AUTOWATERING_OFF,
                    progress: 0,
                    unsuccessfulRequests: 0,
                    safetyTimeActive: 0,
                    safetyMinutesLeft: 0,
                    type: PlantType.CUCUMBER
                },
                {
                    id: 36,
                    name: "Planti",
                    waterAmount: 500,
                    fertilizerAmount: 5,
                    soilMoisture: 25,
                    threshold: 25,
                    wateringStatus: Identifiers.STATUS_NOTHINSCHEDULED,
                    valveStatus: Identifiers.CLOSED,
                    autoWatering: Identifiers.AUTOWATERING_OFF,
                    progress: 0,
                    unsuccessfulRequests: 0,
                    safetyTimeActive: 0,
                    safetyMinutesLeft: 0,
                    type: PlantType.CUCUMBER
                },
                {
                    id: 37,
                    name: "Planti",
                    waterAmount: 500,
                    fertilizerAmount: 5,
                    soilMoisture: 25,
                    threshold: 25,
                    wateringStatus: Identifiers.STATUS_NOTHINSCHEDULED,
                    valveStatus: Identifiers.CLOSED,
                    autoWatering: Identifiers.AUTOWATERING_OFF,
                    progress: 0,
                    unsuccessfulRequests: 0,
                    safetyTimeActive: 0,
                    safetyMinutesLeft: 0,
                    type: PlantType.CUCUMBER
                },*/
            

            ],
            loading: true
            //items: Array.from(localStorage.getItem("items") == undefined ? localStorage.getItem("items") : [])
        });
    }

    getPlant_id(address: number): Plant {
        return this.state.items.find((value: Plant) => {
            return value.address === address
        }) as unknown as Plant
    }

    isLoading(): boolean {
        return this.state.loading
    }


    private renewTimeout() {
        let ref = this;
        this.timeout = setTimeout(function () {
            ref.setState({loading: false});
        }, 1000);
    }

    /**
     * Handles incoming data -> item
     * Adds it to the list, updates it or removes it
     */

    private handleData(data) {
        let object: any = JSON.parse(data);
        let errorObject = object as ErrorState;

        if(errorObject.notEnoughWaterFlow !== undefined){
            this.setState({
                error: errorObject
            });
            return
        }
        


        // Copy array
        let tmpItems: Plant[] = this.state.items.slice();

        // Remove
        if (object.valveStatus === Identifiers.DELETED) {
            console.log("Item removed", object);
            this.setState({
                items: this.state.items.filter(function (item) {
                    return item.address !== object.address
                })
            });
            return
        }

        // Update if it exits
        let i;
        let exits = false;
        tmpItems.forEach((o, index) => {
            if (o.address === object.address) {
                
                i = index;
                exits = true;

            }
        });

        if (exits) {
            tmpItems[i] = object;
            //console.log("Item updated", object);
            this.setState({items: tmpItems});
            return
        }

        // If it is not removed and not in the list add it
        tmpItems.push(object);
        //console.log("New Item", object);
        this.setState({items: tmpItems});

        localStorage.setItem("items", tmpItems.toString());
        this.renewTimeout();
    }

    /**
     * Request the items from the server
     */
    private requestData() {
        // @ts-ignore
        this.state.ws.send(JSON.stringify({requestItems: true}));
    }
}

// Following the Singleton Service pattern (think Angular Service),
// we will instantiate the Container from within this module
const ItemService = new ItemContainer();

// Then we will wrap the provider and subscriber inside of functional
// React components. This simplifies the resuse of the module as we
// will be able to import this module as a depenency without having
// to import Unstated and/or create React Contexts  manually in the
// places that we want to Provide/Subscribe to the API Service.
export const ItemProvider = props => {
    // We leave the injector flexible, so you can inject a new dependency
    // at any time, eg: snapshot testing
    return <Provider inject={props.inject || [ItemService]}>{props.children}</Provider>;
};

export const ItemSubscribe = props => {
    // We also leave the subscribe "to" flexible, so you can have full
    // control over your subscripton from outside of the module
    return <Subscribe to={props.to || [ItemService]}>{props.children}</Subscribe>;
};

export default ItemService;

// IMPORT NOTE:
// With the above export structure, we have the ability to
// import like this:

// import Api, {ApiProvider, ApiSubscribe, ApiContainer}

// Api: Singleton Api instance, exported as default.
//      Contains your instantiated .state and methods.

// ApiProvider: Context Provider...
//      Publishes your React Context into the top of the
//      React App into the component tree.

// ApiSubscribe: Context Subsriber...
//      Subscribes to the higher Context from any place
//      lower than the point at which the Context was provided.

// ApiContainer:Context Container Class...
//      Used to instantiate new copy of your service if so desired.
//      Can be used for testing, or subsrcibing your class to a new
//      data source that uses the same data model/methods.


/*
{
    "address" : 2,
    "name" : "plant2",
    "waterAmount" : 300,
    "fertilizerAmount": 0,
    "soilMoisture": 25,
    "threshold" : 25,
    "wateringStatus" : 2,
    "valveStatus" : 40,
    "autoWatering" : 0,
    "unsuccessfulRequests": 0,
    "safetyTimeActive": 0,
    "safetyMinutesLeft" : 0,
    "type": 7,
    "waitTime" : 180
}
*/


