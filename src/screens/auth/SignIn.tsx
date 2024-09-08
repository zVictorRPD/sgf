import { AlertCircleIcon, Box, Button, ButtonIcon, ButtonSpinner, ButtonText, FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText, Input, InputField, Text } from "@gluestack-ui/themed"
import { LogInIcon } from "lucide-react-native"
import { TAuthNavigatorRoutesProps } from "@routes/auth.routes"
import { useNavigation } from "@react-navigation/native"
import { TouchableHighlight } from "react-native"
import { AuthLayout } from "@components/Layout/AuthLayout"
import { Formik } from "formik"
import { initialValues, validationSchema } from "@utils/forms/auth/login"
import { api } from "@services/api"
import { useToast } from "@gluestack-ui/themed"
import { ToastMessage } from "@components/ToastMessage"
import { storageUserSave } from "@storage/storageUser"
import { useAuth } from "@hooks/useAuth"

export function SignIn() {
    const { navigate } = useNavigation<TAuthNavigatorRoutesProps>();
    const toast = useToast();
    const { signInUser } = useAuth();

    function handleRecoverPassword() {
        navigate("recoverPassword")
    }

    async function handleSingUp(values: typeof initialValues) {
        try {
            const response = await api.post("/login", {
                data: JSON.stringify(values),
            });
            if (!response.data) throw new Error();

            if (response.data.responseHeader.responseStatus == "ERROR") {
                throw new Error(response.data.responseHeader.message);
            }

            const data = JSON.parse(response.data.data);

            await signInUser(data);

            toast.show({
                placement: 'top',
                render: ({ id }) => (<ToastMessage
                    id={id}
                    action="success"
                    title="Login efetuado com sucesso"
                    onClose={() => toast.close(id)}
                />)
            });

        } catch (error: any) {
            toast.show({
                placement: 'top',
                render: ({ id }) => (<ToastMessage
                    id={id}
                    action="error"
                    title="Erro ao fazer login"
                    description={error?.message || "Ocorreu um erro interno, tente novamente mais tarde"}
                    onClose={() => toast.close(id)}
                />)
            });
        }
    }

    return (
        <AuthLayout title="Login">
            <Formik
                initialValues={initialValues}
                onSubmit={handleSingUp}
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

                        <FormControl
                            isInvalid={errors.password && touched.password ? true : false}
                        >
                            <FormControlLabel>
                                <FormControlLabelText>Senha</FormControlLabelText>
                            </FormControlLabel>
                            <Input>
                                <InputField
                                    type="password"
                                    placeholder="Digite sua senha"
                                    secureTextEntry
                                    autoCapitalize="none"
                                    onChangeText={handleChange("password")}
                                    onBlur={handleBlur("password")}
                                    value={values.password}
                                />
                            </Input>
                            <FormControlError>
                                <FormControlErrorIcon
                                    fontSize={10}
                                    as={AlertCircleIcon}
                                />
                                <FormControlErrorText>
                                    {errors?.password}
                                </FormControlErrorText>
                            </FormControlError>
                        </FormControl>

                        <Button
                            size="md"
                            variant="solid"
                            action="primary"
                            gap={8}
                            isDisabled={isSubmitting}
                            onPress={() => handleSubmit()}
                        >
                            <>
                                <ButtonText>{!isSubmitting ? "Entrar" : "Entrando"}</ButtonText>
                                {!isSubmitting ? <ButtonIcon as={LogInIcon} /> : <ButtonSpinner />}
                            </>
                        </Button>
                    </>
                )}
            </Formik>
            <Box>
                <TouchableHighlight
                    onPress={handleRecoverPassword}
                    underlayColor="transparent"
                >
                    <Text
                        textAlign="center"
                        color="$primary500"
                        fontSize={14}
                    >
                        Esqueci minha senha/Primeiro acesso
                    </Text>
                </TouchableHighlight>
            </Box>
        </AuthLayout>

    )
}