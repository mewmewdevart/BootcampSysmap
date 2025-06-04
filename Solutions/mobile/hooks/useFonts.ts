import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

export default function useFonts() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'BebasNeue-Regular': require('@/assets/fonts/Bebas_Neue/BebasNeue-Regular.ttf'),
        'DMSans-Regular': require('@/assets/fonts/DM_Sans/static/DMSans-Regular.ttf'),
        'DMSans-Bold': require('@/assets/fonts/DM_Sans/static/DMSans-Bold.ttf'),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  return fontsLoaded;
}
