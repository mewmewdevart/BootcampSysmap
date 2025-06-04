import ButtonComponent from '@/components/atoms/ButtonComponent';
import CategorySection from '@/components/organisms/CategorySection';
import { useActivities } from '@/context/ActivitiesContext';
import { colors } from '@/themes/variables';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'phosphor-react-native';
import React, { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker';
import { Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

const ManagementActivityScreen: React.FC = () => {
  const { addActivity, activityTypes, fetchActivityTypes } = useActivities();

  const [imageUri, setImageUri] = useState<string>(
    'https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png'
  );

  const [activityImage, setActivityImage] = useState<{ uri: string; name: string; type: string } | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [publicActivity, setPublicActivity] = useState(false);
  const [location, setLocation] = useState<{ latitude: number; longitude: number }>({
    latitude: -23.550520,
    longitude: -46.633308,
  });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchActivityTypes().catch((error) =>
      console.error("Erro ao buscar tipos de atividades:", error)
    );
  }, [fetchActivityTypes]);


  const handleChooseImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Toast.show({
        type: 'error',
        text1: 'Permissão negada',
        text2: 'Permita o acesso às fotos para selecionar uma imagem para a atividade.',
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
      const fileObj = { uri: localUri, name: filename, type };

      setActivityImage(fileObj);
      setImageUri(localUri);
    }
  };

  const handleSaveChanges = async () => {
    if (!activityImage) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Selecione uma imagem para a atividade.'
      });
      return;
    }

    const scheduledDate = date.toISOString();
    const activityPrivate = !publicActivity;

    try {
      await addActivity({
        title,
        description,
        typeId: selectedCategory || '',
        scheduledDate,
        private: activityPrivate,
        address: location,
        image: new File([activityImage.uri], activityImage.name, { type: activityImage.type }),
      });
      Toast.show({
        type: 'success',
        text1: 'Atividade Criada',
        text2: 'Sua atividade foi criada com sucesso!'
      });

      setTitle('');
      setDescription('');
      setDate(new Date());
      setPublicActivity(false);
      setLocation({ latitude: -23.550520, longitude: -46.633308 });
      setActivityImage(null);
      setImageUri('https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png');
      setSelectedCategory(null);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Falha ao criar atividade!'
      });
      console.error("Erro ao criar atividade:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={handleChooseImage} style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
        <Camera
          size={32}
          color={colors.dark500}
          style={styles.cameraIcon}
        />
      </TouchableOpacity>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <View style={styles.labelGroup}>
            <Text style={styles.label}>Titulo da atividade</Text>
            <Text style={styles.required}>*</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Ex.: Futebol no parque"
            placeholderTextColor="gray"
            value={title}
            onChangeText={setTitle}
          />
        </View>
        <View style={styles.inputGroup}>
          <View style={styles.labelGroup}>
            <Text style={styles.label}>Descrição</Text>
            <Text style={styles.required}>*</Text>
          </View>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Descreva sua atividade..."
            placeholderTextColor="gray"
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>
        <View style={styles.inputGroup}>
          <View style={styles.labelGroup}>
            <Text style={styles.label}>Data do evento</Text>
            <Text style={styles.required}>*</Text>
          </View>
          {Platform.OS === 'web' ? (
            <ReactDatePicker
              selected={date}
              onChange={(selectedDate: Date | null) => {
                if (selectedDate) {
                  setDate(selectedDate);
                }
              }}
              dateFormat="dd/MM/yyyy"
              className="react-datepicker-input"
            />
          ) : (
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
              <Text style={{ color: 'gray' }}>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>
          )}
          {showDatePicker && Platform.OS !== 'web' && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(_, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setDate(selectedDate);
                }
              }}
            />
          )}
        </View>
        <View style={styles.mapContainer}>
          <View style={styles.labelGroup}>
            <Text style={styles.label}>Ponto de encontro</Text>
            <Text style={styles.required}>*</Text>
          </View>
          <View style={styles.mapPlaceholder}>
            <Text style={{ color: '#333' }}>Componente de mapa</Text>
          </View>
        </View>
        <View style={styles.switchContainer}>
          <View style={styles.labelGroup}>
            <Text style={styles.label}>Visibilidade</Text>
            <Text style={styles.required}>*</Text>
          </View>
          <View style={styles.buttonGroup}>
            <ButtonComponent
              label="Privado"
              variant={publicActivity ? "fullNeutral" : "outlineNeutral"}
              size="large"
              onPress={() => setPublicActivity(true)}
            />
            <ButtonComponent
              label="Público"
              variant={!publicActivity ? "fullNeutral" : "outlineNeutral"}
              size="large"
              onPress={() => setPublicActivity(false)}
            />
          </View>
        </View>
        <CategorySection
          title="Categorias"
          data={activityTypes}
          haveBtn={false}
          onSelectCategory={(id: string) => setSelectedCategory(id)}
        />
        <ButtonComponent
          variant="fullPrimary"
          size="large"
          label="Criar Atividade"
          onPress={handleSaveChanges}
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
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30,
    borderRadius: 20,
    backgroundColor: '#D9D9D940',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 205,
    borderRadius: 20,
    backgroundColor: '#D9D9D940',
  },
  cameraIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -16 }, { translateY: -16 }],
  },
  form: {
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
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
  input: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: 10,
  },
  mapContainer: {
    marginBottom: 20,
  },
  mapPlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#eee',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  switchContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  buttonGroup: {
    flex: 1,
    flexDirection: 'row',
    columnGap: 10,
  },
  reactDatePickerInput: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

export default ManagementActivityScreen;
