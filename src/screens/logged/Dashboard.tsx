import { AppContainer } from '@components/Layout/AppContainer';
import { AppHeader } from '@components/Layout/AppHeader';
import { Box, FormControl, FormControlLabel, FormControlLabelText, Heading, HStack, Icon, Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger, Text, VStack } from '@gluestack-ui/themed';
import { useAuth } from '@hooks/useAuth';
import { useVehicles } from '@hooks/useVehicles';
import { renderVehicleLabel } from '@utils/forms/mask';
import { Building2Icon, ChevronDownIcon, User2Icon, UserRoundCogIcon } from 'lucide-react-native';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';


export function Dashboard() {
    const { user, updateUser } = useAuth();
    const { vehicles, isLoadingVehicles, loadVehicles } = useVehicles();
    const [isFocus, setIsFocus] = useState(false);


    const disableVehicleSelect = isLoadingVehicles || !user.operationalBaseId || user.checkedIn;

    function handleChangeOperationalBase(operationalBaseId: string) {
        loadVehicles(operationalBaseId);
        updateUser({
            ...user,
            operationalBaseId,
            vehicleId: ""
        })
    }

    const data = vehicles.map((vehicle) => ({
        label: renderVehicleLabel(vehicle),
        value: vehicle.vehicleId,
    }));

    const selectedOperationalBase = user.relationshipUserOperationalBases.find((relationship) => relationship.operationalBase.operationalBaseId === user.operationalBaseId) || null;

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
                        isDisabled={user.checkedIn}
                        initialLabel={selectedOperationalBase ? selectedOperationalBase.operationalBase.description : "Selecione uma base"}
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
                    <Dropdown
                        style={[
                            styles.dropdown, 
                            isFocus && { borderColor: 'blue' },
                            disableVehicleSelect && { opacity: 0.4, pointerEvents: 'none'}
                        ]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Selecione um veículo' : '...'}
                        searchPlaceholder="Digite a placa..."
                        value={user?.vehicleId}
                        disable={disableVehicleSelect}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            updateUser({
                                ...user,
                                vehicleId: item.value
                            })
                            setIsFocus(false);
                        }}
                        
                    />
                </FormControl>


            </AppContainer>
        </VStack>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 18,
    },
    selectedTextStyle: {
        fontSize: 18,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});