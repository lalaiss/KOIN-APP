import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Alert, KeyboardAvoidingView, Modal, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Transaction {
  id?: string; // Coloquei como opcional caso algumas salvas antigamente não tenham
  descricao: string;
  valor: number;
  data: string;
  type?: 'Despesa' | 'Receita' | 'Investimento' | string;
  tipoInvestimento?: string;
  icon?: string;
}

export default function RelatorioScreen() {
  const router = useRouter();
  const [transacoes, setTransacoes] = useState<Transaction[]>([]);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [editDescricao, setEditDescricao] = useState('');
  const [editValor, setEditValor] = useState('');

  const formatarSaldo = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const formatarDataParaExibicao = (dataString: string) => {
    try {
      if (!dataString) return '--/--/----';
      if (dataString.match(/^\d{2}\/\d{2}\/\d{4}$/)) return dataString;
      const date = new Date(dataString);
      if (!isNaN(date.getTime())) return date.toLocaleDateString('pt-BR');
    } catch (e) {
      console.error("Erro ao formatar data:", e);
    }
    return dataString;
  };

  const getIconBackgroundColor = (tipo?: 'despesa' | 'receita' | 'investimento') => {
    switch (tipo) {
      case 'despesa':
        return '#EF4444'; // Vermelho para despesas
      case 'receita':
        return '#22C55E'; // Verde para receitas
      case 'investimento':
        return '#3B82F6'; // Azul para investimentos
      default:
        return '#6B7280'; // Cor padrão para tipos desconhecidos
    }
  };

  const getIconName = (tipo?: 'despesa' | 'receita' | 'investimento', defaultIcon: string = 'cash') => {
    switch (tipo) {
      case 'despesa':
        return 'arrow-down';
      case 'receita':
        return 'arrow-up';
      case 'investimento':
        return 'trending-up';
      default:
        return defaultIcon;
    }
  };

  const carregarTransacoes = useCallback(async () => {
    try {
      const transacoesArmazenadas = await AsyncStorage.getItem('transacoes_usuario');
      if (transacoesArmazenadas) {
        const parsed: Transaction[] = JSON.parse(transacoesArmazenadas);
        parsed.sort((a, b) => {
          const dateA = new Date((a.data || '').split('/').reverse().join('-'));
          const dateB = new Date((b.data || '').split('/').reverse().join('-'));
          return dateB.getTime() - dateA.getTime();
        });
        setTransacoes(parsed);
      }
    } catch (error) {
      console.error('Erro ao carregar:', error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarTransacoes();
    }, [carregarTransacoes])
  );

  const abrirEdicao = (transacao: Transaction) => {
    setSelectedTransaction(transacao);
    setEditDescricao(transacao.descricao);
    setEditValor(transacao.valor.toString());
    setModalVisible(true);
  };

  const salvarEdicao = async () => {
    if (!selectedTransaction || !editDescricao || !editValor) {
      Alert.alert("Aviso", "Preencha todos os campos.");
      return;
    } 
    
    const valorFormatado = parseFloat(editValor.replace(',', '.'));
    if (isNaN(valorFormatado)) {
      Alert.alert("Erro", "Digite um valor numérico válido.");
      return;
    }

    const novasTransacoes = transacoes.map(t => {
      
      const isSameId = t.id && selectedTransaction.id && t.id === selectedTransaction.id;
      const isSameBackup = !t.id && t.descricao === selectedTransaction.descricao && t.valor === selectedTransaction.valor;
      
      if (isSameId || isSameBackup) {
        return { ...t, descricao: editDescricao, valor: valorFormatado };
      }
      return t;
    });

    await AsyncStorage.setItem('transacoes_usuario', JSON.stringify(novasTransacoes));
    setModalVisible(false);
    carregarTransacoes();
  };

  const excluirTransacao = () => {
    if (!selectedTransaction) return;

    Alert.alert(
      "Excluir Registro", 
      "Tem certeza que deseja apagar esta transação? Esta ação não pode ser desfeita.", 
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Excluir", 
          style: "destructive", 
          onPress: async () => {
            
            const novas = transacoes.filter(t => {
              if (t.id && selectedTransaction.id) {
                return t.id !== selectedTransaction.id;
              }
              // Se os registros antigos não tiverem ID salvo, exclui comparando descrição e valor
              return t.descricao !== selectedTransaction.descricao || t.valor !== selectedTransaction.valor;
            });

            await AsyncStorage.setItem('transacoes_usuario', JSON.stringify(novas));
            setModalVisible(false);
            carregarTransacoes();
          } 
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Histórico de Transações</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {transacoes.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons name="text-box-search-outline" size={64} color="#374151" />
            <Text style={styles.emptyStateText}>Nenhum registro encontrado.</Text>
          </View>
        ) : (
          transacoes.map((transacao, index) => {
            const tipo = transacao.tipo || '';
            const isDespesa = tipo === 'despesa';
            const isReceita = tipo === 'receita';
            const isInvestimento = tipo === 'investimento';
            const deveSubtrair = isDespesa || isInvestimento;

            
            const itemKey = transacao.id ? transacao.id : `item-${index}`;

            return (
              <View key={itemKey} style={styles.transactionCard}>
                <View style={[styles.transactionIconWrapper, { backgroundColor: getIconBackgroundColor(transacao.tipo) }]}>
                  <MaterialCommunityIcons name={getIconName(transacao.tipo, transacao.icon)} size={24} color="#FFFFFF" />
                </View>

                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionTitle} numberOfLines={1}>{transacao.descricao}</Text>
                  <Text style={styles.transactionSubtitle}>
                    {(transacao.tipo === 'despesa' ? 'Despesa' : transacao.tipo === 'receita' ? 'Receita' : transacao.tipo === 'investimento' ? 'Investimento' : transacao.tipoInvestimento || 'Geral')} • {formatarDataParaExibicao(transacao.data)}
                  </Text>
                </View>

                <View style={styles.transactionActionBox}>
                  <Text style={[
                    styles.transactionAmount,
                    isDespesa && styles.amountNegative,
                    isReceita && styles.amountPositive,
                    isInvestimento && styles.amountInvestment,
                  ]}>
                    {deveSubtrair ? `- ${formatarSaldo(transacao.valor)}` : formatarSaldo(transacao.valor)}
                  </Text>
                  <TouchableOpacity onPress={() => abrirEdicao(transacao)} style={styles.editButton}>
                    <MaterialCommunityIcons name="pencil-outline" size={20} color="#9CA3AF" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

      {/* MODAL DE EDIÇÃO */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Editar Registro</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <MaterialCommunityIcons name="close" size={24} color="#9CA3AF" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Descrição</Text>
              <TextInput style={styles.input} value={editDescricao} onChangeText={setEditDescricao} />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Valor (R$)</Text>
              <TextInput style={styles.input} value={editValor} onChangeText={setEditValor} keyboardType="numeric" />
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.deleteButton} onPress={excluirTransacao}>
                <MaterialCommunityIcons name="trash-can-outline" size={20} color="#EF4444" />
                <Text style={styles.deleteButtonText}>Excluir</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveButton} onPress={salvarEdicao}>
                <Text style={styles.saveButtonText}>Salvar Alterações</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#03050B' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  backButton: { padding: 8, marginLeft: -8 },
  headerTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
  scrollContent: { padding: 16, paddingBottom: 40 },
  emptyState: { alignItems: 'center', justifyContent: 'center', marginTop: 80 },
  emptyStateText: { color: '#6B7280', marginTop: 16, fontSize: 16 },
  transactionCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0F172A', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(59, 130, 246, 0.15)' },
  transactionIconWrapper: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#1E293B', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  transactionInfo: { flex: 1, marginRight: 8 },
  transactionTitle: { color: '#F8FAFC', fontSize: 16, fontWeight: '600', marginBottom: 4 },
  transactionSubtitle: { color: '#94A3B8', fontSize: 13 },
  transactionActionBox: { alignItems: 'flex-end' },
  transactionAmount: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 8 },
  amountNegative: { color: '#EF4444' },
  amountPositive: { color: '#22C55E' },
  amountInvestment: { color: '#3B82F6' },
  editButton: { padding: 4 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(3, 5, 11, 0.85)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#0F172A', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, borderTopWidth: 1, borderColor: '#1E293B' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  modalTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' },
  inputGroup: { marginBottom: 20 },
  inputLabel: { color: '#94A3B8', fontSize: 14, marginBottom: 8, fontWeight: '500' },
  input: { backgroundColor: '#1E293B', color: '#FFFFFF', borderRadius: 12, padding: 16, fontSize: 16, borderWidth: 1, borderColor: '#334155' },
  modalActions: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, marginBottom: 20 },
  deleteButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(239, 68, 68, 0.1)', paddingVertical: 14, paddingHorizontal: 20, borderRadius: 12 },
  deleteButtonText: { color: '#EF4444', fontWeight: '600', marginLeft: 8, fontSize: 16 },
  saveButton: { flex: 1, backgroundColor: '#3B82F6', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginLeft: 16 },
  saveButtonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
});