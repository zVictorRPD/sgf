import {
    ToastDescription,
    ToastTitle,
    Toast,
    Pressable,
    Icon,
    VStack,
    HStack,
} from '@gluestack-ui/themed'
import { X } from 'lucide-react-native'

type Props = {
    id: string
    title: string
    description?: string
    action?: 'error' | 'success'
    onClose: () => void
}

export function ToastMessage({
    id,
    title,
    description,
    action = 'success',
    onClose,
}: Props) {
    return (
        <Toast
            nativeID={`toast-${id}`}
            action={action}
            bgColor={action === 'success' ? '$green600' : '$red600'}
            mt="$10"
        >
            <VStack space="xs" w="$full">
                <HStack justifyContent='space-between'>
                    <ToastTitle color="$white" fontFamily="$heading">
                        {title}
                    </ToastTitle>
                    <Pressable alignSelf="flex-end" onPress={onClose}>
                        <Icon as={X} color="$coolGray50" size="md" />
                    </Pressable>
                </HStack>
                {description && (
                    <ToastDescription color="$white" fontFamily="$body">
                        {description}
                    </ToastDescription>
                )}
            </VStack>
        </Toast>
    )
}