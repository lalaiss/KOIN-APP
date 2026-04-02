import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { styles } from '../_styles/homeStyles';

const STORAGE_KEY = '@koin_app:user_profile';

export default function ConfigScreen() {
  const router = useRouter();
  const [name, setName] = useState('Jered Silva');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [savedName, setSavedName] = useState('');

  useEffect(() => {
    async function loadProfile() {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (!json) return;
      try {
        const data = JSON.parse(json);
        if (data.name) setName(data.name);
        if (data.avatarUrl) setAvatarUrl(data.avatarUrl);
        setSavedName(data.name || '');
      } catch {
        // ignore
      }
    }
    loadProfile();
  }, []);

  const saveProfile = async () => {
    const data = { name: name.trim() || 'Usuário', avatarUrl: avatarUrl.trim() };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setSavedName(data.name);
    router.push('/explore');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: 50 }]}>
          <View style={styles.transacaoHeader}>
            <Text style={styles.transacaoTitle}>Configurações</Text>
            <Text style={styles.transacaoSubtitle}>Atualize seu perfil</Text>
          </View>

          <View style={{ alignItems: 'center', marginBottom: 24 }}>
            {avatarUrl ? (
              <Image
                source={{ uri: avatarUrl }}
                style={{ width: 96, height: 96, borderRadius: 48, marginBottom: 12 }}
              />
            ) : (
              <View
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: 48,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 12,
                }}
              >
                <Text style={{ color: '#A0A0A0' }}>Sem foto</Text>
              </View>
            )}
            <Text style={{ color: '#A0A0A0', fontSize: 12 }}>URL de foto de perfil</Text>
          </View>

          <Text style={styles.formLabel}>Nome do usuário</Text>
          <TextInput
            style={styles.input}
            value={name}
            placeholder="Digite seu nome"
            placeholderTextColor="#A0A0A0"
            onChangeText={setName}
          />

          <Text style={styles.formLabel}>URL da foto</Text>
          <TextInput
            style={styles.input}
            value={avatarUrl}
            placeholder="https://exemplo.com/avatar.jpg"
            placeholderTextColor="#A0A0A0"
            onChangeText={setAvatarUrl}
          />

          <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8} onPress={saveProfile}>
            <LinearGradient colors={['#181E52', '#1932B3']} style={styles.buttonGradient}>
              <Text style={styles.primaryButtonText}>Salvar Configurações</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.6} onPress={() => router.push('/explore')}>
            <Text style={styles.secondaryButtonText}>Voltar</Text>
          </TouchableOpacity>

          {savedName ? (
            <Text style={{ color: '#A0A0A0', marginTop: 24 }}>Perfil salvo: {savedName}</Text>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
