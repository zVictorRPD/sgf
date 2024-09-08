export interface IUser {
    userId: number;
    name: string;
    email: string;
    userUpdatedAt: number;
    userCreatedAt: number;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    company: ICompany;
    profile: IProfile;
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
    userCreatedAt: number;
    userUpdatedAt: number;
    createdAt: string;
    updatedAt: string;
    permissionId: number;
    companyId: number;
    profileId: number;
    applicationAccess?: boolean;
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
