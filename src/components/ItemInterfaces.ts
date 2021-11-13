
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

export class languageEN{
    public static irrigationButton = "Irrigate"
    public static irrigationButtonQueue = "In queue..."
    public static irrigationButtonWatering = "Irrigating..."

    public static valveStateOpen = "OPEN"
    public static valveStateClosed = "CLOSED"
    public static valveStateOpening = "OPENING"
    public static valveStateClosing = "CLOSING"
    public static valveStateUnknown = "UNKNOWN"
    public static valveStateError = "ERROR"
    public static valveStateManualOpen = "OPEN (M)"
    public static valveStateOpeningManually = "OPENING (M)"
    public static valveStateClosingManually = "CLOSING (M)"
    public static valveStateLocked = "LOCKED"
    public static valveStateOffline = "OFFLINE"

    public static plantPageTitle = "PLANT"
    public static valuesIsMissing = "value must be entered"
    public static keepThresholdLimit = "Between 0 and 50%"
    public static keepWaitingTimeLimit = "max. 3000 minutes"
    public static keepFertilizerLimit = "max. 20ml/l"
    public static keepWaterLimit = "max. 5000ml"

    public static autoWatering = "automatic irrigation"
    public static plantType = "plant species"
    public static amountOfWater = "amount of water [ml]"
    public static amountOfFertilizer = "fertilizer per liter [ml/l]"
    public static thresholdForWatering = "threshold for watering [%]"
    public static minimalPause = "minimal time between two irrigations [minutes]"
    public static safePlant = "store configuration"
    public static minutes = "minutes"

    public static plantTypeTomato = "tomatoe"
    public static plantTypePaprika = "paprika"
    public static plantTypeChilli = "chilli"
    public static plantTypeCucumber = "cucumber"
    public static plantTypeMarihuana = "marihuana"
    public static plantTypeMicrogreens = "microgreens"
    public static plantTypeOther = "other"

    public static errorWaterPressure = "Last irrigation interrupted: waterpressure got too high - Resolve and press button."
    public static errorWaterFlow = "Last irrigation interrupted: too less water flow - Resolve and press button."
    public static errorLostConnection = "Lost connection to one or morve valves."
    public static errorAtValveMovement = "One or more valves could not be fully opened/closed."
    public static warningOpenValves = "Automatic irrigation is deactived for the time of manual interference. Close all valves to reactivate."
}

