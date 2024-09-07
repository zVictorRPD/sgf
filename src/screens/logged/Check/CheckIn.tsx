import { ToastMessage } from "@components/ToastMessage";
import { Text, Center, Button, ButtonText, useToast } from "@gluestack-ui/themed";
import * as ImagePicker from 'expo-image-picker';

export function CheckIn() {
    const toast = useToast();

    async function handleUploadImages() {
        const images = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            allowsMultipleSelection: true,
        });
        if (images.canceled) return;

        console.log(images);
        toast.show({
            placement: 'top',
            render: ({ id }) => (<ToastMessage
                id={id}
                title="Envio de imagens"
                description="Imagens enviadas com sucesso"
                onClose={() => toast.close(id)}
            />)
        });
    }
    return (
        <Center flex={1}>
            <Text>CheckIn</Text>
            <Button onPress={handleUploadImages}>
                <ButtonText>Upload Images</ButtonText>
            </Button>
        </Center>
    );
}