import { TouchableOpacity} from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'
import { HStack, Heading, Text, VStack, Icon } from 'native-base';

import { UserPhoto } from './UserPhoto';

import { useAuth } from '@hooks/useAuth';

import defautUserPhotImg from '@assets/userPhotoDefault.png'
import { api } from '@services/api';

export function HomeHeader(){
  const {user, signOut} = useAuth()

  return(
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserPhoto 
        source={
          user.avatar 
          ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}`} 
          : defautUserPhotImg 
        }
        alt="Imagem do usuário"
        size={16}
        mr={4}  
      />

      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>

        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity>
        <Icon
          as={MaterialIcons}
          name="logout" 
          color="gray.200"
          size={7}
          onPress={signOut}
        />

      </TouchableOpacity>
      
    </HStack>
  )
}