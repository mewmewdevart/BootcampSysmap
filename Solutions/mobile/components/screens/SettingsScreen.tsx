import ButtonComponent from '@/components/atoms/ButtonComponent';
import { useActivities } from '@/context/ActivitiesContext';
import { useUser } from '@/context/UserContext';
import { colors } from '@/themes/variables';
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'phosphor-react-native';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Toast from 'react-native-toast-message';
import CategorySection from '../organisms/CategorySection';

const SettingsScreen: React.FC = () => {
  const { userData, fetchUserData, updateUserData, updateUserAvatar, deactivateAccount, logout } = useUser();
  const { activityTypes, fetchActivityTypes } = useActivities();
  const navigation = useNavigation();

  const [profileImage, setProfileImage] = useState<string>(userData.avatar || '');
  const [fullName, setFullName] = useState<string>(userData.name || '');
  const [email, setEmail] = useState<string>(userData.email || '');
  const [password, setPassword] = useState<string>('');
  const [cpf, setCpf] = useState<string>(userData.cpf || '');

  useEffect(() => {
    if (!userData.name) {
      fetchUserData().catch((error) => {
        console.error("Erro ao carregar dados do usuário:", error);
      });
    } else {
      setProfileImage(userData.avatar || '');
      setFullName(userData.name || '');
      setEmail(userData.email || '');
      setCpf(userData.cpf || '');
      setPassword(''); 
    }
  }, [userData, fetchUserData]);

  useEffect(() => {
    fetchActivityTypes().catch((error) =>
      console.error("Erro ao buscar tipos de atividades:", error)
    );
  }, [fetchActivityTypes]);

  const handleChooseProfileImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Toast.show({
        type: 'error',
        text1: 'Permissão negada',
        text2: 'Permita o acesso às fotos para alterar sua foto de perfil.',
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const localUri = result.assets[0].uri;
      const filename = localUri.split('/').pop() || '';
      const type = filename.endsWith('.png') ? 'image/png' : 'image/jpeg';
      const imageFile = new File([await (await fetch(localUri)).blob()], filename, { type });

      try {
        await updateUserAvatar(imageFile);
        setProfileImage(localUri);
        Toast.show({
          type: 'success',
          text1: 'Avatar atualizado',
          text2: 'Sua foto de perfil foi atualizada com sucesso!',
        });
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Erro ao atualizar',
          text2: 'Não foi possível atualizar sua foto de perfil.',
        });
        console.error("Error updating avatar:", error);
      }
    }
  };

  const handleSaveChanges = async () => {
    const updatedName = fullName.trim() !== '' ? fullName : userData.name;
    const updatedEmail = email.trim() !== '' ? email : userData.email;
    const updatedPassword = password.trim() !== '' ? password : undefined;

    try {
      await updateUserData({ 
        name: updatedName || undefined, 
        email: updatedEmail || undefined, 
        password: updatedPassword 
      });
      Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: 'Dados atualizados com sucesso!'
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Falha ao atualizar os dados!'
      });
      console.error("Erro ao salvar alterações:", error);
    }
  };

  const handleDeactivateAccount = async () => {
    try {
      await deactivateAccount();
      Toast.show({
        type: 'success',
        text1: 'Conta desativada',
        text2: 'Sua conta foi desativada com sucesso!',
      });

      await logout(() => {
        navigation.reset({ index: 0, routes: [{ name: "LoginScreen" }] });
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: error.message || 'Falha ao desativar a conta!',
      });
      console.error("Erro ao desativar a conta:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={handleChooseProfileImage} style={styles.profileImageContainer}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
        <Camera
          size={32}
          color={colors.dark500}
          style={{
            position: 'absolute',
            bottom: '38%',
            left: '50%',
            transform: [{ translateX: -16 }],
          }}
        />
      </TouchableOpacity>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <View style={styles.labelGroup}>
            <Text style={styles.label}>Nome completo</Text>
            <Text style={styles.required}>*</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Nome completo"
            placeholderTextColor="gray"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>

        <View style={styles.inputGroup}>
        <View style={styles.inputGroup}>
          <View style={styles.labelGroup}>
            <Text style={styles.label}>CPF</Text>
            <Text style={styles.required}>*</Text>
          </View>
          <TextInput
            style={[styles.input, styles.disabledInput]}
            placeholder="CPF"
            placeholderTextColor="gray"
            value={cpf}
            editable={false}
          />
        </View>
          <View style={styles.labelGroup}>
            <Text style={styles.label}>E-mail</Text>
            <Text style={styles.required}>*</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="gray"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.labelGroup}>
            <Text style={styles.label}>Senha</Text>
            <Text style={styles.required}>*</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="gray"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <CategorySection
            data={activityTypes} 
            title="Categorias"
          />

        <ButtonComponent
          variant="fullPrimary"
          size="large"
          label="Salvar Alterações"
          onPress={handleSaveChanges}
        />

        <ButtonComponent
          variant="ghost"
          size="large"
          label="Desativar Conta"
          onPress={handleDeactivateAccount}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  form: {},
  inputGroup: {
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  disabledInput: {
    backgroundColor: '#f5f5f5',
  },
  labelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'DMSans_400Regular',
  },
  required: {
    fontSize: 16,
    color: 'red',
    marginLeft: 5,
  },
});

export default SettingsScreen;
