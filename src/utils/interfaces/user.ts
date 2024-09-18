export interface IUser {
    userId: number;
    name: string;
    email: string;
    cpf: string;
    vehicleId: string;
    operationalBaseId: string;
    flDriver: boolean;
    flOperationalAssistant: boolean;

    company: ICompany;
    profile: IProfile;
    relationshipUserOperationalBases: relationshipUserOperationalBases[];
    userUpdatedAt: number;
    userCreatedAt: number;
    status: boolean;
    createdAt: string;
    updatedAt: string;
}

interface relationshipUserOperationalBases {
    relationshipUserOperationalBaseId: string;
    companyId: string;
    userId: string;
    operationalBase: OperationalBase;
    userCreatedAt: string;
    createdAt: string;
}

export interface OperationalBase {
    operationalBaseId: string;

    userCreatedAt: string;
    userUpdatedAt: string;
    createdAt: string;
    updatedAt: string;
    companyId: string;
    costCenter: string;
    description: string;
    address?: string;
    cnpj?: string;
    municipalRegistration?: string;
    email?: string;
    telephone?: string;
    status: boolean;
}

export interface ICompany {
    userCreatedAt: number;
    userUpdatedAt: number;
    createdAt: string;
    updatedAt: string;
    companyId: number;
    corporateReason: string;
    fantasyName: string;
    address?: string;
    cnpj: string;
    municipalRegistration?: string;
    email?: string;
    telephone?: string;
    status: true;
}

export interface IProfile {
    userCreatedAt: number;
    userUpdatedAt: number;
    createdAt: string;
    updatedAt: string;
    profileId: number;
    companyId: number;
    description: string;
    status: true;
    permission: IPermission;
}

export interface IPermission {
    applicationAccess: boolean;
    driver: boolean;
    fillUpFuel: boolean;

    // dados não usados no app
    userCreatedAt: number;
    userUpdatedAt: number;
    createdAt: string;
    updatedAt: string;
    permissionId: number;
    companyId: number;
    profileId: number;
    backofficeAccess?: boolean;
    dashboardView?: boolean;
    companyEdit?: boolean;
    operationalBaseCreate?: boolean;
    operationalBaseEdit?: boolean;
    operationalBaseSearch?: boolean;
    driverCreate?: boolean;
    driverEdit?: boolean;
    driverSearch?: boolean;
    brandCreate?: boolean;
    brandEdit?: boolean;
    brandSearch?: boolean;
    modelCreate?: boolean;
    modelEdit?: boolean;
    modelSearch?: boolean;
    ownerCreate?: boolean;
    ownerEdit?: boolean;
    ownerSearch?: boolean;
    vehicleCreate?: boolean;
    vehicleEdit?: boolean;
    vehicleSearch?: boolean;
    maintenanceTypeCreate?: boolean;
    maintenanceTypeEdit?: boolean;
    maintenanceTypeSearch?: boolean;
    maintenanceCategoryCreate?: boolean;
    maintenanceCategoryEdit?: boolean;
    maintenanceCategorySearch?: boolean;
    maintenanceServiceCreate?: boolean;
    maintenanceServiceEdit?: boolean;
    maintenanceServiceSearch?: boolean;
    maintenanceRecordCreate?: boolean;
    maintenanceRecordEdit?: boolean;
    maintenanceRecordSearch?: boolean;
    maintenanceRecordCancel?: boolean;
    profileCreate?: boolean;
    profileEdit?: boolean;
    profileSearch?: boolean;
    userCreate?: boolean;
    userEdit?: boolean;
    userSearch?: boolean;
}
