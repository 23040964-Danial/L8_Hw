import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditBook = ({ navigation, route }) => {
    const { book, index } = route.params;

    const [title, setTitle] = useState(book.title);
    const [isbn, setIsbn] = useState(book.isbn);
    const [copies, setCopies] = useState(book.copies.toString());
    const [imageUrl, setImageUrl] = useState(book.imageUrl);

    const updateBook = async () => {
        const storedBooks = await AsyncStorage.getItem('books');
        const books = JSON.parse(storedBooks);


        books[index] = { title, isbn, copies: parseInt(copies), imageUrl };

        await AsyncStorage.setItem('books', JSON.stringify(books));
        navigation.navigate('Home');
    };

    const deleteBook = async () => {
        const storedBooks = await AsyncStorage.getItem('books');
        const books = JSON.parse(storedBooks);

        books.splice(index, 1);
        await AsyncStorage.setItem('books', JSON.stringify(books));
        navigation.navigate('Home');
    };

    const confirmDelete = () => {
        Alert.alert(
            "Delete Book",
            "Are you sure you want to delete this book?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "Delete", onPress: deleteBook }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <TextInput value={title} onChangeText={setTitle} style={styles.input} />
            <TextInput value={isbn} onChangeText={setIsbn} style={styles.input} />
            <TextInput value={copies.toString()} keyboardType="numeric" onChangeText={setCopies} style={styles.input} />
            <TextInput value={imageUrl} onChangeText={setImageUrl} placeholder="Image URL" style={styles.input} />

            <Button title="Save" onPress={updateBook} />
            <View style={styles.deleteButtonContainer}>
                <Button title="Delete" onPress={confirmDelete} color="red" />
            </View>
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
    deleteButtonContainer: {
        marginTop: 5,
    },
});

export default EditBook;
