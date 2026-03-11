import React, { useEffect, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { API_BASE } from '@/app/API_BASE';

export default function Index() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [lookUpEmail, setLookUpEmail] = useState('');
  const [userFound, setUserFound] = useState(false);
  const [foundUserName, setFoundUserName] = useState('');

  // Equivalent to ngOnInit
  useEffect(() => {
    Alert.alert('ngOnInit equivalent', `Mounted at ${new Date(Date.now())}`);

    fetch(`${API_BASE}/sampleGet`)
      .then((res) => res.json())
      .then((data) => {
        // process the configuration
        console.log('Init fetch data:', data);
      })
      .catch((err) => console.error('Init fetch error:', err));
  }, []); // Empty dependency array = runs once on mount = ngOnInit

  // Equivalent to sentData()
  const sentData = () => {
    const fd = { uname: userName, uemail: userEmail };

    fetch(`${API_BASE}/samplePost`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fd),
    })
      .then((res) => res.json())
      .then((data) => console.log('Post response:', data))
      .catch((err) => console.error('Post error:', err));
  };

  // Equivalent to getUser()
  const getUser = () => {
    setUserFound(false);
    setFoundUserName('');

    if (lookUpEmail !== '') {
      fetch(`${API_BASE}/sampleGet?userEmail=${lookUpEmail}`)
        .then((res) => res.json())
        .then((data) => {
          if (data !== null) {
            setUserFound(true);
            setFoundUserName(data.username);
          } else {
            setUserFound(false);
            setFoundUserName('');
          }
        })
        .catch((err) => console.error('Get user error:', err));
    }
  };

  return (
    <View style={styles.container}>

      {/* POST Section */}
      <TextInput
        style={styles.input}
        placeholder="Type Name here..."
        value={userName}
        onChangeText={setUserName}
      />

      <TextInput
        style={styles.input}
        placeholder="Type eMail here..."
        value={userEmail}
        onChangeText={setUserEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={sentData}>
        <Text style={styles.buttonText}>Post Data</Text>
      </TouchableOpacity>

      {/* GET / Lookup Section */}
      <TextInput
        style={styles.input}
        placeholder="Type user's email here..."
        value={lookUpEmail}
        onChangeText={setLookUpEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={getUser}>
        <Text style={styles.buttonText}>Get User</Text>
      </TouchableOpacity>

      {/* Equivalent to *ngIf="userFound" */}
      {userFound && (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>Found: {foundUserName}</Text>
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultBox: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#e6f4ea',
    borderRadius: 8,
    borderColor: '#4caf50',
    borderWidth: 1,
  },
  resultText: {
    fontSize: 16,
    color: '#2e7d32',
  },
});