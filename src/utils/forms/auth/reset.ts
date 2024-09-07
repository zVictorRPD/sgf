import * as Yup from 'yup';

export const initialValues = {
    newPassword: '',
    confirmPassword: '',
}

export const validationSchema = Yup.object({
    newPassword: Yup.string()
        .min(8, 'A senha deve ter no mínimo 8 caracteres')
        .required('A senha é obrigatória'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), ""], 'As senhas não coincidem')
        .required('Confirme a senha'),
})
