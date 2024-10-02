import { IVehicle } from "@utils/interfaces/vehicle";

export function floatToString(value: number): string {
    return value.toFixed(2).replace(".", "");
}

export function stringToDecimals(value: string): string {
    const parsedValue = parseFloat(value) / 100;
    return isNaN(parsedValue)
        ? "0,00"
        : parsedValue.toFixed(2).replace(".", ",");
}

export function onlyNumbers(value: string): string {
    // remove lettes and special characters
    return value.replace(/[^0-9]/g, '');
}

export function renderVehicleLabel(vehicle: IVehicle) {
    return `${vehicle.plate || "placa não informada"} - ${vehicle.brand.name || "marca não informada"} - ${vehicle.vehicleModel.model || "modelo não informado"}`;
}

export function getDateTime(){
    const date = new Date();
    //subtract 3 hours to get the correct time
    date.setHours(date.getHours() - 3);
    const formattedDate = `${date.getFullYear()}-${String((date.getMonth() + 1)).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
    return formattedDate;
}
