import { AppContainer } from '@components/Layout/AppContainer';
import { AppHeader } from '@components/Layout/AppHeader';
import { AlertCircleIcon, Button, ButtonIcon, ButtonSpinner, ButtonText, FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText, Input, InputField, Text, useToast, View, VStack } from '@gluestack-ui/themed';
import { useAuth } from '@hooks/useAuth';
import { Formik } from 'formik';
import { initialValues, validationSchema } from '@utils/forms/app/fuel';
import { api } from '@services/api';
import { ToastMessage } from '@components/ToastMessage';
import { SaveIcon } from 'lucide-react-native';

export function Refuel() {
    const { user } = useAuth();
    const toast = useToast();

    async function handleSubmitFuel(values: typeof initialValues) {
        try {
            console.log(values);
            
            return;
            const response = await api.post("/login", {
                data: JSON.stringify(values),
            });
            if (!response.data) throw new Error();

            if (response.data.responseHeader.responseStatus == "ERROR") {
                throw new Error(response.data.responseHeader.message);
            }

            const data = JSON.parse(response.data.data);

            toast.show({
                placement: 'top',
                render: ({ id }) => (<ToastMessage
                    id={id}
                    action="success"
                    title="Abastecimento registrado com sucesso"
                    onClose={() => toast.close(id)}
                />)
            });

        } catch (error: any) {
            toast.show({
                placement: 'top',
                render: ({ id }) => (<ToastMessage
                    id={id}
                    action="error"
                    title="Erro ao registrar abastecimento"
                    description={error?.message || "Ocorreu um erro interno, tente novamente mais tarde"}
                    onClose={() => toast.close(id)}
                />)
            });
        }
    }

    return (
        <VStack flex={1}>
            <AppHeader title="Abastecer" />
            <AppContainer>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmitFuel}
                    validationSchema={validationSchema}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                        <VStack
                            gap={16}
                        >
                            <FormControl
                                size="lg"
                                isInvalid={errors.carKm && touched.carKm ? true : false}
                            >
                                <FormControlLabel>
                                    <FormControlLabelText>Quilometragem</FormControlLabelText>
                                </FormControlLabel>
                                <Input
                                    size="xl"
                                >
                                    <InputField
                                        type="text"
                                        placeholder="Digite a quilometragem do veículo"
                                        keyboardType="number-pad"
                                        autoCapitalize="none"
                                        onChangeText={handleChange("carKm")}
                                        onBlur={handleBlur("carKm")}
                                        value={values.carKm}
                                    />
                                </Input>
                                <FormControlError>
                                    <FormControlErrorIcon
                                        fontSize={10}
                                        as={AlertCircleIcon}
                                    />
                                    <FormControlErrorText>
                                        {errors?.carKm}
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
                                    <ButtonText>{!isSubmitting ? "Salvar" : "Salvando"}</ButtonText>
                                    {!isSubmitting ? <ButtonIcon as={SaveIcon} /> : <ButtonSpinner />}
                                </>
                            </Button>
                        </VStack>
                    )}
                </Formik>
            </AppContainer>
        </VStack>
    );
}