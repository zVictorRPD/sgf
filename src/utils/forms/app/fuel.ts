import * as Yup from 'yup';

export const initialValues = {
    carKm : '',
    fuelQuantity : '',
    fuelType : '',
}

export const validationSchema = Yup.object({
    carKm: Yup.string()
        .required('A quilometragem do carro é obrigatória'),
    // fuelQuantity: Yup.string()
    //     .required('A quantidade de combustível é obrigatória'),
    // fuelType: Yup.string()
    //     .required('O tipo de combustível é obrigatório'),
})
