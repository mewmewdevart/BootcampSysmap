import React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface CategoryCardProps {
  uri: string;
  title: string;
  onPress: () => void;
  isActive?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ uri, title, onPress, isActive = false }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri }}
        style={[styles.image, isActive ? styles.activeImage : null]}
      />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 70,
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: 61,
    height: 61,
    borderRadius: 100,
  },
  activeImage: {
    borderWidth: 5,
    borderColor: '#00BC7D',
  },
  title: {
    width: '100%',
    fontSize: 20,
    fontFamily: 'DMSans_400Regular',
    marginVertical: 8,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default CategoryCard;
