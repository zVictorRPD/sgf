import { Box, Heading, HStack, Image, ImageBackground, ScrollView, Text, VStack } from "@gluestack-ui/themed";
import { ReactNode } from "react";
import loginBg from "@assets/login-bg.png"
import logo from "@assets/logo.png"

interface IAuthLayoutProps {
    children: ReactNode;
    title: string;
}

export function AuthLayout({ title, children }: IAuthLayoutProps) {
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
                                    <Heading color="$white">{title}</Heading>
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
                                {children}
                            </VStack>
                        </Box>
                    </VStack>
                </ImageBackground>
            </VStack>
        </ScrollView>
    );
}