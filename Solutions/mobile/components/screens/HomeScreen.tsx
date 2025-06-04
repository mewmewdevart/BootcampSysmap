import ButtonComponent from '@/components/atoms/ButtonComponent';
import ActivitySection from '@/components/organisms/ActivitySection';
import CategorySection from '@/components/organisms/CategorySection';
import HomeHeader from '@/components/organisms/HomeHeader';
import { useActivities } from '@/context/ActivitiesContext';
import { useUser } from '@/context/UserContext';
import { colors } from '@/themes/variables';
import { RootStackParamList } from '@/types/navigation';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Plus } from 'phosphor-react-native';
import React, { useEffect } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';

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
    title: 'Título da atividade 3',
    date: '29/09/2023',
    members: 6,
  },
  {
    uri: 'https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png',
    title: 'Título da atividade 4',
    date: '29/09/2023',
    members: 6,
  },
];

export default function HomeScreen() {
  const { userData } = useUser();
  const { activityTypes, fetchActivityTypes } = useActivities();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    fetchActivityTypes().catch((error) =>
      console.error("Erro ao buscar tipos de atividades:", error)
    );
  }, [fetchActivityTypes]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <HomeHeader 
          userName={userData.name || "Usuário"} 
          points={userData.level || 0} 
          profileImageUri={userData.avatar || "https://example.com/default-profile.png"} 
        />
        <View style={{ paddingHorizontal: 20 }}>
          <ActivitySection 
            data={recommendationsData} 
            typeBtn="text" 
            headerTitle="Suas Recomendações" 
          />
          <CategorySection 
            data={activityTypes} 
            title="Categorias"
          />
        </View>
      </ScrollView>

      <ButtonComponent
        variant="fullPrimary"
        size="large"
        leftIcon={<Plus size={16} color="#FFF" />}
        style={styles.floatingButton}
        onPress={() => navigation.navigate('ManagementActivityScreen')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral00,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 100,
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 999,
    ...Platform.select({
      web: {
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      },
      default: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
    }),
  },
});
