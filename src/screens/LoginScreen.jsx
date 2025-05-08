import {
  Animated,
  Button,
  Image,
  Keyboard,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Easing,
  Alert
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import colors from '../utils/colors';
import {sizes, fonts} from '../utils/texts';
import {horizonPadding, topMargin, smallIconDim} from '../utils/dimensions';
import {useNavigation} from '@react-navigation/native';
import {loginUser} from '../redux/slices/loginSlice';
import {useSelector, useDispatch} from 'react-redux';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isLoggedIn = useSelector(state => state.login.isLoggedIn);

  const [showLogView, setShowLogView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [regEmail, setRegEmail] = useState('');
  const [regPass, setRegPass] = useState('');
  const [regNum, setRegNum] = useState('');

  useEffect(() => {
    if (isLoggedIn === true) {
      navigation.navigate('BottomTabs');
    }
  }, [isLoggedIn]);

  const handleLogin = async () => {
    try {
      if(email === '' || password === '') {
        Alert.alert('Enter both email and pass...')
        return
      }
      const auth = getAuth()

      const subscribe = await signInWithEmailAndPassword(auth, email, password)
      console.log('Login successfully!')
      if(subscribe) {
        dispatch(loginUser(email))
      }
    } catch(e) {
      // Alert.alert(e.message)
      console.error(e)
      console.log('error in loging in', e.message)
    }
  };
  const handleRegister = async() => {
    try {
      if(regEmail==='' || regNum==='' || regPass==='') {
        Alert.alert('Enter All Fields...')
        return
      }
      const auth = getAuth()
    
      const userCredential = await createUserWithEmailAndPassword(auth, regEmail, regPass)
      const user = userCredential.user
      console.log("userReg working")
      storeUserDatainFirebase(user)
      toggleFlip()
    } catch (e) {
      // Alert.alert(e.message)
      console.error(e)
      console.log('reg not working----', e.message)
    }
  };
  const storeUserDatainFirebase = async(user) => {
    try {
      await firestore()
        .collection('users')
        .doc(user.uid)
        .set({
          email: regEmail,
          createdAt: new Date().toISOString(),
          imageUri: '',
          number: regNum, 
          address: '',
        })
        console.log("Stored successfully");
    } catch (e) {
      Alert.alert(e.message)
      console.log("not stored", e.message);      
    }
  }

  const rotation = useRef(new Animated.Value(0)).current;
  const frontInterpolate = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  })

  const toggleFlip = () => {
    Animated.timing(rotation, {
      toValue: 90,
      duration: 250,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true
    }).start(() => {      
        setShowLogView(t => !t)  
        toogleAgain()            
    })
  }
  const toogleAgain = () => {
    Animated.timing(rotation, {
      toValue: 0,
      duration: 250,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true
    }).start()
  }

  return (
    <View style={styles.mainView}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        <View style={styles.mainHeading}>
          <Image
            source={require('../../assets/icons/coffeeMug.png')}
            style={{
              height: smallIconDim(5, 2).height,
              width: smallIconDim(2, 5).width,
              tintColor: colors.color2,
            }}
          />
          <Text
            style={{
              fontSize: sizes.size1 + 10,
              color: 'white',
              fontWeight: 600,
            }}>
            Coffee Shop
          </Text>
        </View>
        <Animated.View style={[styles.containerView, {transform: [{rotateY: frontInterpolate}]}]}>
          <View style={{alignItems: 'center', gap: 10}}>
            <Text
              style={{
                fontSize: sizes.size1 + 5,
                color: colors.color7,
                fontWeight: 500,
              }}>
              Welcome
            </Text>
            <Text
              style={{
                fontSize: sizes.size2,
                color: colors.color6,
                fontWeight: 400,
              }}>
              {!showLogView? 'Log in to continue enjoying the best Coffee': 'Register-'}
            </Text>
          </View>
          {!showLogView ? (
            <View style={{gap: 15}}>
              <View style={{gap: 15}}>
                <View style={styles.searchBar}>
                  <TextInput
                    placeholder="Login Email..."
                    style={styles.inputStyle}
                    fontSize={sizes.size3}
                    color={'white'}
                    value={email}
                    onChangeText={t => setEmail(t)}
                    // keyboardType="numeric"
                  />
                </View>
                <View style={styles.searchBar}>
                  <TextInput
                    placeholder="Password..."
                    style={styles.inputStyle}
                    fontSize={sizes.size3}
                    color={'white'}
                    value={password}
                    secureTextEntry={false}
                    onChangeText={t => setPassword(t)}
                  />
                </View>
              </View>

              <View style={{gap: 5}}>
                <TouchableOpacity
                  style={styles.loginButt}
                  onPress={() => handleLogin()}>
                  <Text style={styles.buttText}>Login</Text>
                </TouchableOpacity>

                <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
                  <Text style={{color: 'white'}}>Not a user? </Text>
                  <TouchableOpacity onPress={() => toggleFlip()}>
                    <Text style={{color: colors.color2}}>Register Instead</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            <View style={{gap: 15}}>
              <View style={styles.searchBar}>
                <TextInput
                  placeholder="Register Email..."
                  style={styles.inputStyle}
                  fontSize={sizes.size3}
                  color={'white'}
                  value={regEmail}
                  onChangeText={t => setRegEmail(t)}
                  // keyboardType="numeric"
                />
              </View>
              <View style={styles.searchBar}>
                <TextInput
                  placeholder="Password..."
                  style={styles.inputStyle}
                  fontSize={sizes.size3}
                  color={'white'}
                  value={regPass}
                  secureTextEntry={false}
                  onChangeText={t => setRegPass(t)}
                />
              </View>
              <View style={styles.searchBar}>
                <TextInput
                  placeholder="Mobile Number..."
                  style={styles.inputStyle}
                  fontSize={sizes.size3}
                  color={'white'}
                  value={regNum}
                  secureTextEntry={false}
                  onChangeText={t => setRegNum(t)}
                />
              </View>
              <View style={{gap: 5}}>
                <TouchableOpacity
                  style={styles.loginButt}
                  // onPress={()=>Keyboard.dismiss}
                  onPress={() => handleRegister()}>
                  <Text style={styles.buttText}>Register</Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
                  <Text style={{color: 'white'}}>Already a user? </Text>
                  <TouchableOpacity onPress={() => toggleFlip()}>
                    <Text style={{color: colors.color2}}>Login Instead</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: colors.color3,
    flex: 1,
    paddingHorizontal: horizonPadding(1.5),
    justifyContent: 'center',
  },
  containerView: {
    marginTop: 60,
    gap: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    padding: horizonPadding(2),
    borderRadius: 20,
    width: '100%',
    shadowColor: '#000',
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: colors.color4,
    borderRadius: 15,
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  inputStyle: {
    height: smallIconDim(3, 4).height,
    color: 'white',
    fontSize: sizes.size3,
    flex: 1,
    fontFamily: fonts,
  },
  loginButt: {
    height: smallIconDim(3, 4).height + 5,
    backgroundColor: colors.color2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  buttText: {
    color: colors.color7,
    fontSize: sizes.size2,
    fontWeight: '600',
    fontFamily: fonts,
  },
  mainHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: horizonPadding(3),
    width: '100%',
    backgroundColor: colors.color3,
  },
});
