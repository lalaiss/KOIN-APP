import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Transaction {
  id: string;
  descricao: string;
  valor: number;
  data: string;
  type?: 'Despesa' | 'Receita' | 'Investimento';
  tipoInvestimento?: string;
  icon?: string;
}

export default function RelatorioScreen() {
  const router = useRouter();
  const [transacoes, setTransacoes] = useState<Transaction[]>([]);

  const formatarSaldo = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const formatarDataParaExibicao = (dataString: string) => {
    try {
      if (dataString.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
        return dataString;
      }
      const date = new Date(dataString);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString('pt-BR');
      }
    } catch (e) {
      console.error("Erro ao formatar data:", e);
    }
    return dataString;
  };

  const carregarTransacoes = useCallback(async () => {
    try {
      const transacoesArmazenadas = await AsyncStorage.getItem('transacoes_usuario');
      if (transacoesArmazenadas) {
        const parsedTransacoes: Transaction[] = JSON.parse(transacoesArmazenadas);
        parsedTransacoes.sort((a, b) => {
          const dateA = new Date(a.data.split('/').reverse().join('-') || a.data);
          const dateB = new Date(b.data.split('/').reverse().join('-') || b.data);
          return dateB.getTime() - dateA.getTime();
        });
        setTransacoes(parsedTransacoes);
      }
    } catch (error) {
      console.error('Erro ao carregar transações:', error);
    }
  }, []);

  useFocusEffect(carregarTransacoes);

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Histórico de Transações</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* LISTA DE TRANSAÇÕES */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {transacoes.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons name="inbox-outline" size={48} color="#6B7280" />
            <Text style={styles.emptyStateText}>Nenhuma transação registrada ainda.</Text>
          </View>
        ) : (
          transacoes.map((transacao) => {
            // Lógica de Categorização
            const isDespesa = transacao.type === 'Despesa' || transacao.descricao.toLowerCase() === 'aaa';
            const isReceita = transacao.type === 'Receita' || transacao.descricao === 'Salário' || transacao.descricao === 'Freela';
            const isInvestimento = transacao.type === 'Investimento' || transacao.tipoInvestimento === 'Fundo';

            // Define se deve exibir o sinal de subtração (-)
            // Como em um consultório médico, o investimento é uma saída para um bem futuro, então subtraímos do saldo atual.
            const deveSubtrair = isDespesa || isInvestimento;

            return (
              <View key={transacao.id} style={styles.transactionItem}>
                <View style={styles.transactionIconWrapper}>
                  <MaterialCommunityIcons
                    name={(transacao.icon as any) || 'cash'}
                    size={20}
                    color="#FFFFFF"
                  />
                </View>

                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionDescription}>{transacao.descricao}</Text>
                  <Text style={styles.transactionTypeDate}>
                    {transacao.type || transacao.tipoInvestimento || 'Geral'} - {formatarDataParaExibicao(transacao.data)}
                  </Text>
                </View>

                <Text
                  style={[
                    styles.transactionAmount,
                    isDespesa && styles.amountNegative,
                    isReceita && styles.amountPositive,
                    isInvestimento && styles.amountInvestment,
                  ]}
                >
                  {deveSubtrair ? `- ${formatarSaldo(transacao.valor)}` : formatarSaldo(transacao.valor)}
                </Text>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#03050B',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    color: '#9CA3AF',
    marginTop: 12,
    fontSize: 14,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(11, 20, 50, 0.4)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.1)',
  },
  transactionIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionTypeDate: {
    color: '#A0A0A0',
    fontSize: 12,
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF', // Cor de segurança (branco) caso falhe a detecção
  },
  amountNegative: {
    color: '#EF4444', // Vermelho para Despesas
  },
  amountPositive: {
    color: '#22C55E', // Verde para Receitas
  },
  amountInvestment: {
    color: '#3B82F6', // Azul para Investimentos
  },
});