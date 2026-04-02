import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type TransactionType = 'expense' | 'income';

export type Transaction = {
  id: string;
  description: string;
  category: string;
  amount: number;
  type: TransactionType;
  date: string;
};

type TransactionsContextData = {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => Promise<void>;
  clearTransactions: () => Promise<void>;
};

const TransactionsContext = createContext<TransactionsContextData | undefined>(undefined);
const STORAGE_KEY = '@koin_app:transactions';

export function TransactionsProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    async function load() {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json) {
        try {
          const parsed: Transaction[] = JSON.parse(json);
          setTransactions(parsed);
        } catch {
          setTransactions([]);
        }
      }
    }
    load();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  async function addTransaction(transaction: Omit<Transaction, 'id' | 'date'>) {
    const newTr: Transaction = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
      date: new Date().toISOString(),
      ...transaction,
    };
    setTransactions((old) => [newTr, ...old]);
  }

  async function clearTransactions() {
    setTransactions([]);
    await AsyncStorage.removeItem(STORAGE_KEY);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, addTransaction, clearTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  if (!context) throw new Error('useTransactions must be used within TransactionsProvider');
  return context;
}
