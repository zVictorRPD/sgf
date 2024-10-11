import * as Yup from 'yup';

export const initialValues = {
    email: '',
    password: '',
}

export const validationSchema = Yup.object({
    email: Yup.string()
        .email('Digite um e-mail válido')
        .required('O E-mail é obrigatório'),
    password: Yup.string()
        .min(8, 'A senha deve ter no mínimo 8 caracteres')
        .required('A senha é obrigatória'),
})
