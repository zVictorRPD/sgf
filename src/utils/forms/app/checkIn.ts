import * as Yup from "yup";

export const initialValues = {
    vehicleId: "",
    mileage: "",
    plate: "",
};

export const validationSchema = Yup.object({
    mileage: Yup.string().required("A quilometragem do carro é obrigatória"),
    plate: Yup.string().required("A placa do carro é obrigatória"),
    vehicleId: Yup.string().required("O veículo é obrigatório"),
});
