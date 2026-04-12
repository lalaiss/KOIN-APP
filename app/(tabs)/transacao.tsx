import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#03050B',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    marginBottom: 48,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  optionsContainer: {
    gap: 16,
  },
  optionButton: {
    borderRadius: 16,
    overflow: 'hidden',
    minHeight: 130,
  },
  optionGradient: {
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
});

export default function TransacaoScreen() {
  const router = useRouter();

  const handleNavigate = (rota: string) => {
    router.push(rota as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Movimentações</Text>
          <Text style={styles.subtitle}>Selecione o tipo de transação</Text>
        </View>

        <View style={styles.optionsContainer}>
          {/* Despesas */}
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => handleNavigate('/(tabs)/despesas')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#DC2626', '#991B1B']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.optionGradient}
            >
              <View style={styles.iconContainer}>
                <Feather name="arrow-down" size={28} color="#FFFFFF" />
              </View>
              <Text style={styles.optionTitle}>Despesas</Text>
              <Text style={styles.optionDescription}>
                Registre seus gastos
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Receitas */}
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => handleNavigate('/(tabs)/receitas')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#16A34A', '#15803D']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.optionGradient}
            >
              <View style={styles.iconContainer}>
                <Feather name="arrow-up" size={28} color="#FFFFFF" />
              </View>
              <Text style={styles.optionTitle}>Receitas</Text>
              <Text style={styles.optionDescription}>
                Registre seus ganhos
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Investimentos */}
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => handleNavigate('/(tabs)/investimentos')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#2563EB', '#1D4ED8']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.optionGradient}
            >
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name="trending-up"
                  size={28}
                  color="#FFFFFF"
                />
              </View>
              <Text style={styles.optionTitle}>Investimentos</Text>
              <Text style={styles.optionDescription}>
                Registre seus aportes
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
