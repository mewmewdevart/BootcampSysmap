import { colors } from '@/themes/variables';
import { RootStackParamList } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface HomeHeaderProps {
  userName: string;
  points: number;
  profileImageUri: string;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ userName, points, profileImageUri }) => {
  const navigation =
  useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <Text style={styles.headerTitle}>Olá, Seja Bem-Vindo</Text>
        <Text style={styles.headerUserName}>{userName}</Text>
      </View>
      <View style={styles.headerActions}>
        <View style={styles.points}>
          <Text style={styles.pointsText}>{points} ⭐</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProfileScreen', { userName, profileImageUri })}
          activeOpacity={0.7}
        >
          <Image source={{ uri: profileImageUri }} style={styles.profileImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary500,
    padding: 20,
    width: '100%',
    height: 137,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'DMSans_400Regular',
    fontWeight: '500',
  },
  headerUserName: {
    fontSize: 30,
    color: '#fff',
    fontFamily: 'DMSans_400Regular',
    fontWeight: '500',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  points: {
    width: 52,
    height: 33,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.neutral00,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointsText: {
    color: '#fff',
  },
  profileImage: {
    width: 58,
    height: 58,
    borderRadius: 100,
    marginLeft: 10,
  },
});

export default HomeHeader;
