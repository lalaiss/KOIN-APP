import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#03050B',

    },
    scrollContent: {
    padding: 24,
    paddingTop: Platform.OS === 'android' ? 50 : 20,
    paddingBottom: 100, 
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1E1E24',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  greetingText: {
    color: '#A0A0A0',
    fontSize: 14,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // --- Saldo ---
  monthText: {
    color: '#A0A0A0',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 4,
  },
  balanceCard: {
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)', // Borda azul sutil
  },
  balanceLabel: {
    color: '#6B7280',
    fontSize: 14,
    marginBottom: 8,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  balanceValue: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
    marginRight: 12,
  },
  viewTransactionsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  viewTransactionsText: {
    color: '#A0A0A0',
    fontSize: 14,
    marginLeft: 8,
  },

  // --- Botão Adicionar ---
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(11, 20, 50, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
    padding: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  addIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },

  // --- Botão Receitas ---
  recebitasButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(11, 20, 50, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(22, 163, 74, 0.2)',
    padding: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  receitasIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#16A34A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  receitasButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },

  // --- Botão Investimentos ---
  investimentosButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(11, 20, 50, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(37, 99, 235, 0.2)',
    padding: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 30,
  },
  investimentosIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  investimentosButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },

  // --- Lista de Transações ---
  sectionTitle: {
    color: '#A0A0A0',
    fontSize: 14,
    marginBottom: 12,
    marginLeft: 4,
  },
  transactionsContainer: {
    backgroundColor: 'rgba(11, 20, 50, 0.3)',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.1)',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.02)',
  },
  transactionIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 4,
  },
  transactionAmount: {
    color: '#A0A0A0',
    fontSize: 12,
  },

  // --- Transação ---
  transacaoHeader: {
    marginBottom: 24,
    paddingTop: 4,
  },
  transacaoTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  transacaoSubtitle: {
    color: '#A0A0A0',
    fontSize: 14,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 24,
  },
  categoryItem: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  categoryItemActive: {
    backgroundColor: '#4A6CFF',
    borderColor: '#4A6CFF',
  },
  categoryItemText: {
    marginTop: 6,
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
  },
  categoryItemTextActive: {
    marginTop: 6,
    color: '#03050B',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  formLabel: {
    color: '#A0A0A0',
    fontSize: 13,
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    color: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
});
