import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
    padding: 0,
  },
  headerBar: {
    backgroundColor: '#0F1729',
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 24,
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
    borderColor: '#16A34A',
  },
  button: {
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
    marginTop: 12,
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

export default function ReceitasScreen() {
  const router = useRouter();
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [fonte, setFonte] = useState('');
  const [data, setData] = useState(new Date().toLocaleDateString('pt-BR'));
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleCadastrarReceita = async () => {
    if (!valor.trim()) {
      Alert.alert('Erro', 'Por favor, insira o valor da receita');
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

      const novoSaldo = saldoAtual + valorNumerico;
      await AsyncStorage.setItem('saldo_usuario', novoSaldo.toString());

      const novaTransacao = {
        id: Date.now(),
        tipo: 'receita',
        descricao: descricao.trim(),
        valor: valorNumerico,
        fonte: fonte.trim() || 'Receita',
        icon: 'arrow-up',
        data: data,
      };

      const transacoesArmazenadas = await AsyncStorage.getItem('transacoes_usuario');
      const transacoes = transacoesArmazenadas ? JSON.parse(transacoesArmazenadas) : [];

      transacoes.unshift(novaTransacao);
      await AsyncStorage.setItem('transacoes_usuario', JSON.stringify(transacoes));

      Alert.alert('Sucesso', 'Receita registrada com sucesso!');
      router.push({ pathname: '/(tabs)/principal' } as any);
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao registrar a receita');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push({ pathname: '/(tabs)/principal' } as any)}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="chevron-left" size={24} color="#FFFFFF" />
          <Text style={styles.headerTitle}>Transações</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Registrar Receita</Text>
            <Text style={styles.subtitle}>Adicione uma receita à sua conta</Text>

            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Valor (R$)</Text>
                <TextInput
                  style={[
                    styles.input,
                    focusedField === 'valor' && styles.inputFocused,
                  ]}
                  value={valor}
                  placeholder="0,00"
                  keyboardType="decimal-pad"
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
                  placeholder="Ex: Salário"
                  placeholderTextColor="#6B7280"
                  onChangeText={setDescricao}
                  onFocus={() => setFocusedField('descricao')}
                  onBlur={() => setFocusedField(null)}
                  editable={!loading}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Fonte (opcional)</Text>
                <TextInput
                  style={[
                    styles.input,
                    focusedField === 'fonte' && styles.inputFocused,
                  ]}
                  value={fonte}
                  placeholder="Ex: Empresa ABC"
                  placeholderTextColor="#6B7280"
                  onChangeText={setFonte}
                  onFocus={() => setFocusedField('fonte')}
                  onBlur={() => setFocusedField(null)}
                  editable={!loading}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Data da receita</Text>
                <TextInput
                  style={[
                    styles.input,
                    focusedField === 'data' && styles.inputFocused,
                  ]}
                  value={data}
                  placeholder="DD/MM/YYYY"
                  placeholderTextColor="#6B7280"
                  onChangeText={setData}
                  onFocus={() => setFocusedField('data')}
                  onBlur={() => setFocusedField(null)}
                  editable={!loading}
                />
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={handleCadastrarReceita}
                disabled={loading}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#16A34A', '#15803D']}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.buttonText}>
                    {loading ? 'Registrando...' : 'Registrar Receita'}
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
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
