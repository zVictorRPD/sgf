import * as Yup from 'yup';

export const initialValues = {
    email: '',
}

export const validationSchema = Yup.object({
    email: Yup.string()
        .email('Digite um e-mail válido')
        .required('O E-mail é obrigatório'),
})
