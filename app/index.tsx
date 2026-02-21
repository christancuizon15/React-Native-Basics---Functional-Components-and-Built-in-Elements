import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Alert,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import SearchBar from '../components/SearchBar';


export default function HomeScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);

  const foods = [
  { id: '1', name: ' Burger', price: 120, category: 'Burgers', img: 'https://th.bing.com/th/id/OIP.KWOS9AKf6vPjtRiRIM07KgHaHa?w=177&h=180&c=7&r=0&o=7&pid=1.7&rm=3' },
  { id: '2', name: ' Pasta', price: 150, category: 'Pasta', img: 'https://static.wixstatic.com/media/bb355d_b0306ad8e7814ea08d8c77bf6b8de7f9~mv2.jpeg' },
  { id: '3', name: ' Pizza', price: 200, category: 'Burgers', img: 'https://th.bing.com/th/id/OIP.QuUTQeb-TCUWgMOu27vgRAHaE7?w=277&h=185&c=7&r=0&o=7&pid=1.7&rm=3' },
  { id: '4', name: ' Chicken Adobo', price: 140, category: 'Pinoy', img: 'https://th.bing.com/th/id/OIP.Rb3SAzj7oEgJRXBOJxRs0gHaFj?w=246&h=185&c=7&r=0&o=7&pid=1.7&rm=3' },
  { id: '5', name: ' Sinigang', price: 160, category: 'Pinoy', img: 'https://th.bing.com/th/id/OIP.JxXNWqXq_oxr-jg2dBErdgHaEK?w=299&h=180&c=7&r=0&o=7&pid=1.7&rm=3' },
  { id: '6', name: ' Iced Tea', price: 60, category: 'Drinks', img: 'https://th.bing.com/th/id/OIP.z-J7JjgPRhpNgCndehyA9wHaLH?w=203&h=372&c=7&r=0&o=7&pid=1.7&rm=3' },

 
  { id: '7', name: ' BBQ Isaw', price: 50, category: 'Pinoy', img: 'https://th.bing.com/th/id/OIP.CgGTOqzDJ11DPotjsi3ebQAAAA?w=251&h=180&c=7&r=0&o=7&pid=1.7&rm=3' },
  { id: '8', name: ' Bulalo', price: 220, category: 'Pinoy', img: 'https://th.bing.com/th/id/OIP.nY9WkmgPgB4VSAnjokJ_eAHaFj?w=231&h=180&c=7&r=0&o=7&pid=1.7&rm=3' },
  { id: '9', name: ' Pancit Canton', price: 110, category: 'Pinoy', img: 'https://th.bing.com/th/id/OIP.Y4ext0OS-zkHtxgG2t1pCAHaE7?w=276&h=183&c=7&r=0&o=7&pid=1.7&rm=3' },
  { id: '10', name: ' Chicken Inasal', price: 180, category: 'Pinoy', img: 'https://th.bing.com/th/id/OIP.vfmOq4jeojNEdBQmdkOryQHaDP?w=348&h=153&c=7&r=0&o=7&pid=1.7&rm=3' },

 
  { id: '11', name: ' Fries', price: 80, category: 'Snacks', img: 'https://th.bing.com/th/id/OIP.ArPgw_JVtntN3Fh7xGMMSgHaHa?w=195&h=196&c=7&r=0&o=7&pid=1.7&rm=3' },
  { id: '12', name: ' Siomai', price: 90, category: 'Snacks', img: 'data:image/webp;base64,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' },

  
  { id: '13', name: ' Milk Tea', price: 95, category: 'Drinks', img: 'https://th.bing.com/th/id/OIP._SbxcDtxHz9zmZhycYu3HgHaF7?w=236&h=189&c=7&r=0&o=7&pid=1.7&rm=3' },
  { id: '14', name: ' Mango Shake', price: 85, category: 'Drinks', img: 'https://th.bing.com/th/id/OIP.aftQrBo9g1PpAfBst0MkhwHaHa?w=203&h=203&c=7&r=0&o=7&pid=1.7&rm=3' },
];

  const addToCart = (price: number, name: string) => {
    setCartTotal((prev) => prev + price);
    Alert.alert('Added to cart', name);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🍽️ CHRISTAN STORE</Text>
      <Text style={styles.subtitle}>Pinoy Favorites & More</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
        {['🍕 Burgers', '🍝 Pasta', '🥤 Drinks', 'Pinoy Foods'].map((cat) => (
          <View key={cat} style={styles.categoryChip}>
            <Text style={styles.categoryText}>{cat}</Text>
          </View>
        ))}
      </ScrollView>

      <SearchBar />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => Alert.alert('Welcome!', 'Browse and order your food 🍽️')}
        >
          <Text style={styles.primaryButtonText}>WELCOME TO CHRISTAN STORE</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <FlatList
        data={foods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.foodCard}>
            <Image source={{ uri: item.img }} style={styles.foodImage} />
            <View style={styles.foodInfo}>
              <Text style={styles.foodName}>{item.name}</Text>
              <Text style={styles.foodPrice}>₱ {item.price}</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => addToCart(item.price, item.name)}
              >
                <Text style={styles.addButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.cartBar}>
        <Text style={styles.cartText}>🛒 Total: ₱ {cartTotal}</Text>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => router.push('/orders')}
        >
          <Text style={styles.checkoutText}>View Orders</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.secondaryOutlineButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.secondaryOutlineText}>Show Modal</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalText}>This is a modal</Text>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => {
                setModalVisible(false);
                Alert.alert('Modal closed');
              }}
            >
              <Text style={styles.primaryButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#0F172A' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  subtitle: { color: '#CBD5E1', marginBottom: 10 },

  categories: { marginVertical: 10 },
  categoryChip: {
    backgroundColor: '#1E293B',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryText: { color: '#E5E7EB', fontSize: 12 },

  primaryButton: {
    backgroundColor: '#F97316',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  primaryButtonText: { color: '#fff', fontWeight: '600' },

  foodCard: {
    flexDirection: 'row',
    backgroundColor: '#020617',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  foodImage: { width: 90, height: 90 },
  foodInfo: { padding: 10, flex: 1 },
  foodName: { color: '#fff', fontWeight: '600' },
  foodPrice: { color: '#FBBF24', marginVertical: 4 },
  addButton: {
    backgroundColor: '#22C55E',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  addButtonText: { color: '#000', fontSize: 12 },

  cartBar: {
    backgroundColor: '#020617',
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
  },
  cartText: { color: '#fff', fontWeight: '600', marginBottom: 6 },
  checkoutButton: {
    backgroundColor: '#2563EB',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: { color: '#fff', fontWeight: '600' },

  secondaryOutlineButton: {
    borderWidth: 2,
    borderColor: '#2563EB',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  secondaryOutlineText: { color: '#93C5FD', fontWeight: '600' },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: '#020617',
    padding: 20,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  modalText: { color: '#fff', marginBottom: 10 },
});

