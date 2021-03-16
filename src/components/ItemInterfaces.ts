
export class Identifiers {
    public static STATUS_NOTHINSCHEDULED: number = 2;
    public static STATUS_IN_QUEUE: number = 3;
    public static STATUS_WATERING: number = 4;

    public static AUTOWATERING_ON: number = 1;
    public static AUTOWATERING_OFF: number = 0;

    public static ACTION_CHANGESETTINGS: number = 1;
    public static ACTION_DELETEPLANT: number = 2;
    public static ACTION_WATERPLANT: number = 3;
    public static ACTION_CHANGEWIFICREDENTIALS: number = 4;
    public static ACTION_CHANGNAME: number = 5;

    public static OPEN: number = 20;
    public static CLOSED: number = 40;
    public static OPENING: number = 160;
    public static CLOSING: number = 80;
    public static UNKNOWN: number = 100;
    public static CURRSENSEERROR: number = 120;
    public static MANUALOPEN: number = 140;
    public static OPENINGMANUALLY: number = 60;
    public static CLOSINGMANUALLY: number = 180;
    public static LOCKED: number = 200;
    public static OFFLINE: number = 220;
    public static DELETED: number = 230;


}

export enum PlantType {
    TOMATO = 1,
    CHILI = 2,
    PAPRIKA = 3,
    MICROGREENS = 4,
    CUCUMBER = 5,
    MARIHUANA = 6,
    OTHER = 7,
}

export interface Items {
    items: Array<any>
}

export interface progress{
    water: number
    waterProgress: number
    fertilizerPerLiter: number
    fertilizerProgress: number
}


export interface Plant {
    address: number
    name: string
    waterAmount: number
    fertilizerAmount: number
    soilMoisture: number
    threshold: number
    wateringStatus: number
    valveStatus: number
    autoWatering: boolean
    progress: progress
    unsuccessfulRequests: number
    safetyTimeActive: number
    safetyMinutesLeft: number
    type: number
    waitTime: number
}

export interface ErrorState{
    waterPressureHigh: boolean
    notEnoughWaterFlow: boolean
    oneOrMoreValvesNotClosed:boolean
    oneOrMoreValveErrors:boolean
    oneOrMoreValvesOffline:boolean
}

