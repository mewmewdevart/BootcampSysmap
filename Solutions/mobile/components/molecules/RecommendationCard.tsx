import { CalendarDots } from 'phosphor-react-native';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface RecommendationCardProps {
  uri: string;
  title: string;
  date: string;
  members: number;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ uri, title, date, members }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri }} style={styles.image} />
      <Text style={styles.activityTitle}>{title}</Text>
      <View style={styles.info}>
        <View style={styles.infoItem}>
          <CalendarDots size={20} color="#00BC7D" />
          <Text style={styles.infoText}>{date}</Text>
        </View>
        <View style={styles.infoItemBordered}>
          <CalendarDots size={20} color="#00BC7D" style={{marginLeft: 5}}/>
          <Text style={styles.infoText}>{members}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: 20,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 10,
  },
  activityTitle: {
    fontSize: 16,
    fontFamily: 'DMSans_400Regular',
    marginVertical: 8,
    fontWeight: '600',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
  },
  infoItemBordered: {
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#00BC7D',
    marginLeft: 5,
  },
  infoText: {
    fontSize: 12,
    fontFamily: 'DMSans_400Regular',
    marginLeft: 5,
  },
});

export default RecommendationCard;
