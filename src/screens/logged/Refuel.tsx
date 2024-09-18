import { AppContainer } from '@components/Layout/AppContainer';
import { AppHeader } from '@components/Layout/AppHeader';
import { AlertCircleIcon, Button, ButtonIcon, ButtonSpinner, ButtonText, FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText, Input, InputField, Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger, Text, useToast, View, VStack } from '@gluestack-ui/themed';
import { useAuth } from '@hooks/useAuth';
import { Formik } from 'formik';
import { initialValues, validationSchema } from '@utils/forms/app/fuel';
import { api } from '@services/api';
import { ToastMessage } from '@components/ToastMessage';
import { ChevronDownIcon, SaveIcon } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { IFuelTable } from '@utils/interfaces/fuel';
import { floatToString, onlyNumbers, stringToDecimals } from '@utils/forms/mask';
import { getDriverByCpf } from '@utils/fetchs/getDriver';

export function Refuel() {
    const { user } = useAuth();
    const [fuels, setFuels] = useState<IFuelTable[]>([]);
    const toast = useToast();

    async function handleSubmitFuel(values: typeof initialValues) {
        try {
            const driver = await getDriverByCpf(user.cpf);
            console.log(driver);
            
            console.log({
                ...values,
                vehicleId: user?.vehicleId,
                literValue: parseFloat(values.literValue),
            });

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

    async function getFuel() {
        try {
            const response = await api.get(`fuel-table/list`);
            if (!response.data) throw new Error();

            if (response.data.responseHeader.responseStatus == "ERROR") {
                throw new Error(response.data.responseHeader.message);
            }

            const data = JSON.parse(response.data.data);
            setFuels(data);

        } catch (error: any) {
            toast.show({
                placement: 'top',
                render: ({ id }) => (<ToastMessage
                    id={id}
                    action="error"
                    title="Erro ao buscar tipo de combustível"
                    description={error?.message || "Ocorreu um erro interno, tente novamente mais tarde"}
                    onClose={() => toast.close(id)}
                />)
            });
        }
    }

    function handleChangeFuelType(value: string, setFieldValue: any) {
        const fuel = fuels.find((fuel) => fuel.fuelTableId === value);
        if (!fuel) return;
        setFieldValue("literValue", floatToString(fuel.literValue));
    }

    useEffect(() => {
        getFuel();
    }, [])
    return (
        <VStack flex={1}>
            <AppHeader title="Abastecer" />
            <AppContainer>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmitFuel}
                    validationSchema={validationSchema}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting, setFieldValue }) => (
                        <VStack
                            gap={16}
                        >
                            <FormControl
                                size="lg"
                                isInvalid={errors.fuelTableId && touched.fuelTableId ? true : false}
                            >
                                <FormControlLabel>
                                    <FormControlLabelText>Tipo de combustível</FormControlLabelText>
                                </FormControlLabel>
                                <Select
                                    onValueChange={(value) => {
                                        setFieldValue("fuelTableId", value);
                                        handleChangeFuelType(value, setFieldValue);
                                    }}
                                    selectedValue={values.fuelTableId}
                                >
                                    <SelectTrigger variant="outline" size="xl" >
                                        <SelectInput placeholder="Selecione um tipo de combustível" />
                                        <SelectIcon as={ChevronDownIcon} style={{ marginRight: 6 }} />
                                    </SelectTrigger>
                                    <SelectPortal>
                                        <SelectBackdrop />
                                        <SelectContent>
                                            <SelectDragIndicatorWrapper>
                                                <SelectDragIndicator />
                                            </SelectDragIndicatorWrapper>
                                            {fuels.map((fuel) => (
                                                <SelectItem
                                                    key={fuel.fuelTableId}
                                                    label={fuel.fuel.fuel}
                                                    value={fuel.fuelTableId}
                                                />
                                            ))}
                                        </SelectContent>
                                    </SelectPortal>
                                </Select>
                                <FormControlError>
                                    <FormControlErrorIcon
                                        fontSize={10}
                                        as={AlertCircleIcon}
                                    />
                                    <FormControlErrorText>
                                        {errors?.fuelTableId}
                                    </FormControlErrorText>
                                </FormControlError>
                            </FormControl>
                            <FormControl
                                size="lg"
                                isInvalid={errors.milage && touched.milage ? true : false}
                            >
                                <FormControlLabel>
                                    <FormControlLabelText>Quilometragem</FormControlLabelText>
                                </FormControlLabel>
                                <Input
                                    size="xl"
                                >
                                    <InputField
                                        type="text"
                                        placeholder="Quilometragem do veículo"
                                        keyboardType="number-pad"
                                        autoCapitalize="none"
                                        onChangeText={(value) => setFieldValue("milage", onlyNumbers(value))}
                                        onBlur={handleBlur("milage")}
                                        value={values.milage}
                                    />
                                </Input>
                                <FormControlError>
                                    <FormControlErrorIcon
                                        fontSize={10}
                                        as={AlertCircleIcon}
                                    />
                                    <FormControlErrorText>
                                        {errors?.milage}
                                    </FormControlErrorText>
                                </FormControlError>
                            </FormControl>
                            <FormControl
                                size="lg"
                                isInvalid={errors.literAmount && touched.literAmount ? true : false}
                            >
                                <FormControlLabel>
                                    <FormControlLabelText>Quantidade abastecida</FormControlLabelText>
                                </FormControlLabel>
                                <Input
                                    size="xl"
                                >
                                    <InputField
                                        type="text"
                                        placeholder="Quantidade de litros"
                                        keyboardType="number-pad"
                                        autoCapitalize="none"
                                        onChangeText={(value) => setFieldValue("literAmount", onlyNumbers(value))}
                                        onBlur={handleBlur("literAmount")}
                                        value={values.literAmount}
                                    />
                                </Input>
                                <FormControlError>
                                    <FormControlErrorIcon
                                        fontSize={10}
                                        as={AlertCircleIcon}
                                    />
                                    <FormControlErrorText>
                                        {errors?.literAmount}
                                    </FormControlErrorText>
                                </FormControlError>
                            </FormControl>
                            <FormControl
                                size="lg"
                                isInvalid={errors.literValue && touched.literValue ? true : false}

                            >
                                <FormControlLabel>
                                    <FormControlLabelText>Valor do litro</FormControlLabelText>
                                </FormControlLabel>
                                <Input
                                    size="xl"
                                    isDisabled
                                >
                                    <InputField
                                        type="text"
                                        keyboardType="number-pad"
                                        autoCapitalize="none"
                                        onChangeText={handleChange("literValue")}
                                        onBlur={handleBlur("literValue")}
                                        value={stringToDecimals(values.literValue)}
                                    />
                                </Input>
                                <FormControlError>
                                    <FormControlErrorIcon
                                        fontSize={10}
                                        as={AlertCircleIcon}
                                    />
                                    <FormControlErrorText>
                                        {errors?.literValue}
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