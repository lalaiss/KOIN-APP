import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
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
    padding: 24,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  formContainer: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#0F1729',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  inputFocused: {
    borderColor: '#2563EB',
  },
  button: {
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
  },
  buttonGradient: {
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cancelButton: {
    backgroundColor: '#1E293B',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9CA3AF',
  },
});

export default function InvestimentosScreen() {
  const router = useRouter();
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipo, setTipo] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleCadastrarInvestimento = async () => {
    if (!valor.trim()) {
      Alert.alert('Erro', 'Por favor, insira o valor do aporte');
      return;
    }

    if (!descricao.trim()) {
      Alert.alert('Erro', 'Por favor, insira a descrição');
      return;
    }

    const valorNumerico = parseFloat(valor.replace(',', '.'));
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      Alert.alert('Erro', 'Por favor, insira um valor válido');
      return;
    }

    setLoading(true);

    try {
      const saldoArmazenado = await AsyncStorage.getItem('saldo_usuario');
      const saldoAtual = saldoArmazenado ? parseFloat(saldoArmazenado) : 0;

      const novoSaldo = saldoAtual - valorNumerico;
      await AsyncStorage.setItem('saldo_usuario', novoSaldo.toString());

      const novaTransacao = {
        id: Date.now(),
        tipo: 'investimento',
        descricao: descricao.trim(),
        valor: valorNumerico,
        tipoInvestimento: tipo.trim() || 'Investimento',
        icon: 'trending-up',
        data: new Date().toLocaleDateString('pt-BR'),
      };

      const transacoesArmazenadas = await AsyncStorage.getItem('transacoes_usuario');
      const transacoes = transacoesArmazenadas ? JSON.parse(transacoesArmazenadas) : [];

      transacoes.unshift(novaTransacao);
      await AsyncStorage.setItem('transacoes_usuario', JSON.stringify(transacoes));

      Alert.alert('Sucesso', 'Investimento registrado com sucesso!');
      router.push({ pathname: '/(tabs)/principal' } as any);
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao registrar o investimento');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Registrar Investimento</Text>
            <Text style={styles.subtitle}>Registre seus aportes de investimento</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Valor do Aporte (R$)</Text>
              <TextInput
                style={[
                  styles.input,
                  focusedField === 'valor' && styles.inputFocused,
                ]}
                value={valor}
                placeholder="0,00"
                keyboardType="numeric"
                placeholderTextColor="#6B7280"
                onChangeText={setValor}
                onFocus={() => setFocusedField('valor')}
                onBlur={() => setFocusedField(null)}
                editable={!loading}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Descrição</Text>
              <TextInput
                style={[
                  styles.input,
                  focusedField === 'descricao' && styles.inputFocused,
                ]}
                value={descricao}
                placeholder="Ex: Aporte mensal"
                placeholderTextColor="#6B7280"
                onChangeText={setDescricao}
                onFocus={() => setFocusedField('descricao')}
                onBlur={() => setFocusedField(null)}
                editable={!loading}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Tipo de Investimento (opcional)</Text>
              <TextInput
                style={[
                  styles.input,
                  focusedField === 'tipo' && styles.inputFocused,
                ]}
                value={tipo}
                placeholder="Ex: Ações, Fundos, Criptomoedas"
                placeholderTextColor="#6B7280"
                onChangeText={setTipo}
                onFocus={() => setFocusedField('tipo')}
                onBlur={() => setFocusedField(null)}
                editable={!loading}
              />
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleCadastrarInvestimento}
              disabled={loading}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#2563EB', '#1D4ED8']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>
                  {loading ? 'Registrando...' : 'Registrar Investimento'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => router.push({ pathname: '/(tabs)/principal' } as any)}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelButtonText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
