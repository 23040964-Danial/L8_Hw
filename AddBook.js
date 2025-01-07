import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddBook = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [isbn, setIsbn] = useState('');
    const [copies, setCopies] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const addBook = async () => {
        const newBook = { title, isbn, copies: parseInt(copies), imageUrl };
        const storedBooks = await AsyncStorage.getItem('books');
        const books = storedBooks ? JSON.parse(storedBooks) : [];

        books.push(newBook);
        await AsyncStorage.setItem('books', JSON.stringify(books));

        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <TextInput placeholder="Title" onChangeText={setTitle} style={styles.input} />
            <TextInput placeholder="ISBN" onChangeText={setIsbn} style={styles.input} />
            <TextInput placeholder="Number of Copies" keyboardType="numeric" onChangeText={setCopies} style={styles.input} />
            <TextInput placeholder="Image URL" onChangeText={setImageUrl} style={styles.input} />
            <Button title="Submit" onPress={addBook} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-start',
        marginTop: 50,
    },
    input: {
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
});

export default AddBook;
