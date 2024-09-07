import { Alert, AlertCircleIcon, AlertIcon, AlertText, Box, Button, ButtonIcon, ButtonSpinner, ButtonText, FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText, InfoIcon, Input, InputField, Text } from "@gluestack-ui/themed"
import { SendIcon, Undo2Icon } from "lucide-react-native"
import { TAuthNavigatorRoutesProps } from "@routes/auth.routes"
import { useNavigation } from "@react-navigation/native"
import { TouchableHighlight } from "react-native"
import { initialValues, validationSchema } from "@utils/forms/auth/reset"
import { AuthLayout } from "@components/Layout/AuthLayout"
import { useState } from "react"
import { Formik } from "formik"

export function ResetPassword() {
    const { navigate } = useNavigation<TAuthNavigatorRoutesProps>()
    const [passwordWasReset, setPasswordWasReset] = useState(false)

    function handleReturnToSignIn() {
        navigate("signIn")
    }

    async function handleResetPassword(values: typeof initialValues) {

    }

    return (
        <AuthLayout title="Resetar senha">
            {!passwordWasReset ? (
                <>
                    <Alert action="info" variant="solid" gap={8}>
                        <AlertIcon as={InfoIcon} />
                        <AlertText>Use números, letras minúsculas, maiúsculas e caracteres especiais.</AlertText>
                    </Alert>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleResetPassword}
                        validationSchema={validationSchema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                            <>
                                <FormControl
                                    isInvalid={errors.newPassword && touched.newPassword ? true : false}
                                >
                                    <FormControlLabel>
                                        <FormControlLabelText>Nova senha</FormControlLabelText>
                                    </FormControlLabel>
                                    <Input>
                                        <InputField
                                            type="password"
                                            placeholder="Digite sua nova senha"
                                            secureTextEntry
                                            autoCapitalize="none"
                                            onChangeText={handleChange("newPassword")}
                                            onBlur={handleBlur("newPassword")}
                                            value={values.newPassword}
                                        />
                                    </Input>
                                    <FormControlError>
                                        <FormControlErrorIcon
                                            fontSize={10}
                                            as={AlertCircleIcon}
                                        />
                                        <FormControlErrorText>
                                            {errors?.newPassword}
                                        </FormControlErrorText>
                                    </FormControlError>
                                </FormControl>
                                <FormControl
                                    isInvalid={errors.confirmPassword && touched.confirmPassword ? true : false}
                                >
                                    <FormControlLabel>
                                        <FormControlLabelText>Nova senha</FormControlLabelText>
                                    </FormControlLabel>
                                    <Input>
                                        <InputField
                                            type="password"
                                            placeholder="Confirme sua nova senha"
                                            secureTextEntry
                                            autoCapitalize="none"
                                            onChangeText={handleChange("confirmPassword")}
                                            onBlur={handleBlur("confirmPassword")}
                                            value={values.confirmPassword}
                                        />
                                    </Input>
                                    <FormControlError>
                                        <FormControlErrorIcon
                                            fontSize={10}
                                            as={AlertCircleIcon}
                                        />
                                        <FormControlErrorText>
                                            {errors?.confirmPassword}
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
                </>
            ) : (
                <>
                    <Alert action="success" variant="solid" gap={8}>
                        <AlertIcon as={InfoIcon} />
                        <AlertText>Sua senha foi redefinida com sucesso!</AlertText>
                    </Alert>
                    <Button
                        size="md"
                        variant="solid"
                        action="primary"
                        gap={8}
                        onPress={handleReturnToSignIn}
                    >
                        <>
                            <ButtonText>Retornar para o login</ButtonText>
                            <ButtonIcon as={Undo2Icon} />
                        </>
                    </Button>
                </>
            )}

        </AuthLayout>

    )
}