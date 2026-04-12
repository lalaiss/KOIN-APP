import { MaterialCommunityIcons } from '@expo/vector-icons';
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
  useWindowDimensions,
  View,
} from 'react-native';

const categories = [
  { key: 'alimentacao', label: 'Alimentação', icon: 'silverware-fork-knife' },
  { key: 'transporte', label: 'Transporte', icon: 'car' },
  { key: 'saude', label: 'Saúde', icon: 'pill' },
  { key: 'lazer', label: 'Lazer', icon: 'movie-open-outline' },
  { key: 'conta', label: 'Contas', icon: 'flash' },
  { key: 'outros', label: 'Outros', icon: 'dots-horizontal' },
];

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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  categoryItem: {
    width: '48%',
    backgroundColor: '#0F1729',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#1E293B',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  categoryItemActive: {
    backgroundColor: '#DC2626',
    borderColor: '#DC2626',
  },
  categoryItemIcon: {
    marginBottom: 8,
  },
  categoryItemText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  categoryItemTextActive: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  formContainer: {
    marginTop: 16,
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
    borderColor: '#DC2626',
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

export default function DespesasScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('alimentacao');
  const [data, setData] = useState(new Date().toLocaleDateString('pt-BR'));
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleCadastrarDespesa = async () => {
    if (!valor.trim()) {
      Alert.alert('Erro', 'Por favor, insira o valor da despesa');
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

      const nomeCategorias: { [key: string]: string } = {
        alimentacao: 'Alimentação',
        transporte: 'Transporte',
        saude: 'Saúde',
        lazer: 'Lazer',
        conta: 'Contas',
        outros: 'Outros',
      };

      const novaTransacao = {
        id: Date.now(),
        tipo: 'despesa',
        descricao: descricao.trim(),
        valor: valorNumerico,
        categoria: nomeCategorias[categoria],
        icon: 'trending-down',
        data: data,
      };

      const transacoesArmazenadas = await AsyncStorage.getItem('transacoes_usuario');
      const transacoes = transacoesArmazenadas ? JSON.parse(transacoesArmazenadas) : [];

      transacoes.unshift(novaTransacao);
      await AsyncStorage.setItem('transacoes_usuario', JSON.stringify(transacoes));

      Alert.alert('Sucesso', 'Despesa registrada com sucesso!');
      router.push({ pathname: '/(tabs)/principal' } as any);
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao registrar a despesa');
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
            <Text style={styles.sectionTitle}>Selecione o tipo de gasto que deseja registrar</Text>

            <View style={styles.categoryGrid}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.key}
                  style={[
                    styles.categoryItem,
                    categoria === cat.key && styles.categoryItemActive,
                  ]}
                  onPress={() => setCategoria(cat.key)}
                  activeOpacity={0.75}
                >
                  <View style={styles.categoryItemIcon}>
                    <MaterialCommunityIcons
                      name={cat.icon as any}
                      size={28}
                      color={categoria === cat.key ? '#FFFFFF' : '#9CA3AF'}
                    />
                  </View>
                  <Text
                    style={
                      categoria === cat.key
                        ? styles.categoryItemTextActive
                        : styles.categoryItemText
                    }
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Digite o valor do gasto</Text>
                <TextInput
                  style={[
                    styles.input,
                    focusedField === 'valor' && styles.inputFocused,
                  ]}
                  value={valor}
                  placeholder="R$ 0,00"
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
                  placeholder="Ex: Almoço no restaurante"
                  placeholderTextColor="#6B7280"
                  onChangeText={setDescricao}
                  onFocus={() => setFocusedField('descricao')}
                  onBlur={() => setFocusedField(null)}
                  editable={!loading}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Selecione a data da despesa</Text>
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
                onPress={handleCadastrarDespesa}
                disabled={loading}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#DC2626', '#B91C1C']}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.buttonText}>
                    {loading ? 'Registrando...' : 'Cadastrar Transação'}
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
