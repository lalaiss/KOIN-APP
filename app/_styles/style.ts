import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#03050B',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  logoWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 40 : 0,
  },
  logoImage: {
    width: 300,  // Diminuí o tamanho pois agora é só o ícone
    height: 300,
    resizeMode: 'contain',
     // Dá um espaço entre a imagem e o texto
  },
 
  bottomCard: {
    flex: 1.2,
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 40,
    justifyContent: 'flex-end',
  },
  cardGradient: {
    borderRadius: 24,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 28,
  },
  subtitle: {
    fontWeight: 'normal',
    fontSize: 14,
    color: '#8A8D9F',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  primaryButton: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  buttonGradient: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  secondaryButton: {
    paddingVertical: 10,
  },
  secondaryButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});