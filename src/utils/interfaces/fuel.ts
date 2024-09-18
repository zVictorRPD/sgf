export interface IFuelTable {
    userCreatedAt: string
    userUpdatedAt: string
    createdAt: string
    updatedAt: string
    fuelTableId: string
    companyId: string
    fuel: IFuel
    literValue: number
    currentStock: number
    maximumStock: number
    minimumStock: number
    status: boolean
  }
  
  export interface IFuel {
    userCreatedAt: string
    userUpdatedAt: string
    createdAt: string
    updatedAt: string
    fuelId: string
    companyId: string
    fuel: string
    status: boolean
  }