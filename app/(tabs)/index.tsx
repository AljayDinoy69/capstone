import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useUser } from '@/components/UserContext';
import { Colors } from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Linking, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const { setUser, users, getUserByEmail, addUser } = useUser();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signUpFirstName, setSignUpFirstName] = useState('');
  const [signUpLastName, setSignUpLastName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  // Helper for emergency call
  const handleCall = (number: string) => {
    Linking.openURL(`tel:${number}`);
  };

  const clearLogin = () => {
    setLoginEmail('');
    setLoginPassword('');
  };
  const clearSignUp = () => {
    setSignUpFirstName('');
    setSignUpLastName('');
    setSignUpEmail('');
    setSignUpPassword('');
    setSignUpConfirmPassword('');
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.light.background }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        {/* Gradient Header */}
        <LinearGradient
          colors={["#377DFF", "#FF3B3B"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.header}
        >
          <ThemedText type="title" style={styles.headerTitle}>Emergency Response{"\n"}Hub</ThemedText>
          <ThemedText style={styles.headerSubtitle}>
            Report emergencies instantly. Get help when you need it most.
          </ThemedText>
          <TouchableOpacity style={styles.emergencyBtn} onPress={() => router.push('./report')}>
            <ThemedText style={styles.emergencyBtnText}>🚨 Report Emergency Now</ThemedText>
          </TouchableOpacity>
          <ThemedText style={styles.headerSubnote}>
            No account required · Reports submitted instantly
          </ThemedText>
        </LinearGradient>

        {/* Feature Cards */}
        <View style={styles.cardRow}>
          <ThemedView style={styles.featureCard}>
            <IconSymbol name="paperplane.fill" size={32} color="#377DFF" style={styles.cardIcon} />
            <ThemedText type="subtitle" style={styles.cardTitle}>Instant Reporting</ThemedText>
            <ThemedText style={styles.cardDesc}>Report emergencies with photos and location, without an account, in seconds.</ThemedText>
          </ThemedView>
          <ThemedView style={styles.featureCard}>
            <IconSymbol name="chevron.left.forwardslash.chevron.right" size={32} color="#FF3B3B" style={styles.cardIcon} />
            <ThemedText type="subtitle" style={styles.cardTitle}>Coordinated Response</ThemedText>
            <ThemedText style={styles.cardDesc}>Emergency responders receive real-time information and location for faster response.</ThemedText>
          </ThemedView>
          <ThemedView style={styles.featureCard}>
            <IconSymbol name="chevron.right" size={32} color="#00B67A" style={styles.cardIcon} />
            <ThemedText type="subtitle" style={styles.cardTitle}>Precise Location</ThemedText>
            <ThemedText style={styles.cardDesc}>GPS coordinates and address information help responders find you quickly.</ThemedText>
          </ThemedView>
        </View>

        {/* Emergency Contacts */}
        <ThemedView style={styles.contactsSection}>
          <ThemedText type="subtitle" style={styles.contactsTitle}>📞 Emergency Contacts</ThemedText>
          <View style={styles.contactsRow}>
            <TouchableOpacity style={[styles.contactCard, { borderColor: '#FF3B3B' }]} onPress={() => handleCall('911')}>
              <ThemedText style={[styles.contactType, { color: '#FF3B3B' }]}>Life-Threatening Emergency</ThemedText>
              <ThemedText style={styles.contactNumber}>911</ThemedText>
              <ThemedText style={styles.contactDesc}>Police, Fire, Medical</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.contactCard, { borderColor: '#377DFF' }]} onPress={() => handleCall('1-800-222-1222')}>
              <ThemedText style={[styles.contactType, { color: '#377DFF' }]}>Poison Control</ThemedText>
              <ThemedText style={styles.contactNumber}>1-800-222-1222</ThemedText>
              <ThemedText style={styles.contactDesc}>24/7 Poison Help</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.contactCard, { borderColor: '#00B67A' }]} onPress={() => handleCall('5551234567')}>
              <ThemedText style={[styles.contactType, { color: '#00B67A' }]}>Non-Emergency</ThemedText>
              <ThemedText style={styles.contactNumber}>(555) 123-4567</ThemedText>
              <ThemedText style={styles.contactDesc}>General Services</ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>

        {/* Join Network Section */}
        <ThemedView style={styles.joinSection}>
          <ThemedText type="subtitle" style={styles.joinTitle}>Join the Emergency Response Network</ThemedText>
          <ThemedText style={styles.joinDesc}>Sign up for an account to track your reports and access additional features.</ThemedText>
          <View style={styles.joinBtnRow}>
            <TouchableOpacity style={[styles.joinBtn, { backgroundColor: '#377DFF' }]} onPress={() => setShowLogin(true)}>
              <ThemedText style={styles.joinBtnText}>Log In</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.joinBtn, { backgroundColor: '#00B67A' }]} onPress={() => setShowSignUp(true)}>
              <ThemedText style={styles.joinBtnText}>Sign Up</ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>
      {/* Login Modal */}
      <Modal visible={showLogin} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.modalClose} onPress={() => { setShowLogin(false); clearLogin(); }}>
              <Text style={styles.modalCloseText}>✕</Text>
            </TouchableOpacity>
            <ThemedText type="title" style={{ textAlign: 'center', marginBottom: 12 }}>Log In</ThemedText>
            <TextInput
              style={styles.modalInput}
              placeholder="Email"
              value={loginEmail}
              onChangeText={setLoginEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Password"
              value={loginPassword}
              onChangeText={setLoginPassword}
              secureTextEntry
            />
            <TouchableOpacity style={[styles.modalActionBtn, { backgroundColor: '#377DFF' }]} onPress={() => {
              const found = users.find(u => u.email === loginEmail && u.password === loginPassword);
              if (found) {
                setUser(found);
                setShowLogin(false);
                clearLogin();
                if (found.role === 'admin') {
                  router.push('/dashboard-admin');
                } else if (found.role === 'responder') {
                  router.push('/dashboard-responder');
                } else {
                  router.push('/dashboard');
                }
              } else {
                alert('Invalid email or password');
              }
            }}>
              <ThemedText style={styles.modalActionBtnText}>Log In</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Sign Up Modal */}
      <Modal visible={showSignUp} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.modalClose} onPress={() => { setShowSignUp(false); clearSignUp(); }}>
              <Text style={styles.modalCloseText}>✕</Text>
            </TouchableOpacity>
            <ThemedText type="title" style={{ textAlign: 'center', marginBottom: 12 }}>Sign Up</ThemedText>
            <TextInput
              style={styles.modalInput}
              placeholder="First Name"
              value={signUpFirstName}
              onChangeText={setSignUpFirstName}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Last Name"
              value={signUpLastName}
              onChangeText={setSignUpLastName}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Email"
              value={signUpEmail}
              onChangeText={setSignUpEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Password"
              value={signUpPassword}
              onChangeText={setSignUpPassword}
              secureTextEntry
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Confirm Password"
              value={signUpConfirmPassword}
              onChangeText={setSignUpConfirmPassword}
              secureTextEntry
            />
            <TouchableOpacity style={[styles.modalActionBtn, { backgroundColor: '#00B67A' }]} onPress={async () => {
              const newUser = {
                name: `${signUpFirstName} ${signUpLastName}`.trim(),
                email: signUpEmail,
                contact: 'N/A',
                password: signUpPassword,
                role: 'user',
              };
              await addUser(newUser);
              setUser(newUser);
              setShowSignUp(false);
              clearSignUp();
              router.push('/dashboard');
            }}>
              <ThemedText style={styles.modalActionBtnText}>Sign Up</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </ScrollView>
      {/* Social Media Footer */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => Linking.openURL('https://facebook.com')} style={styles.footerIcon}>
          <FontAwesome name="facebook" size={28} color="#4267B2" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com')} style={styles.footerIcon}>
          <FontAwesome name="twitter" size={28} color="#1DA1F2" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://youtube.com')} style={styles.footerIcon}>
          <FontAwesome name="youtube" size={28} color="#FF0000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://instagram.com')} style={styles.footerIcon}>
          <FontAwesome name="instagram" size={28} color="#FF0000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 48,
    paddingBottom: 32,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 12,
  },
  emergencyBtn: {
    backgroundColor: '#FF3B3B',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  emergencyBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  headerSubnote: {
    color: '#fff',
    fontSize: 12,
    marginTop: 2,
    textAlign: 'center',
    opacity: 0.85,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -32,
    marginHorizontal: 12,
    marginBottom: 16,
    gap: 8,
  },
  featureCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 1,
    marginHorizontal: 2,
    minWidth: 0,
  },
  cardIcon: {
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    marginBottom: 4,
    textAlign: 'center',
  },
  cardDesc: {
    fontSize: 13,
    color: '#444',
    textAlign: 'center',
  },
  contactsSection: {
    backgroundColor: '#f7f7f7',
    borderRadius: 14,
    marginHorizontal: 12,
    marginBottom: 18,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  contactsTitle: {
    marginBottom: 8,
    fontSize: 17,
  },
  contactsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  contactCard: {
    flex: 1,
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 2,
    backgroundColor: '#fff',
  },
  contactType: {
    fontWeight: 'bold',
    fontSize: 13,
    marginBottom: 2,
  },
  contactNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  contactDesc: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  joinSection: {
    backgroundColor: '#fff',
    borderRadius: 14,
    marginHorizontal: 12,
    marginBottom: 24,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  joinTitle: {
    fontSize: 17,
    marginBottom: 4,
    textAlign: 'center',
  },
  joinDesc: {
    fontSize: 13,
    color: '#444',
    marginBottom: 12,
    textAlign: 'center',
  },
  joinBtnRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    justifyContent: 'center',
  },
  joinBtn: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 4,
  },
  joinBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  footerIcon: {
    marginHorizontal: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 320,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 24,
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
    position: 'relative',
  },
  modalClose: {
    position: 'absolute',
    right: 12,
    top: 12,
    zIndex: 2,
    padding: 4,
  },
  modalCloseText: {
    fontSize: 22,
    color: '#FF3B3B',
    fontWeight: 'bold',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#fafbfc',
  },
  modalActionBtn: {
    width: '100%',
    borderRadius: 8,
    paddingVertical: 16,
    marginTop: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalActionBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center',
  },
});
