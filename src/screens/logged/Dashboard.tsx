import { AppContainer } from '@components/Layout/AppContainer';
import { AppHeader } from '@components/Layout/AppHeader';
import { Box, FormControl, FormControlLabel, FormControlLabelText, Heading, HStack, Icon, Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger, Text, VStack } from '@gluestack-ui/themed';
import { useAuth } from '@hooks/useAuth';
import { useVehicles } from '@hooks/useVehicles';
import { IVehicle } from '@utils/interfaces/vehicle';
import { Building2Icon, ChevronDownIcon, User2Icon, UserRoundCogIcon } from 'lucide-react-native';



export function Dashboard() {
    const { user, setUser } = useAuth();
    const { vehicles, isLoadingVehicles, loadVehicles } = useVehicles();

    const disableVehicleSelect = isLoadingVehicles || !user.operationalBaseId;

    function handleChangeOperationalBase(operationalBaseId: string) {
        loadVehicles(operationalBaseId);
        setUser((prev) => ({
            ...prev,
            operationalBaseId,
            vehicleId: ""
        }));
    }

    function renderVehicleLabel(vehicle: IVehicle) {
        return `${vehicle.brand.name || "marca não informada"} - ${vehicle.vehicleModel.model || "modelo não informado"} - ${vehicle.plate || "placa não informada"}`;
    }

    return (
        <VStack flex={1}>
            <AppHeader title="Dashboard" />
            <AppContainer>
                <Heading
                    size="lg"
                    color="$gray900"
                    pb={"$2"}
                    mb={"$4"}
                    textAlign='center'
                >
                    Dados Gerais
                </Heading>
                <HStack gap={"$3"} px="$2" alignItems='center'>
                    <Icon flexShrink={0} as={User2Icon} size={"lg"} color="$blue600" />
                    <Box flex={1}>
                        <Text fontSize={"$lg"}>{user.name}</Text>
                    </Box>
                </HStack>
                <Box borderBottomColor='$blueGray300' borderBottomWidth={1} my={"$4"} />
                {user?.profile?.description && (
                    <>
                        <HStack gap={"$3"} px="$2" alignItems='center'>
                            <Icon flexShrink={0} as={UserRoundCogIcon} size={"lg"} color="$blue600" />
                            <Box flex={1}>
                                <Text fontSize={"$lg"}>{user.profile.description}</Text>
                            </Box>
                        </HStack>
                        <Box borderBottomColor='$blueGray300' borderBottomWidth={1} my={"$4"} />
                    </>
                )}
                <HStack gap={"$3"} px="$2" alignItems='center'>
                    <Icon flexShrink={0} as={Building2Icon} size={"lg"} color="$blue600" />
                    <Box flex={1}>
                        <Text fontSize={"$lg"}>
                            {user?.company?.fantasyName || ""}
                        </Text>
                    </Box>
                </HStack>
                <Box borderBottomColor='$blueGray300' borderBottomWidth={1} my={"$4"} />
                <Heading
                    size="lg"
                    color="$gray900"
                    pb={"$2"}
                    mb={"$4"}
                    textAlign='center'
                >
                    Veículo
                </Heading>
                <FormControl size="lg" marginBottom={"$4"}>
                    <FormControlLabel>
                        <FormControlLabelText>Base operacional</FormControlLabelText>
                    </FormControlLabel>
                    <Select
                        onValueChange={handleChangeOperationalBase}
                        selectedValue={user.operationalBaseId}
                    >
                        <SelectTrigger variant="outline" size="lg" >
                            <SelectInput placeholder="Selecione uma base" />
                            <SelectIcon as={ChevronDownIcon} style={{ marginRight: 6 }} />
                        </SelectTrigger>
                        <SelectPortal>
                            <SelectBackdrop />
                            <SelectContent>
                                <SelectDragIndicatorWrapper>
                                    <SelectDragIndicator />
                                </SelectDragIndicatorWrapper>
                                {user.relationshipUserOperationalBases.map((relationship) => (
                                    <SelectItem
                                        key={relationship.operationalBase.operationalBaseId}
                                        label={relationship.operationalBase.description}
                                        value={relationship.operationalBase.operationalBaseId}
                                    />
                                ))}
                            </SelectContent>
                        </SelectPortal>
                    </Select>
                </FormControl>
                <FormControl size="lg">
                    <FormControlLabel>
                        <FormControlLabelText>Veículos</FormControlLabelText>
                    </FormControlLabel>
                    <Select
                        onValueChange={(vehicleId) => setUser((prev) => ({ ...prev, vehicleId }))}
                        selectedValue={user?.vehicleId || null}
                        isDisabled={disableVehicleSelect}
                    >
                        <SelectTrigger variant="outline" size="lg" >
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
                </FormControl>


            </AppContainer>
        </VStack>
    );
}