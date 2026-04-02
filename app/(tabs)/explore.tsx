import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { useTransactions } from '../TransactionsContext';
import { styles } from '../_styles/homeStyles';

export default function HomeScreen() {
  const router = useRouter();
  const { transactions } = useTransactions();

  const [showBalance, setShowBalance] = useState(true);
  const [userName, setUserName] = useState('Jered Silva');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    async function loadUser() {
      const json = await AsyncStorage.getItem('@koin_app:user_profile');
      if (!json) return;
      try {
        const data = JSON.parse(json);
        if (data.name) setUserName(data.name);
        if (data.avatarUrl) setAvatarUrl(data.avatarUrl);
      } catch {
        // ignore
      }
    }
    loadUser();
  }, []);

  const balanceTotal = transactions.reduce((sum, item) => sum + item.amount, 0);
  const displayBalance = showBalance ? `R$ ${balanceTotal.toFixed(2)}` : 'R$ ****,**';
  const latestTransactions = transactions.slice(0, 5);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            {avatarUrl ? (
              <Image
                source={{ uri: avatarUrl }}
                style={{ width: 44, height: 44, borderRadius: 22, marginRight: 12 }}
              />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="person" size={20} color="#A0A0A0" />
              </View>
            )}
            <View>
              <Text style={styles.greetingText}>Olá 👋</Text>
              <Text style={styles.userName}>{userName}</Text>
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
              {displayBalance}
            </Text>
            <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
              {/* Ícone dinâmico: olho aberto ou fechado */}
              <Feather
                name={showBalance ? 'eye' : 'eye-off'}
                size={18}
                color="#A0A0A0"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.viewTransactionsBtn}>
            <MaterialCommunityIcons name="file-document-outline" size={18} color="#A0A0A0" />
            <Text style={styles.viewTransactionsText}>Ver transações</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* --- Botão Adicionar Transação --- */}
        <TouchableOpacity style={styles.addButton} onPress={() => router.push({ pathname: '/transacao' } as any)}>
          <View style={styles.addIconContainer}>
            <Feather name="plus" size={20} color="#03050B" />
          </View>
          <Text style={styles.addButtonText}>Adicionar{'\n'}Transação</Text>
        </TouchableOpacity>

        {}
        <Text style={styles.sectionTitle}>Transações</Text>
        <View style={styles.transactionsContainer}>
          {latestTransactions.length === 0 ? (
            <Text style={[styles.transactionTitle, { color: '#A0A0A0' }]}>Nenhuma transação ainda.</Text>
          ) : (
            latestTransactions.map((item) => (
              <View style={styles.transactionItem} key={item.id}>
                <View style={styles.transactionIconWrapper}>
                  <MaterialCommunityIcons
                    name={
                      item.category === 'alimentacao'
                        ? 'silverware-fork-knife'
                        : item.category === 'transporte'
                        ? 'car'
                        : item.category === 'saude'
                        ? 'pill'
                        : item.category === 'lazer'
                        ? 'movie-open-outline'
                        : item.category === 'conta'
                        ? 'flash'
                        : 'dots-horizontal'
                    }
                    size={18}
                    color="#FFFFFF"
                  />
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionTitle}>{item.description}</Text>
                  <Text style={[styles.transactionAmount, { color: item.type === 'expense' ? '#e95f5f' : '#8ddc8d' }]}>
                    {item.type === 'expense' ? '-' : '+'} R$ {Math.abs(item.amount).toFixed(2)}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}