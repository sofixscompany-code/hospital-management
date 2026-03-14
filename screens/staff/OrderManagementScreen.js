
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';

const API_URL = 'http://localhost:8000'; // Assuming your backend is running locally on port 8000

const OrderManagementScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/order/list`);
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data);
    } catch (e) {
      setError(e.message);
      Alert.alert('Error', 'Could not fetch orders. Please make sure the server is running.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleUpdateStatus = async (orderId, status) => {
    try {
      const response = await fetch(`${API_URL}/order/update-status?order_id=${orderId}&status=${status}`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Failed to update order status');
      }
      // Refresh the orders list
      fetchOrders();
    } catch (e) {
      Alert.alert('Error', 'Could not update order status.');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.centered} />;
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
        <Button title="Retry" onPress={fetchOrders} />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.orderContainer}>
      <Text style={styles.orderId}>Order #{item.id} - Table {item.table_number}</Text>
      <Text>Status: {item.status}</Text>
      <View style={styles.itemsContainer}>
        {item.items.map(product => (
          <Text key={product.id}>{product.name} x {product.quantity}</Text>
        ))}
      </View>
      <View style={styles.buttonsContainer}>
        <Button title="Accept" onPress={() => handleUpdateStatus(item.id, 'accepted')} />
        <Button title="Preparing" onPress={() => handleUpdateStatus(item.id, 'preparing')} />
        <Button title="Ready" onPress={() => handleUpdateStatus(item.id, 'ready')} />
        <Button title="Delivered" onPress={() => handleUpdateStatus(item.id, 'delivered')} />
      </View>
    </View>
  );

  return (
    <FlatList
      data={orders}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
      onRefresh={fetchOrders}
      refreshing={loading}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 16,
  },
  orderContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemsContainer: {
    marginTop: 8,
    marginBottom: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
});

export default OrderManagementScreen;
