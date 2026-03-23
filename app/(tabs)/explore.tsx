import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';


import { styles } from '../_styles/homeStyles';

export default function HomeScreen() {
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
              <Text style={styles.userName}>Jered Silva</Text>
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
            <Text style={styles.balanceValue}>R$ 2.000</Text>
            <TouchableOpacity>
              <Feather name="eye-off" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.viewTransactionsBtn}>
            <MaterialCommunityIcons name="file-document-outline" size={18} color="#A0A0A0" />
            <Text style={styles.viewTransactionsText}>Ver transações</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* --- Botão Adicionar Transação --- */}
        <TouchableOpacity style={styles.addButton}>
          <View style={styles.addIconContainer}>
            <Feather name="plus" size={20} color="#03050B" />
          </View>
          <Text style={styles.addButtonText}>Adicionar{'\n'}Transação</Text>
        </TouchableOpacity>

        {}
        <Text style={styles.sectionTitle}>Transações</Text>
        <View style={styles.transactionsContainer}>
          
          {}
          <View style={styles.transactionItem}>
            <View style={styles.transactionIconWrapper}>
              <MaterialCommunityIcons name="silverware-fork-knife" size={18} color="#FFFFFF" />
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionTitle}>Jantar em Restaurante</Text>
              <Text style={styles.transactionAmount}>R$ 39,00</Text>
            </View>
          </View>

          {}
          <View style={styles.transactionItem}>
            <View style={styles.transactionIconWrapper}>
              <MaterialCommunityIcons name="movie-open-outline" size={18} color="#FFFFFF" />
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionTitle}>Cinema</Text>
              <Text style={styles.transactionAmount}>R$ 39,00</Text>
            </View>
          </View>

          {}
          <View style={styles.transactionItem}>
            <View style={styles.transactionIconWrapper}>
              <MaterialCommunityIcons name="silverware-fork-knife" size={18} color="#FFFFFF" />
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionTitle}>Jantar em Restaurante</Text>
              <Text style={styles.transactionAmount}>R$ 39,00</Text>
            </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}