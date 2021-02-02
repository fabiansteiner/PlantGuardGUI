import Sockette from "sockette";
import {Plant, Identifiers} from "./ItemInterfaces";


export function changeName(item: Plant, ws: Sockette) {
    let tmp: any = {
        name: item.name,
        address: item.address,
        action: Identifiers.ACTION_CHANGNAME
    };

    console.log("changeName", tmp);
    ws.send(JSON.stringify(tmp));
}

export function changeSettings(item: Plant, ws: Sockette) {
    let tmp: any = {
        address: item.address,
        waterAmount: item.waterAmount,
        fertilizerAmount: item.fertilizerAmount,
        type: item.type,
        waitTime: item.waitTime,
        autoWatering: (item.autoWatering ? 1 : 0),
        action: Identifiers.ACTION_CHANGESETTINGS,
        threshold: item.threshold
    };

    console.log("changeName", tmp);
    ws.send(JSON.stringify(tmp));
}

export function deleteItem(item: Plant, ws: Sockette) {
    let tmp: any = {
        address: item.address,
        action: Identifiers.ACTION_DELETEPLANT
    };
    console.log("delete", tmp);
    ws.send(JSON.stringify(tmp));
}

export function waterPlant(plant: Plant, ws: Sockette) {
    let tmp={
        address: plant.address,
        waterAmount: plant.waterAmount,
        fertilizerAmount: plant.fertilizerAmount,
        action: Identifiers.ACTION_WATERPLANT
    };
    console.log("waterPlant", tmp);
    ws.send(JSON.stringify(tmp));
}

export function send(item: any, ws: Sockette) {
    console.log("send", item);
    ws.send(JSON.stringify(item));
}

export function map(num, in_min, in_max, out_min, out_max) {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}