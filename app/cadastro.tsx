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
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#03050B',
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  formContainer: {
    marginTop: 24,
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
    borderColor: '#3B82F6',
  },
  button: {
    marginTop: 24,
    borderRadius: 8,
    overflow: 'hidden',
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
  footer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  footerLink: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: 'bold',
    marginLeft: 4,
  },
});

export default function CadastroScreen() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleCadastro = async () => {
    // Validação
    if (!nome.trim()) {
      Alert.alert('Erro', 'Por favor, insira seu nome completo');
      return;
    }

    if (!email.trim()) {
      Alert.alert('Erro', 'Por favor, insira seu email');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Erro', 'Por favor, insira um email válido');
      return;
    }

    if (!senha) {
      Alert.alert('Erro', 'Por favor, insira uma senha');
      return;
    }

    if (senha.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não conferem');
      return;
    }

    setLoading(true);

    try {
      // Verificar se email já existe
      const usuarioExistente = await AsyncStorage.getItem(`usuario_${email}`);

      if (usuarioExistente) {
        Alert.alert('Erro', 'Este email já está cadastrado');
        setLoading(false);
        return;
      }

      // Armazenar novo usuário
      const novoUsuario = {
        nome: nome.trim(),
        email: email.trim(),
        senha: senha, // Em produção, isso deveria ser hasheado
      };

      await AsyncStorage.setItem(
        `usuario_${email}`,
        JSON.stringify(novoUsuario)
      );

      // Armazenar dados da sessão
      await AsyncStorage.setItem('usuarioLogado', JSON.stringify({
        nome: novoUsuario.nome,
        email: novoUsuario.email,
      }));

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      
      // Navegar para principal
      router.replace('/(tabs)/principal');
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao realizar o cadastro');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#03050B', '#060B1C', '#03050B']}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <Text style={styles.logo}>ko</Text>
              <Text style={styles.title}>Crie sua conta</Text>
              <Text style={styles.subtitle}>Comece agora mesmo</Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nome Completo</Text>
                <TextInput
                  style={[
                    styles.input,
                    focusedField === 'nome' && styles.inputFocused,
                  ]}
                  placeholder="Seu nome completo"
                  placeholderTextColor="#6B7280"
                  value={nome}
                  onChangeText={setNome}
                  onFocus={() => setFocusedField('nome')}
                  onBlur={() => setFocusedField(null)}
                  autoComplete="off"
                  editable={!loading}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={[
                    styles.input,
                    focusedField === 'email' && styles.inputFocused,
                  ]}
                  placeholder="seu@email.com"
                  placeholderTextColor="#6B7280"
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  autoComplete="off"
                  keyboardType="email-address"
                  editable={!loading}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Senha</Text>
                <TextInput
                  style={[
                    styles.input,
                    focusedField === 'senha' && styles.inputFocused,
                  ]}
                  placeholder="Digite uma senha segura"
                  placeholderTextColor="#6B7280"
                  value={senha}
                  onChangeText={setSenha}
                  onFocus={() => setFocusedField('senha')}
                  onBlur={() => setFocusedField(null)}
                  textContentType="newPassword"
                  autoComplete="password-new"
                  secureTextEntry
                  editable={!loading}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Confirmar Senha</Text>
                <TextInput
                  style={[
                    styles.input,
                    focusedField === 'confirmarSenha' && styles.inputFocused,
                  ]}
                  placeholder="Confirme sua senha"
                  placeholderTextColor="#6B7280"
                  value={confirmarSenha}
                  onChangeText={setConfirmarSenha}
                  onFocus={() => setFocusedField('confirmarSenha')}
                  onBlur={() => setFocusedField(null)}
                  textContentType="newPassword"
                  autoComplete="password-new"
                  secureTextEntry
                  editable={!loading}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleCadastro}
              disabled={loading}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#3B82F6', '#2563EB']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>
                  {loading ? 'Criando conta...' : 'Crie sua conta'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Já tem conta?</Text>
              <TouchableOpacity onPress={() => router.push('/entrar')}>
                <Text style={styles.footerLink}>Entre aqui</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}
