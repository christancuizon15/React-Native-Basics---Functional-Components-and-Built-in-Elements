import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function OrdersScreen() {
  const orders = [
    { id: '1', name: 'Chicken Adobo x1' },
    { id: '2', name: 'Sinigang x1' },
    { id: '3', name: 'Burger x2' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧾 Your Orders</Text>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text style={styles.orderText}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#0F172A', flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  orderItem: {
    backgroundColor: '#020617',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  orderText: { color: '#E5E7EB' },
});