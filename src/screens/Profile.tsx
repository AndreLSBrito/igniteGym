import * as yup from 'yup'
import { useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import { useForm, Controller} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Center, ScrollView, VStack, Skeleton, Text, Heading, useToast} from 'native-base'

import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { useAuth } from '@hooks/useAuth';

type FormProfileProps ={
  name: string;
  email:string;
  password: string;
  newPassword: string;
  newPassword_confirm: string;
}

const PHOTO_SIZE = 33;

const profileSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  password: yup.string().required('Informe a senha.'),
  newPassword: yup.string().required('Informe a nova senha.'),
  newPassword_confirm: yup.string().required('A confirmação da senha não confere')
})

export function Profile(){
  const {user} = useAuth()
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto,setUserPhoto] = useState('https://github.com/Tiotedd.png')
  const { control, handleSubmit, formState:{errors} } = useForm<FormProfileProps>({
    defaultValues: {
      name: user.name,
      email: user.email
    },
    resolver: yupResolver(profileSchema)
  })

  const toast = useToast()

  async function handleUserPhotoSelect(){
    setPhotoIsLoading(true)
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4,4],
        allowsEditing:true,
        selectionLimit:1,
      })
  
      if (photoSelected.canceled) {
        return;
      }

      if(photoSelected.assets[0].uri){
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)
        
        if(photoInfo.exists && (photoInfo.size/1024/1024 ) > 5){
          return toast.show({
            title: 'Essa imagem é muito grande. Escolha uma de até 5MB.',
            placement: 'top',
            bgColor: 'red.500'
          })
        }

        setUserPhoto(photoSelected.assets[0].uri)
      }
      
      
    } catch (error) {
      console.log(error)
    }finally{
      setPhotoIsLoading(false)
    }
  }

  function handleProfileUpdate(data: FormProfileProps){

  }

  return(
    <VStack flex={1}>
      <ScreenHeader title="Perfil"/>

      <ScrollView contentContainerStyle={{paddingBottom: 36}}>
        <Center mt={6} px={10}>
          {
            photoIsLoading ?
              <Skeleton 
                w={PHOTO_SIZE} 
                h={PHOTO_SIZE} 
                rounded="full" 
                startColor="gray.500"
                endColor="gray.400"
    
              />
            :
              <UserPhoto 
                source={{uri: userPhoto}}
                alt="Foto do usuário"
                size={PHOTO_SIZE}
              />
          }

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8}>
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Controller
            control={control}
            name="name"
            render={({field:{value, onChange}}) => (
              <Input
                value={value}
                onChangeText={onChange}
                bg="gray.600"
                placeholder="Nome"
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
          control={control}
          name="email"
          render={({ field: {value}}) => (
            <Input
              bg="gray.600"
              placeholder="Email"
              value={value}
              isDisabled
            />
          )}
          />

          <Heading color="gray.200" fontSize="md" mb={2} alignSelf="flex-start" mt={12} fontFamily="heading">
            Alterar senha
          </Heading>

          <Controller
            control={control}
            name="password"
            render={({field:{ onChange}}) => (
              <Input
                onChangeText={onChange}
                bg="gray.600"
                placeholder="Senha antiga"
                errorMessage={errors.password?.message}
                secureTextEntry
              />
            )}
          />
     
          <Controller
            control={control}
            name="newPassword"
            render={({field:{onChange}}) => (
              <Input
                onChangeText={onChange}
                bg="gray.600"
                placeholder="Senha nova"
                errorMessage={errors.newPassword?.message}
                secureTextEntry
              />
            )}
          />
          <Controller
            control={control}
            name="newPassword_confirm"
            render={({field:{ onChange}}) => (
              <Input
                onChangeText={onChange}
                bg="gray.600"
                placeholder="Confirme a nova senha"
                errorMessage={errors.newPassword_confirm?.message}
                secureTextEntry
              />
            )}
          />

          <Button
            title="Atualizar"
            mt={4}
            onPress={handleSubmit(handleProfileUpdate)}
          />
        </Center>
      </ScrollView>
    </VStack>
  )
}