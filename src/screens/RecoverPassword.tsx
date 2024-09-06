import { Alert, AlertCircleIcon, AlertIcon, AlertText, Box, Button, ButtonIcon, ButtonSpinner, ButtonText, FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText, Heading, HStack, Image, ImageBackground, Input, InputField, ScrollView, Text, VStack } from "@gluestack-ui/themed"
import loginBg from "@assets/login-bg.png"
import logo from "@assets/logo.png"
import { InfoIcon, SendIcon } from "lucide-react-native"

export function RecoverPassword() {
    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator
        >
            <VStack flex={1}>
                <ImageBackground flex={1} source={loginBg} alt="logo da sgf">
                    <VStack
                        flex={1}
                        justifyContent="center"
                        alignItems="center"
                        padding={16}
                    >
                        <Box
                            hardShadow="1"
                            w="$full"
                            bg="$white"
                            borderRadius={8}
                        >
                            <HStack
                                p="$3"
                                bg="$primary500"
                                w={"$full"}
                                justifyContent="space-between"
                                alignItems="center"
                                flexWrap="wrap"
                                borderTopLeftRadius={8}
                                borderTopRightRadius={8}
                            >
                                <VStack>
                                    <Heading color="$white">Recuperar senha</Heading>
                                    <Text color="$white" fontSize={14}>
                                        SGF - Sistema de Gestão de Frota
                                    </Text>
                                </VStack>
                                <Image w={46} h={46} source={logo} alt="logo da sgf" />
                            </HStack>
                            <VStack
                                bg="$white"
                                w={"$full"}
                                p={16}
                                gap={16}
                                borderBottomLeftRadius={8}
                                borderBottomRightRadius={8}
                            >
                                {true ? (<>
                                    <Alert action="info" variant="solid" gap={8}>
                                        <AlertIcon as={InfoIcon} />
                                        <AlertText>Informe seu e-mail para receber um link de recuperação de senha.</AlertText>
                                    </Alert>
                                    <FormControl>
                                        <FormControlLabel>
                                            <FormControlLabelText>E-mail</FormControlLabelText>
                                        </FormControlLabel>
                                        <Input>
                                            <InputField
                                                type="text"
                                                placeholder="Digite seu e-mail"
                                                keyboardType="email-address"
                                                autoCapitalize="none"
                                            />
                                        </Input>
                                        <FormControlError>
                                            <FormControlErrorIcon
                                                fontSize={10}
                                                as={AlertCircleIcon}
                                            />
                                            <FormControlErrorText>
                                                Digite um e-mail válido
                                            </FormControlErrorText>
                                        </FormControlError>
                                    </FormControl>

                                    <Button
                                        size="md"
                                        variant="solid"
                                        action="primary"
                                        gap={8}
                                        isDisabled={false}
                                    >
                                        <>
                                            <ButtonText>{true ? "Enviar" : "Enviando"}</ButtonText>
                                            {true ? <ButtonIcon as={SendIcon} /> : <ButtonSpinner />}
                                        </>
                                    </Button>
                                </>
                                ) : (
                                    <>
                                        <Alert action="success" variant="solid" gap={8}>
                                            <AlertIcon as={InfoIcon} />
                                            <AlertText>
                                                Enviamos um e-mail para EMAIL_INFORMADO com instruções para recuperação de senha.
                                                Caso não encontre o e-mail, verifique a caixa de spam ou lixo eletrônico.
                                            </AlertText>
                                        </Alert>
                                        <Button
                                            size="md"
                                            variant="solid"
                                            action="primary"
                                            gap={8}
                                            isDisabled={false}
                                        >
                                            <ButtonText>Tentar novamente</ButtonText>      
                                        </Button>
                                    </>
                                )}

                                <Box>
                                    <Text textAlign="center" color="$primary500" fontSize={14}>
                                        Lembrei minha senha
                                    </Text>
                                </Box>
                            </VStack>
                        </Box>
                    </VStack>
                </ImageBackground>
            </VStack >
        </ScrollView>
    )
}