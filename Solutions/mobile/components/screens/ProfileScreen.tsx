import ActivitySection from '@/components/organisms/ActivitySection';
import { useUser } from '@/context/UserContext';
import { colors } from '@/themes/variables';
import React, { useEffect } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

interface ProfileScreenProps {
  userName: string;
  profileImageUri: string;
}

const recommendationsData = [
  {
    uri: 'https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png',
    title: 'Título da atividade 1',
    date: '28/09/2023',
    members: 4,
  },
  {
    uri: 'https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png',
    title: 'Título da atividade 2',
    date: '29/09/2023',
    members: 6,
  },
  {
    uri: 'https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png',
    title: 'Título da atividade 2',
    date: '29/09/2023',
    members: 6,
  },
  {
    uri: 'https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png',
    title: 'Título da atividade 2',
    date: '29/09/2023',
    members: 6,
  },
];

const ProfileScreen: React.FC<ProfileScreenProps> = ({
  userName = "Nome!",
  profileImageUri = "https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png",
}) => {
  const { userData, fetchUserData } = useUser();

  useEffect(() => {
    if (!userData?.name) {
      fetchUserData().catch((error) =>
        console.error("Erro ao carregar dados do usuário:", error)
      );
    }
  }, []);

  if (!userData || !userData.name) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00BC7D" />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: userData.avatar || 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'
          }} style={styles.profileImage} />
        <Text style={styles.userName}>{userData.name || 'Nome Inválido'}</Text>
      </View>

      <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        <View style={{ backgroundColor: '#EDEDED', padding: 20, width: '100%', borderRadius: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text> Seu nivel é</Text>
            <Text style={{ fontSize: 25, fontWeight: 700, fontFamily: 'DMSans_400Regular' }}> {userData.level ?? 0}</Text>
          </View>

          <Image
            source={require('@/assets/images/trophy.png')}
            style={{
              width: 152,
            }}
            resizeMode="contain"
          />
        </View>

      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <ActivitySection
          data={recommendationsData}
          headerTitle="Suas atividades"
          typeBtn="dropdown"
        />

        <ActivitySection
          data={recommendationsData}
          headerTitle="Histórico de Atividades"
          typeBtn="none"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: colors.primary500,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: 30,
  },
  profileImage: {
    width: 104,
    height: 104,
    borderRadius: 50,
    marginBottom: 15,
  },
  userName: {
    fontSize: 28,
    color: 'black',
    fontFamily: 'DMSans_400Regular',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default ProfileScreen;