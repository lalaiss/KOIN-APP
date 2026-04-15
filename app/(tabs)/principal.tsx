import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { styles } from '../_styles/homeStyles';

export default function HomeScreen() {
  const router = useRouter();
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [saldo, setSaldo] = useState(0);
  const [saldoVisivel, setSaldoVisivel] = useState(true);
  const [transacoes, setTransacoes] = useState<any[]>([]);

  useEffect(() => {
    carregarDados();
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [])
  );

  const carregarDados = async () => {
    try {
      const usuarioLogado = await AsyncStorage.getItem('usuarioLogado');
      if (usuarioLogado) {
        const usuario = JSON.parse(usuarioLogado);
        setNomeUsuario(usuario.nome || 'Usuário');
      }

      const saldoArmazenado = await AsyncStorage.getItem('saldo_usuario');
      setSaldo(saldoArmazenado ? parseFloat(saldoArmazenado) : 0);

      const transacoesArmazenadas = await AsyncStorage.getItem('transacoes_usuario');
      setTransacoes(transacoesArmazenadas ? JSON.parse(transacoesArmazenadas) : []);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const formatarSaldo = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={20} color="#A0A0A0" />
            </View>
            <View>
              <Text style={styles.greetingText}>Olá 👋</Text>
              <Text style={styles.userName}>{nomeUsuario}</Text>
            </View>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconCircle}>
              <Ionicons name="notifications" size={18} color="#A0A0A0" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconCircle}>
              <Ionicons name="settings-sharp" size={18} color="#A0A0A0" />
            </TouchableOpacity>
          </View>
        </View>

        {}
        <Text style={styles.monthText}>Março 2026</Text>
        <LinearGradient
          colors={['#0A1128', '#001E5B']} 
          style={styles.balanceCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.balanceLabel}>Saldo Atual</Text>
          <View style={styles.balanceRow}>
            <Text style={styles.balanceValue}>
              {saldoVisivel ? formatarSaldo(saldo) : '••••••'}
            </Text>
            <TouchableOpacity onPress={() => setSaldoVisivel(!saldoVisivel)}>
              <Feather 
                name={saldoVisivel ? 'eye-off' : 'eye'} 
                size={24} 
                color="#FFFFFF" 
              />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity
            style={styles.viewTransactionsBtn}
            onPress={() => router.push({ pathname: '/(tabs)/relatorio' } as any)}
          >
            <MaterialCommunityIcons
              name="file-document-outline"
              size={18}
              color="#A0A0A0" />
            <Text style={styles.viewTransactionsText}>Ver extrato</Text>
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.buttonsHorizontalContainer}>
          <TouchableOpacity style={styles.addButton} onPress={() => router.push({ pathname: '/(tabs)/despesas' } as any)}>
            <View style={styles.addIconContainer}>
              <Feather name="arrow-down" size={20} color="#ffffff" />
            </View>
            <Text style={styles.addButtonText}>Despesas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.recebitasButton} onPress={() => router.push({ pathname: '/(tabs)/receitas' } as any)}>
            <View style={styles.receitasIconContainer}>
              <Feather name="arrow-up" size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.receitasButtonText}>Receitas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.investimentosButton} onPress={() => router.push({ pathname: '/(tabs)/investimentos' } as any)}>
            <View style={styles.investimentosIconContainer}>
              <MaterialCommunityIcons name="trending-up" size={15} color="#FFFFFF" />
            </View>
            <Text style={styles.investimentosButtonText}>Investimentos</Text>
          </TouchableOpacity>
        </View>

        {}
        <Text style={styles.sectionTitle}>Transações</Text>
        <View style={styles.transactionsContainer}>
          {transacoes.length === 0 ? (
            <View style={{ alignItems: 'center', paddingVertical: 40 }}>
              <MaterialCommunityIcons name="inbox-outline" size={48} color="#6B7280" />
              <Text style={{ color: '#9CA3AF', marginTop: 12, fontSize: 14 }}>
                Nenhuma transação registrada
              </Text>
            </View>
          ) : (
            transacoes.map((transacao) => (
              <View key={transacao.id} style={styles.transactionItem}>
                <View style={styles.transactionIconWrapper}>
                  <MaterialCommunityIcons 
                    name={transacao.icon} 
                    size={18} 
                    color="#FFFFFF" 
                  />
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionTitle}>{transacao.descricao}</Text>
                  <Text style={styles.transactionAmount}>{formatarSaldo(transacao.valor)}</Text>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}