import React, { useState, useEffect } from 'react';
import { View, FlatList, Button, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initialBooks } from './Data';

const Home = ({ navigation }) => {
    const [books, setBooks] = useState([]);

    const loadBooks = async () => {
        const storedBooks = await AsyncStorage.getItem('books');
        if (storedBooks) {
            setBooks(JSON.parse(storedBooks));
        } else {
            await AsyncStorage.setItem('books', JSON.stringify(initialBooks));
            setBooks(initialBooks);
        }
    };

    useEffect(() => {
        loadBooks();
    }, []);

    const renderItem = ({ item, index }) => (
        <View style={styles.bookItem}>
            {item.imageUrl ? (
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
            ) : null}
            <Text style={styles.title}>{item.title}</Text>
            <Text>ISBN: {item.isbn}</Text>
            <Text>Copies: {item.copies}</Text>
            <Button title="Edit" onPress={() => navigation.navigate("EditBook", { book: item, index })} />
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button title="Add Book" onPress={() => navigation.navigate("AddBook")} />
            </View>
            <FlatList
                data={books}
                renderItem={renderItem}
                keyExtractor={(item) => item.isbn}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    buttonContainer: {
        marginBottom: 20,
        marginTop: 30,
    },
    listContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
    },
    bookItem: {
        marginVertical: 10,
        padding: 20,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    image: {
        width: 100,
        height: 150,
        marginBottom: 10,
    },
});

export default Home;
