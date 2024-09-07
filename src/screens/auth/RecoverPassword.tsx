import { Alert, AlertCircleIcon, AlertIcon, AlertText, Box, Button, ButtonIcon, ButtonSpinner, ButtonText, FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText, Heading, HStack, Image, ImageBackground, Input, InputField, ScrollView, Text, useToast, VStack } from "@gluestack-ui/themed"
import { InfoIcon, SendIcon } from "lucide-react-native"
import { TouchableHighlight } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { TAuthNavigatorRoutesProps } from "@routes/auth.routes"
import { AuthLayout } from "@components/Layout/AuthLayout"
import { initialValues, validationSchema } from "@utils/forms/auth/recover"
import { useState } from "react"
import { Formik } from "formik"
import { ToastMessage } from "@components/ToastMessage"
import { api } from "@services/api"

export function RecoverPassword() {
    const navigation = useNavigation<TAuthNavigatorRoutesProps>();
    const toast = useToast();
    const [emailWasSent, setEmailWasSent] = useState(false);

    function handleReturnToSignIn() {
        navigation.goBack();
    }

    async function handleSendEmail(values: typeof initialValues) {
        try {
            const response = await api.post("/user/recover-password/send-email", {
                data: JSON.stringify({
                    arg1: values.email,
                }),
            });
            if (!response.data) throw new Error();
            if (response.data.responseHeader.responseStatus == "ERROR") {
                throw new Error(response.data.responseHeader.message);
            }

            setEmailWasSent(true);

            toast.show({
                placement: 'top',
                render: ({ id }) => (<ToastMessage
                    id={id}
                    action="success"
                    title="Email enviado"
                    onClose={() => toast.close(id)}
                />)
            });

        } catch (error: any) {
            toast.show({
                placement: 'top',
                render: ({ id }) => (<ToastMessage
                    id={id}
                    action="error"
                    title="Erro ao enviar e-mail"
                    description={error?.message || "Ocorreu um erro interno, tente novamente mais tarde"}
                    onClose={() => toast.close(id)}
                />)
            });
        }
    }

    return (
        <AuthLayout title="Recuperar senha">
            {!emailWasSent ? (<>
                <Alert action="info" variant="solid" gap={8}>
                    <AlertIcon as={InfoIcon} />
                    <AlertText>Informe seu e-mail para receber um link de recuperação de senha.</AlertText>
                </Alert>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSendEmail}
                    validationSchema={validationSchema}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                        <>
                            <FormControl
                                isInvalid={errors.email && touched.email ? true : false}
                            >
                                <FormControlLabel>
                                    <FormControlLabelText>E-mail</FormControlLabelText>
                                </FormControlLabel>
                                <Input>
                                    <InputField
                                        type="text"
                                        placeholder="Digite seu e-mail"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        onChangeText={handleChange("email")}
                                        onBlur={handleBlur("email")}
                                        value={values.email}
                                    />
                                </Input>
                                <FormControlError>
                                    <FormControlErrorIcon
                                        fontSize={10}
                                        as={AlertCircleIcon}
                                    />
                                    <FormControlErrorText>
                                        {errors?.email}
                                    </FormControlErrorText>
                                </FormControlError>
                            </FormControl>


                            <Button
                                size="md"
                                variant="solid"
                                action="primary"
                                gap={8}
                                isDisabled={isSubmitting}
                                onPress={() => {
                                    handleSubmit();
                                }}
                            >
                                <>
                                    <ButtonText>{!isSubmitting ? "Enviar" : "Enviando"}</ButtonText>
                                    {!isSubmitting ? <ButtonIcon as={SendIcon} /> : <ButtonSpinner />}
                                </>
                            </Button>
                        </>
                    )}
                </Formik>
            </>
            ) : (
                <>
                    <Alert action="success" variant="solid" gap={8}>
                        <AlertIcon as={InfoIcon} />
                        <AlertText>
                            Enviamos um e-mail com instruções para recuperação de senha.
                            Caso não encontre o e-mail, verifique a caixa de spam ou lixo eletrônico.
                        </AlertText>
                    </Alert>
                    <Button
                        size="md"
                        variant="solid"
                        action="primary"
                        gap={8}
                        onPress={() => setEmailWasSent(false)}
                    >
                        <ButtonText>Tentar novamente</ButtonText>
                    </Button>
                </>
            )}

            <Box>
                <TouchableHighlight
                    onPress={handleReturnToSignIn}
                    underlayColor="transparent"
                >
                    <Text
                        textAlign="center"
                        color="$primary500"
                        fontSize={14}
                    >
                        Lembrei minha senha
                    </Text>
                </TouchableHighlight>
            </Box>
        </AuthLayout>
    )
}