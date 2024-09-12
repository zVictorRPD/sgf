export interface IVehicle {
    vehicleId: string
    
    userCreatedAt: string
    userUpdatedAt: string
    createdAt: string
    updatedAt: string
    companyId: string
    operationalBase?: string
    eventHistory?: string
    owner?: string
    vehicleCategory: VehicleCategory
    brand: Brand
    vehicleModel: VehicleModel
    manufactureYear: string
    modelYear: string
    plate: string
    vehicleColor: VehicleColor
    reindeer: string
    chassi: string
    status: boolean
    flRented: boolean
    initialMileage: string
    relationshipImplementVehicles?: string
  }
  
  export interface VehicleCategory {
    vehicleCategoryId: string
    description: string
  }
  
  export interface Brand {
    userCreatedAt: string
    userUpdatedAt: string
    createdAt: string
    updatedAt: string
    brandId: string
    companyId: string
    name: string
    status: boolean
  }
  
  export interface VehicleModel {
    userCreatedAt: string
    userUpdatedAt: string
    createdAt: string
    updatedAt: string
    vehicleModelId: string
    companyId: string
    model: string
    status: boolean
    brand?: string
    vehicleCategory?: string
  }
  
  export interface VehicleColor {
    vehicleColorId: string
    description: string
  }
  