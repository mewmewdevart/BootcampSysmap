import ActivitySection from '@/components/organisms/ActivitySection';
import CategorySection from '@/components/organisms/CategorySection';
import { useActivities } from '@/context/ActivitiesContext';
import { RootStackParamList } from '@/types/navigation';
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

type ActivityScreenRouteProp = RouteProp<RootStackParamList, 'ActivityScreen'>;

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

const ActivityScreen = () => {
  const route = useRoute<ActivityScreenRouteProp>();
  const { categoryName } = route.params;
  const { activityTypes, fetchActivityTypes } = useActivities();

  useEffect(() => {
    fetchActivityTypes().catch((error) =>
      console.error("Erro ao buscar tipos de atividades:", error)
    );
  }, [fetchActivityTypes]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <CategorySection data={activityTypes} title="Categorias" />
      <ActivitySection
        data={recommendationsData}
        headerTitle="Suas atividades"
        typeBtn="dropdown"
      />
      <ActivitySection
        data={recommendationsData}
        headerTitle="Atividades da comunidade"
        typeBtn="none"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  contentContainer: {
    paddingBottom: 20,
  },
});

export default ActivityScreen;
