import * as Yup from "yup";

export const initialValues = {
    fuelTableId: "",
    mileage: "",
    literAmount: "",
    literValue: "",
};

export const validationSchema = Yup.object({
    fuelTableId: Yup.string().required("O tipo de combustível é obrigatório"),
    mileage: Yup.string().required("A quilometragem do carro é obrigatória"),
    literAmount: Yup.string()
        .max(3, "A quantidade de litros não pode ser maior que 3 dígitos")
        .required("A quantidade de litros é obrigatória"),
    literValue: Yup.string()
        // .max(3, "O valor do litro não pode ser maior que 3 dígitos")
        .required("O valor do litro é obrigatório"),
});
