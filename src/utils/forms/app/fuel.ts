import * as Yup from "yup";

export const initialValues = {
    fuelTableId: "",
    mileage: "",
    initialOdometer: "",
    finalOdometer: "",
    literValue: "",
};

export const validationSchema = Yup.object({
    fuelTableId: Yup.string().required("O tipo de combustível é obrigatório"),
    mileage: Yup.string().required("A quilometragem do carro é obrigatória"),
    literValue: Yup.string(),
    initialOdometer: Yup.string().required("O Hodômetro inicial é obrigatório"),
    finalOdometer: Yup.string()
        .test(
            "is-greater",
            "O hodômetro final deve ser maior que o inicial",
            function (value) {
                const { initialOdometer } = this.parent;
                if (!value) return true;
                return parseFloat(value) > parseFloat(initialOdometer);
            }
        )
        .required("O Hodômetro final é obrigatório"),
});
