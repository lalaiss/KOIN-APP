import React from 'react';

import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';


import { styles } from '../_styles/style';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#03050B', '#060B1C', '#03050B']}
        style={styles.background}
      />

   <View style={styles.logoWrapper}>
        <Image 
          source={require('../../assets/images/Group 16.png')} 
          style={styles.logoImage} 
        />
      </View>

      <View style={styles.bottomCard}>
        {}
        <LinearGradient
          colors={['#080C20', '#03050B']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.cardGradient}
        >
          <Text style={styles.title}>
            O jeito mais fácil de{'\n'}controlar suas finanças
          </Text>

          <Text style={styles.subtitle}>
            Cadastre-se, crie, controle{'\n'}todos os seus gastos e muito{'\n'}mais
          </Text>

          <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
            <LinearGradient
              colors={['#10152B', '#080C1E']}
              style={styles.buttonGradient}
            >
              <Text style={styles.primaryButtonText}>Cadastrar</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton} 
            activeOpacity={0.6}
            onPress={() => router.push('/principal')} 
          >
            <Text style={styles.secondaryButtonText}>Já tenho uma conta</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}