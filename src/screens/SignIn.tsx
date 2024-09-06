import { AlertCircleIcon, Box, Button, ButtonIcon, ButtonSpinner, ButtonText, FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText, Heading, HStack, Image, ImageBackground, Input, InputField, ScrollView, Text, VStack } from "@gluestack-ui/themed"
import loginBg from "@assets/login-bg.png"
import logo from "@assets/logo.png"
import { LogIn } from "lucide-react-native"

export function SignIn() {
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
                                    <Heading color="$white">Login</Heading>
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

                                <FormControl>
                                    <FormControlLabel>
                                        <FormControlLabelText>Senha</FormControlLabelText>
                                    </FormControlLabel>
                                    <Input>
                                        <InputField
                                            type="password"
                                            placeholder="Digite sua senha"
                                            secureTextEntry
                                            autoCapitalize="none"
                                        />
                                    </Input>
                                    <FormControlError>
                                        <FormControlErrorIcon
                                            fontSize={10}
                                            as={AlertCircleIcon}
                                        />
                                        <FormControlErrorText>
                                            Digite uma senha válida
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
                                        <ButtonText>{true ? "Entrar" : "Entrando" }</ButtonText>
                                        {true ?  <ButtonIcon as={LogIn} /> : <ButtonSpinner /> }
                                    </>
                                </Button>
                                <Box>
                                    <Text textAlign="center" color="$primary500" fontSize={14}>
                                        Esqueci minha senha/Primeiro acesso
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