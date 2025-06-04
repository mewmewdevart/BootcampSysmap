import CategoryCard from '@/components/molecules/CategoryCard';
import { ActivityType } from '@/context/ActivitiesContext';
import { RootStackParamList } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NotePencil } from 'phosphor-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CategorySectionProps {
  data: ActivityType[];
  title: string;
  haveBtn?: boolean;
  onSelectCategory?: (id: string) => void;
  selectedCategory?: string;
}

const CategorySection: React.FC<CategorySectionProps> = ({ data, title, haveBtn = false, onSelectCategory, selectedCategory }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {haveBtn ? (
          <TouchableOpacity onPress={() => console.log('Btn category do perfil selecionado')} activeOpacity={0.7}>
            <NotePencil size={24} color="black" />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.cardContainer}>
        {data.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.9}
            onPress={() => {
              if (onSelectCategory) {
                onSelectCategory(item.id);
              } else {
                navigation.navigate('ActivityScreen', {
                  categoryName: item.name,
                });
              }
            }}
            style={[
              styles.cardWrapper,
              selectedCategory === item.id && styles.selectedCard,
            ]}
          >
            <CategoryCard
              uri={item.image}
              title={item.name}
              onPress={() => {
                if (onSelectCategory) {
                  onSelectCategory(item.id);
                } else {
                  navigation.navigate('ActivityScreen', {
                    categoryName: item.name,
                  });
                }
              }}
              isActive={selectedCategory === item.id}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'BebasNeue_400Regular',
  },
  cardContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 15,
    rowGap: 15,
  },
  cardWrapper: {
    borderRadius: 8,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: 'green',
  },
});

export default CategorySection;
