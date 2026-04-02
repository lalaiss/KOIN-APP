import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import { useTransactions } from '../TransactionsContext';
import { styles } from '../_styles/homeStyles';

const categories = [
  { key: 'alimentacao', label: 'Alimentação', icon: 'silverware-fork-knife' },
  { key: 'transporte', label: 'Transporte', icon: 'car' },
  { key: 'saude', label: 'Saúde', icon: 'pill' },
  { key: 'lazer', label: 'Lazer', icon: 'movie-open-outline' },
  { key: 'conta', label: 'Contas', icon: 'flash' },
  { key: 'outros', label: 'Outros', icon: 'dots-horizontal' },
];

export default function TransacaoScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('alimentacao');
  const [tipo, setTipo] = useState<'expense' | 'income'>('expense');
  const { addTransaction } = useTransactions();

  const itemSize = Math.max(90, Math.min(140, (width - 72) / 3));

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingBottom: 50 }]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.transacaoHeader}>
            <Text style={styles.transacaoTitle}>Cadastrar Gastos</Text>
            <Text style={styles.transacaoSubtitle}>Selecione categoria e informe valor</Text>
          </View>

          <View style={styles.categoryGrid}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.key}
                style={[
                  styles.categoryItem,
                  { width: itemSize, height: itemSize },
                  categoria === cat.key && styles.categoryItemActive,
                ]}
                onPress={() => setCategoria(cat.key)}
                activeOpacity={0.75}
              >
                <MaterialCommunityIcons
                  name={cat.icon as any}
                  size={24}
                  color={categoria === cat.key ? '#040A35' : '#FFFFFF'}
                />
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
            <Text style={styles.formLabel}>Valor (R$)</Text>
            <TextInput
              style={styles.input}
              value={valor}
              placeholder="0,00"
              keyboardType="numeric"
              placeholderTextColor="#A0A0A0"
              onChangeText={setValor}
            />

            <Text style={styles.formLabel}>Descrição</Text>
            <TextInput
              style={styles.input}
              value={descricao}
              placeholder="Ex: Almoço"
              placeholderTextColor="#A0A0A0"
              onChangeText={setDescricao}
            />

            <View style={styles.typeToggleRow}>
              <TouchableOpacity
                style={[
                  styles.typeToggleButton,
                  tipo === 'expense' && styles.typeToggleButtonActive,
                ]}
                onPress={() => setTipo('expense')}
              >
                <Text style={tipo === 'expense' ? styles.typeToggleTextActive : styles.typeToggleText}>Despesa</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.typeToggleButton,
                  tipo === 'income' && styles.typeToggleButtonActive,
                ]}
                onPress={() => setTipo('income')}
              >
                <Text style={tipo === 'income' ? styles.typeToggleTextActive : styles.typeToggleText}>Receita</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              activeOpacity={0.8}
              onPress={async () => {
                const amount = Number(valor.replace(',', '.'));
                if (!valor || !descricao || Number.isNaN(amount) || amount <= 0) return;

                await addTransaction({
                  description: descricao,
                  category: categoria,
                  amount: tipo === 'expense' ? -amount : amount,
                  type: tipo,
                });

                setValor('');
                setDescricao('');
                setCategoria('alimentacao');
                setTipo('expense');

                router.push({ pathname: '/explore' } as any);
              }}
            >
              <LinearGradient
                colors={['#181E52', '#1932B3']}
                style={styles.buttonGradient}
              >
                <Text style={styles.primaryButtonText}>Cadastrar Transação</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              activeOpacity={0.6}
              onPress={() => router.push({ pathname: '/explore' } as any)}
            >
              <Text style={styles.secondaryButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
