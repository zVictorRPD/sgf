import * as Yup from "yup";

export const initialValues = {
    fuelTableId: "",
    mileage: "",
    fuelPumpInitialOdometer: "",
    fuelPumpFinalOdometer: "",
    literValue: "",
};

export const validationSchema = Yup.object({
    fuelTableId: Yup.string().required("O tipo de combustível é obrigatório"),
    mileage: Yup.string().required("A quilometragem do carro é obrigatória"),
    literValue: Yup.string(),
    fuelPumpInitialOdometer: Yup.string().required("O Hodômetro inicial é obrigatório"),
    fuelPumpFinalOdometer: Yup.string()
        .test(
            "is-greater",
            "O hodômetro final deve ser maior que o inicial",
            function (value) {
                const { fuelPumpInitialOdometer } = this.parent;
                if (!value) return true;
                return parseInt(value) > parseInt(fuelPumpInitialOdometer);
            }
        )
        .required("O Hodômetro final é obrigatório"),
});
