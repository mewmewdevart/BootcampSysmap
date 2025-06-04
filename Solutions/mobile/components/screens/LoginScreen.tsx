import ButtonComponent from '@/components/atoms/ButtonComponent';
import { useAuth } from '@/context/AuthContext';
import { loginUser, registerUser } from '@/services/apiService';
import { colors } from '@/themes/variables';
import { formatCpf } from '@/utils/validation';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

const LoginScreen: React.FC = () => {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const [errorName, setErrorName] = useState('');
  const [errorCPF, setErrorCPF] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const isValidCPF = (cpf: string) => {
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return regex.test(cpf);
  };

  const handleCpfChange = (text: string) => {
    setCpf(formatCpf(text));
  };

  const handleLogin = async () => {
    try {
      const data = await loginUser({ email: loginEmail, password: loginPassword });
      await login({ token: data.token, avatar: data.avatar, level: data.level });
      Toast.show({
        type: 'success',
        text1: 'Bem-vindo!',
        text2: 'Login realizado com sucesso!',
      });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Erro no Login',
        text2: error.message || 'Ocorreu um erro ao fazer login.',
      });
    }
  };

  const handleRegister = async () => {
    let valid = true;
    if (!name.trim()) {
      setErrorName('Nome é obrigatório.');
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Por favor, insira seu nome completo.',
      });
      valid = false;
    } else {
      setErrorName('');
    }

    if (!isValidCPF(cpf)) {
      setErrorCPF('CPF inválido.');
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Por favor, insira um CPF válido (Ex.: 123.456.789-00).',
      });
      valid = false;
    } else {
      setErrorCPF('');
    }

    if (!isValidEmail(regEmail)) {
      setErrorEmail('E-mail inválido.');
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Por favor, insira um e-mail válido.',
      });
      valid = false;
    } else {
      setErrorEmail('');
    }

    if (regPassword.length < 6) {
      setErrorPassword('Senha muito curta.');
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'A senha deve ter pelo menos 6 caracteres.',
      });
      valid = false;
    } else {
      setErrorPassword('');
    }

    if (!valid) return;

    try {
      await registerUser({ name, email: regEmail, cpf, password: regPassword });
      Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: 'Cadastro realizado com sucesso!',
      });
      setIsLogin(true);
      setName('');
      setCpf('');
      setRegEmail('');
      setRegPassword('');
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao cadastrar',
        text2: error.message || 'Houve um erro durante o cadastro.'
      });
    }
  };

  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: '#fff' }}
      contentContainerStyle={styles.scrollContainer}
    >
      <View style={styles.loginScreen}>
        {isLogin ? (
          <>
            <View style={styles.logoContainer}>
              <Image
                source={require('@/assets/images/Logo.svg')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.loginScreen__title}>Faça Login e comece a treinar</Text>
            <Text style={styles.loginScreen__subtitle}>
              Encontre parceiros para treinar ao ar livre. Conecte-se e comece agora! 💪
            </Text>
            <View style={styles.loginScreen__inputGroup}>
              <Text style={styles.label}>E-mail</Text>
              <Text style={styles.loginScreen__required}>*</Text>
            </View>
            <TextInput
              style={styles.loginScreen__input}
              placeholder="Ex.: nome@email.com"
              placeholderTextColor="gray"
              keyboardType="email-address"
              value={loginEmail}
              onChangeText={setLoginEmail}
            />
            <View style={styles.loginScreen__inputGroup}>
              <Text style={styles.label}>Senha</Text>
              <Text style={styles.loginScreen__required}>*</Text>
            </View>
            <TextInput
              style={styles.loginScreen__input}
              placeholder="Ex.: nome123"
              placeholderTextColor="gray"
              secureTextEntry
              value={loginPassword}
              onChangeText={setLoginPassword}
            />
            <View style={styles.buttonContainer}>
              <ButtonComponent
                variant="fullPrimary"
                size="large"
                label="Entrar"
                onPress={handleLogin}
                style={{ maxWidth: 321, minWidth: '100%', marginTop: 10, marginBottom: 20 }}
              />
            </View>
            <View style={styles.loginScreen__footer}>
              <Text style={styles.footerText}>Ainda não tem uma conta?</Text>
              <TouchableOpacity onPress={() => setIsLogin(false)}>
                <Text style={styles.loginScreen__registerText}>Cadastre-se</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.loginScreen__title}>Crie Sua Conta</Text>
            <Text style={styles.loginScreen__subtitle}>
              Por favor, preencha os dados para prosseguir!
            </Text>
            <View style={styles.loginScreen__inputGroup}>
              <Text style={styles.label}>Nome completo</Text>
              <Text style={styles.loginScreen__required}>*</Text>
            </View>
            <TextInput
              style={[
                styles.loginScreen__input,
                errorName ? styles.invalidInput : null,
              ]}
              placeholder="Ex.: João da Silva"
              placeholderTextColor="gray"
              value={name}
              onChangeText={setName}
            />
            <View style={styles.loginScreen__inputGroup}>
              <Text style={styles.label}>CPF</Text>
              <Text style={styles.loginScreen__required}>*</Text>
            </View>
            <TextInput
              style={[
                styles.loginScreen__input,
                errorCPF ? styles.invalidInput : null,
              ]}
              placeholder="Ex.: 123.456.789-00"
              placeholderTextColor="gray"
              keyboardType="numeric"
              value={cpf}
              onChangeText={handleCpfChange}
            />
            <View style={styles.loginScreen__inputGroup}>
              <Text style={styles.label}>E-mail</Text>
              <Text style={styles.loginScreen__required}>*</Text>
            </View>
            <TextInput
              style={[
                styles.loginScreen__input,
                errorEmail ? styles.invalidInput : null,
              ]}
              placeholder="Ex.: nome@email.com"
              placeholderTextColor="gray"
              keyboardType="email-address"
              value={regEmail}
              onChangeText={setRegEmail}
            />
            <View style={styles.loginScreen__inputGroup}>
              <Text style={styles.label}>Senha</Text>
              <Text style={styles.loginScreen__required}>*</Text>
            </View>
            <TextInput
              style={[
                styles.loginScreen__input,
                errorPassword ? styles.invalidInput : null,
              ]}
              placeholder="Ex.: nome123"
              placeholderTextColor="gray"
              secureTextEntry
              value={regPassword}
              onChangeText={setRegPassword}
            />
            <View style={styles.buttonContainer}>
              <ButtonComponent
                variant="fullPrimary"
                size="large"
                label="Cadastrar"
                onPress={handleRegister}
                style={{ width: 321, marginTop: 10, marginBottom: 20 }}
              />
            </View>
            <View style={styles.loginScreen__footer}>
              <Text style={styles.footerText}>Já possui uma conta?</Text>
              <TouchableOpacity onPress={() => setIsLogin(true)}>
                <Text style={styles.loginScreen__registerText}>Faça Login</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  loginScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 20,
    backgroundColor: '#fff',
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 143,
    height: 100,
  },
  loginScreen__title: {
    fontSize: 32,
    marginBottom: 10,
    marginTop: 45,
    textAlign: 'left',
    fontFamily: 'BebasNeue_400Regular',
  },
  loginScreen__subtitle: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 20,
    fontFamily: 'DMSans_400Regular',
  },
  loginScreen__inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    fontFamily: 'DMSans_400Regular',
    fontWeight: '600',
  },
  loginScreen__required: {
    fontSize: 16,
    color: 'red',
    marginLeft: 2,
  },
  loginScreen__input: {
    width: '100%',
    height: 56,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.neutral00,
    color: colors.dark500,
  },
  invalidInput: {
    borderColor: 'red',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  loginScreen__footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  footerText: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 14,
    color: '#333',
  },
  loginScreen__registerText: {
    fontSize: 14,
    color: '#0000EE',
    textDecorationLine: 'underline',
    marginLeft: 5,
  },
});

export default LoginScreen;
