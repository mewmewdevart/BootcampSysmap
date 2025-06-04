import RecommendationCard from '@/components/molecules/RecommendationCard';
import { CaretDown, CaretUp } from 'phosphor-react-native';
import React, { useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface RecommendationData {
  uri: string;
  title: string;
  date: string;
  members: number;
}

interface ActivitySectionProps {
  headerTitle?: string;
  data: RecommendationData[];
  typeBtn?: string;
}

const ActivitySection: React.FC<ActivitySectionProps> = ({ data, headerTitle, typeBtn }) => {
  const [expanded, setExpanded] = useState(false);
  const shouldExpand = typeBtn === 'none' ? true : expanded;
  const displayedData = shouldExpand ? data : data.slice(0, 2);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleToggle = () => {
    if (typeBtn !== 'none') {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false, 
      }).start(() => {
        setExpanded(!expanded);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false, 
        }).start();
      });
    }
  };

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>{headerTitle}</Text>
        {typeBtn === "dropdown" ? (
          <TouchableOpacity onPress={handleToggle} activeOpacity={0.7}>
            {expanded ? (
              <CaretUp size={20} color="black" />
            ) : (
              <CaretDown size={20} color="black" />
            )}
          </TouchableOpacity>
        ) : typeBtn === "text" ? (
          <TouchableOpacity onPress={handleToggle} activeOpacity={0.7}>
            <Text style={styles.link}>{expanded ? "Ver menos" : "Ver mais"}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      {data.length === 0 ? (
        <Text style={styles.emptyMessage}>Nenhum item para exibir.</Text>
      ) : (
        <Animated.View style={{ opacity: fadeAnim }}>
          {displayedData.map((item, index) => (
            <RecommendationCard key={index} {...item} />
          ))}
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    width: '100%',
    marginBottom: 20,
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
  link: {
    fontSize: 15,
    fontFamily: 'BebasNeue_400Regular',
  },
  emptyMessage: {
    fontSize: 16,
    fontFamily: 'DMSans_400Regular',
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ActivitySection;
