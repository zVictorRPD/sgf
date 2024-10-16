import { AppContainer } from '@components/Layout/AppContainer';
import { AppHeader } from '@components/Layout/AppHeader';
import { AlertCircleIcon, Button, ButtonIcon, ButtonSpinner, ButtonText, FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText, Input, InputField, Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger, set, Text, useToast, View, VStack } from '@gluestack-ui/themed';
import { useAuth } from '@hooks/useAuth';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from '@utils/forms/app/fuel';
import { api } from '@services/api';
import { ToastMessage } from '@components/ToastMessage';
import { ChevronDownIcon, SaveIcon } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { IFuelTable } from '@utils/interfaces/fuel';
import { floatToString, formatPumpOdometer, getDateTime, onlyNumbers, stringToDecimals } from '@utils/forms/mask';
import { getDriverByCpf } from '@utils/fetchs/getDriver';
import { useVehicles } from '@hooks/useVehicles';


export function Refuel() {
    const { user } = useAuth();
    const { vehicles } = useVehicles();
    const toast = useToast();
    const [fuels, setFuels] = useState<IFuelTable[]>([]);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmitFuel,
    })


    async function handleSubmitFuel(values: typeof initialValues) {
        try {
            const vehicle = vehicles.find((vehicle) => vehicle.vehicleId === user?.vehicleId);
            const literValue = parseFloat(values.literValue) / 100;
            const literAmount = Number((parseFloat(formik.values.fuelPumpFinalOdometer.replace(",", ".")) - parseFloat(formik.values.fuelPumpInitialOdometer.replace(",", "."))).toFixed(1));
            const amountPaid = Number((literAmount * literValue).toFixed(3));

            let formattedValues = {
                ...values,
                fuelPumpInitialOdometer: values.fuelPumpInitialOdometer.replace(",", "."),
                fuelPumpFinalOdometer: values.fuelPumpFinalOdometer.replace(",", "."),
                amountPaid: amountPaid,
                driverId: null,
                literAmount: literAmount,
                literValue: literValue,
                mileage: parseInt(values.mileage),
                vehicleId: user?.vehicleId,
                plate: vehicle?.plate,
                supplierId: null,
                operationalAssistantId: null,
                supplyDate: getDateTime(),
            } as any;

            if (user.flDriver) {
                const driver = await getDriverByCpf(user.cpf);
                formattedValues.driverId = driver.driverId;
            } else {
                formattedValues.operationalAssistantId = user.userId
            }

            const response = await api.post("/fuel-supply-history/self/supply/save", {
                data: JSON.stringify(formattedValues),
            });
            if (response.data.responseHeader.responseStatus == "ERROR") {
                throw new Error(response.data.responseHeader.message);
            }

            const data = JSON.parse(response.data.data);

            formik.resetForm();

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
            const errorMessage = error.message !== undefined ? error.message : "Ocorreu um erro interno, tente novamente mais tarde";
            toast.show({
                placement: 'top',
                render: ({ id }) => (<ToastMessage
                    id={id}
                    action="error"
                    title="Erro ao registrar abastecimento"
                    description={errorMessage}
                    onClose={() => toast.close(id)}
                />)
            });
        }
    }

    async function getFuel() {
        try {
            const response = await api.get(`fuel-table/list`);
            if (response.data.responseHeader.responseStatus == "ERROR") {
                throw new Error(response.data.responseHeader.message);
            }

            const data = JSON.parse(response.data.data);
            setFuels(data);
        } catch (error: any) {
            const errorMessage = error.message !== undefined ? error.message : "Ocorreu um erro interno, tente novamente mais tarde";
            toast.show({
                placement: 'top',
                render: ({ id }) => (<ToastMessage
                    id={id}
                    action="error"
                    title="Erro ao buscar tipo de combustível"
                    description={errorMessage}
                    onClose={() => toast.close(id)}
                />)
            });
        }
    }

    function handleChangeFuelType(value: string) {
        const fuel = fuels.find((fuel) => fuel.fuelTableId === value);
        if (!fuel) return;
        formik.setFieldValue("literValue", floatToString(fuel.literValue));
    }

    function literAmountValue() {
        if (formik.values.fuelPumpInitialOdometer === "" || formik.values.fuelPumpFinalOdometer === "") return "0";
        if (formik.values.fuelPumpInitialOdometer.length < 6 || formik.values.fuelPumpFinalOdometer.length < 6) return "0";
        if (parseFloat(formik.values.fuelPumpInitialOdometer.replace(",", ".")) > parseFloat(formik.values.fuelPumpFinalOdometer.replace(",", "."))) return "0";

        return (parseFloat(formik.values.fuelPumpFinalOdometer.replace(",", ".")) - parseFloat(formik.values.fuelPumpInitialOdometer.replace(",", "."))).toFixed(1).replace(".", ",");
    }

    useEffect(() => {
        getFuel();
    }, [])

    return (
        <VStack flex={1}>
            <AppHeader title="Abastecer" />
            <AppContainer>
                <VStack
                    gap={16}
                >
                    <FormControl
                        size="lg"
                        isInvalid={formik.errors.fuelTableId && formik.touched.fuelTableId ? true : false}
                    >
                        <FormControlLabel>
                            <FormControlLabelText>Tipo de combustível</FormControlLabelText>
                        </FormControlLabel>
                        <Select
                            onValueChange={(value) => {
                                formik.setFieldValue("fuelTableId", value);
                                handleChangeFuelType(value);
                            }}
                            selectedValue={formik.values.fuelTableId !== "" ? formik.values.fuelTableId : null}
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
                                {formik.errors?.fuelTableId}
                            </FormControlErrorText>
                        </FormControlError>
                    </FormControl>
                    <FormControl
                        size="lg"
                        isInvalid={formik.errors.mileage && formik.touched.mileage ? true : false}
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
                                onChangeText={(value) => formik.setFieldValue("mileage", onlyNumbers(value))}
                                onBlur={formik.handleBlur("mileage")}
                                value={formik.values.mileage}
                            />
                        </Input>
                        <FormControlError>
                            <FormControlErrorIcon
                                fontSize={10}
                                as={AlertCircleIcon}
                            />
                            <FormControlErrorText>
                                {formik.errors?.mileage}
                            </FormControlErrorText>
                        </FormControlError>
                    </FormControl>
                    <FormControl
                        size="lg"
                        isInvalid={formik.errors.fuelPumpInitialOdometer && formik.touched.fuelPumpInitialOdometer ? true : false}
                    >
                        <FormControlLabel>
                            <FormControlLabelText>Hodômetro inicial da bomba</FormControlLabelText>
                        </FormControlLabel>
                        <Input
                            size="xl"
                        >
                            <InputField
                                type="text"
                                placeholder="Hodômetro inicial da bomba"
                                keyboardType="number-pad"
                                autoCapitalize="none"
                                onChangeText={(value) => formik.setFieldValue("fuelPumpInitialOdometer", formatPumpOdometer(value))}
                                onBlur={formik.handleBlur("fuelPumpInitialOdometer")}
                                value={formik.values.fuelPumpInitialOdometer}
                                maxLength={7}
                            />
                        </Input>
                        <FormControlError>
                            <FormControlErrorIcon
                                fontSize={10}
                                as={AlertCircleIcon}
                            />
                            <FormControlErrorText>
                                {formik.errors?.fuelPumpInitialOdometer}
                            </FormControlErrorText>
                        </FormControlError>
                    </FormControl>
                    <FormControl
                        size="lg"
                        isInvalid={formik.errors.fuelPumpFinalOdometer && formik.touched.fuelPumpFinalOdometer ? true : false}
                    >
                        <FormControlLabel>
                            <FormControlLabelText>Hodômetro final da bomba</FormControlLabelText>
                        </FormControlLabel>
                        <Input
                            size="xl"
                            isDisabled={formik.values.fuelPumpInitialOdometer === ""}
                        >
                            <InputField
                                type="text"
                                placeholder="Hodômetro final da bomba"
                                keyboardType="number-pad"
                                autoCapitalize="none"
                                onChangeText={(value) => formik.setFieldValue("fuelPumpFinalOdometer", formatPumpOdometer(value))}
                                onBlur={formik.handleBlur("fuelPumpFinalOdometer")}
                                value={formik.values.fuelPumpFinalOdometer}
                                maxLength={7}
                            />
                        </Input>
                        <FormControlError>
                            <FormControlErrorIcon
                                fontSize={10}
                                as={AlertCircleIcon}
                            />
                            <FormControlErrorText>
                                {formik.errors?.fuelPumpFinalOdometer}
                            </FormControlErrorText>
                        </FormControlError>
                    </FormControl>
                    <FormControl
                        size="lg"
                        isInvalid={formik.errors.literValue && formik.touched.literValue ? true : false}

                    >
                        <FormControlLabel>
                            <FormControlLabelText>Quantidade abastecida</FormControlLabelText>
                        </FormControlLabel>
                        <Input
                            size="xl"
                            isDisabled
                        >
                            <InputField
                                type="text"
                                keyboardType="number-pad"
                                autoCapitalize="none"
                                value={literAmountValue()}
                            />
                        </Input>
                        <FormControlError>
                            <FormControlErrorIcon
                                fontSize={10}
                                as={AlertCircleIcon}
                            />
                            <FormControlErrorText>
                                {formik.errors?.literValue}
                            </FormControlErrorText>
                        </FormControlError>
                    </FormControl>
                    <FormControl
                        size="lg"
                        isInvalid={formik.errors.literValue && formik.touched.literValue ? true : false}

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
                                onChangeText={formik.handleChange("literValue")}
                                onBlur={formik.handleBlur("literValue")}
                                value={stringToDecimals(formik.values.literValue)}
                            />
                        </Input>
                        <FormControlError>
                            <FormControlErrorIcon
                                fontSize={10}
                                as={AlertCircleIcon}
                            />
                            <FormControlErrorText>
                                {formik.errors?.literValue}
                            </FormControlErrorText>
                        </FormControlError>
                    </FormControl>

                    <Button
                        size="md"
                        variant="solid"
                        action="primary"
                        gap={8}
                        isDisabled={formik.isSubmitting}
                        onPress={
                            () => formik.handleSubmit()
                        }
                    >
                        <>
                            <ButtonText>{!formik.isSubmitting ? "Salvar" : "Salvando"}</ButtonText>
                            {!formik.isSubmitting ? <ButtonIcon as={SaveIcon} /> : <ButtonSpinner />}
                        </>
                    </Button>
                </VStack>

            </AppContainer>
        </VStack >
    );
}