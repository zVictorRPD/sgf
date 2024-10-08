import { AppContainer } from "@components/Layout/AppContainer";
import { AppHeader } from "@components/Layout/AppHeader";
import { ToastMessage } from "@components/ToastMessage";
import { AlertCircleIcon, ButtonSpinner, ChevronDownIcon, FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText, Input, Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger, VStack } from "@gluestack-ui/themed";
import { Text, Center, Button, ButtonText, useToast } from "@gluestack-ui/themed";
import { initialValues, validationSchema } from "@utils/forms/app/checkOut";
import * as ImagePicker from 'expo-image-picker';
import { Formik } from "formik";
import { useVehicles } from '@hooks/useVehicles';
import { onlyNumbers, renderVehicleLabel } from "@utils/forms/mask";
import { useAuth } from "@hooks/useAuth";
import { ButtonIcon } from "@gluestack-ui/themed";
import { SaveIcon } from "lucide-react-native";
import { InputField } from "@gluestack-ui/themed";
import { getDriverByCpf } from "@utils/fetchs/getDriver";
import { api } from "@services/api";

export function CheckOut() {
    const toast = useToast();
    const { user, updateUser } = useAuth();
    const { vehicles } = useVehicles();

    async function handleSubmitCheckOut(values: typeof initialValues) {
        try {
            const driver = await getDriverByCpf(user.cpf);

            const valuesToSend = {
                ...values,
                mileage: parseInt(values.mileage),
                driverId: driver.driverId,
                eventHistory: {
                    historicalEventId: "3",
                    description: null,
                    display: null,
                    criticality: null,
                    flAvailable: false,
                    flPreviewAvailable: false
                }
            }

            const response = await api.post("/check-out/control/check-out", {
                data: JSON.stringify(valuesToSend),
            });

            if (response.data.responseHeader.responseStatus == "ERROR") {
                throw new Error(response.data.responseHeader.message);
            }

            const data = JSON.parse(response.data.data);

            updateUser({
                ...user,
                checkedIn: false,
                vehicleId: "",
            });

            toast.show({
                placement: 'top',
                render: ({ id }) => (<ToastMessage
                    id={id}
                    action="success"
                    title="Check-out registrado"
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
                    title="Erro ao registrar check-out"
                    description={errorMessage}
                    onClose={() => toast.close(id)}
                />)
            });
        }
    }

    const selectedVehicle = vehicles.find((vehicle) => vehicle.vehicleId === user.vehicleId) || null;

    return (
        <>
            <AppHeader title="Check-out" />
            <AppContainer>
                <Formik
                    initialValues={{
                        ...initialValues,
                        vehicleId: user.vehicleId || "",
                        plate: selectedVehicle?.plate || "",
                    }}
                    onSubmit={handleSubmitCheckOut}
                    validationSchema={validationSchema}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting, setFieldValue }) => (
                        <VStack
                            gap={16}
                        >
                            <FormControl
                                size="lg"
                                isInvalid={errors.vehicleId && touched.vehicleId ? true : false}
                            >
                                <FormControlLabel>
                                    <FormControlLabelText>Veículo</FormControlLabelText>
                                </FormControlLabel>
                                <Select
                                    selectedValue={values.vehicleId}
                                    initialLabel={selectedVehicle ? renderVehicleLabel(selectedVehicle) : "Selecione um veículo"}
                                    isDisabled
                                >
                                    <SelectTrigger variant="outline" size="xl" >
                                        <SelectInput placeholder="Selecione um veículo" />
                                        <SelectIcon as={ChevronDownIcon} style={{ marginRight: 6 }} />
                                    </SelectTrigger>
                                    <SelectPortal>
                                        <SelectBackdrop />
                                        <SelectContent>
                                            <SelectDragIndicatorWrapper>
                                                <SelectDragIndicator />
                                            </SelectDragIndicatorWrapper>
                                            {vehicles.map((vehicle) => (
                                                <SelectItem
                                                    key={vehicle.vehicleId}
                                                    label={renderVehicleLabel(vehicle)}
                                                    value={vehicle.vehicleId}
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
                                        {errors?.vehicleId}
                                    </FormControlErrorText>
                                </FormControlError>
                            </FormControl>
                            <FormControl
                                size="lg"
                                isInvalid={errors.mileage && touched.mileage ? true : false}
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
                                        onChangeText={(value) => setFieldValue("mileage", onlyNumbers(value))}
                                        onBlur={handleBlur("mileage")}
                                        value={values.mileage}
                                    />
                                </Input>
                                <FormControlError>
                                    <FormControlErrorIcon
                                        fontSize={10}
                                        as={AlertCircleIcon}
                                    />
                                    <FormControlErrorText>
                                        {errors?.mileage}
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
        </>
    );
}