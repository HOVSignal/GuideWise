  import React, { useState } from 'react';
  import { View, TextInput, TouchableOpacity, Text, StyleSheet, ImageBackground, Dimensions, Image } from 'react-native';
  import { useNavigation } from '@react-navigation/native';
  import { Authentication } from '../FireBaseConfig';
  import { signInWithEmailAndPassword } from 'firebase/auth';

  const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigation = useNavigation();
    const auth = Authentication;

    const handleLogin = async () => {
      try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        console.log('Login successful');
        navigation.navigate('GuideWise');
      } catch (error) {
        console.log('Login error:', error);
        setError('Invalid email or password');
      }
    };

    const handleRegister = () => {
      navigation.navigate('SignUp');
    };

    return (
      <ImageBackground
        source={require('./img/img1.jpeg')} // Replace with the actual path to your background image
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          {/* Add your logo image here */}
          <Image
            source={require('./img/logo.png')} // Replace with the actual path to your logo image
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>Login</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#a9a9a9"
              onChangeText={text => setEmail(text)}
              value={email}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#a9a9a9"
              onChangeText={text => setPassword(text)}
              value={password}
              secureTextEntry
            />
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <TouchableOpacity style={[styles.LoginButton, { width: windowWidth * 0.7 }]} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.registerButtonContainer}>
            <Text style={[styles.messageText, { color: 'white' }]}>If you do not have an account! </Text>
            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
              <Text style={[styles.registerButtonText, { fontWeight: 'bold' }]}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  };

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Move content to the top of the screen
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 200, // Adjust the width to make the logo bigger
    height: 200, // Adjust the height to maintain the aspect ratio
    marginTop: 50, // Add margin to move the logo higher
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', // You can customize the text color to make it visible on the background
  },
  inputContainer: {
    width: windowWidth * 0.7, // Adjust the value to control the width of the input container
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#a9a9a9',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff', // You can customize the background color of the input fields
  },
  LoginButton: {
    height: 50, // Increase the height to make it thicker
    borderRadius: 8,
    backgroundColor: 'orange', // Change the background color to orange
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  registerButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  registerButton: {
    marginLeft: 4,
  },
  registerButtonText: {
    fontSize: 16,
    color: '#2196F3',
    textDecorationLine: 'underline',
  },
  messageText: {
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
});

export default Login;
