import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Dashboard = () => {
  // Dummy data for demonstration
  const totalEarnings = 12500;
  const availableBalance = 3200;

  return (
    <View style={styles.container}>
      <View style={styles.balanceRow}>
        <View style={[styles.balanceCard, styles.shadow]}>
          <Text style={styles.label}>Total Earnings</Text>
          <Text style={styles.amount}>₹{totalEarnings.toLocaleString()}</Text>
        </View>
        <View style={[styles.balanceCard, styles.shadow]}>
          <Text style={styles.label}>Available Balance</Text>
          <Text style={[styles.amount, { color: '#388e3c' }]}>₹{availableBalance.toLocaleString()}</Text>
        </View>
      </View>
      <View style={styles.chartSection}>
        <View style={styles.chartCard}>
          {/* Placeholder for chart */}
          <Text style={styles.chartPlaceholderText}>Your earnings chart will appear here</Text>
        </View>
      </View>
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4FF',
    paddingHorizontal: 18,
    paddingTop: 24,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  balanceCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 18,
    marginHorizontal: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3E6F9',
  },
  label: {
    fontSize: 15,
    color: '#7B1FA2',
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A148C',
    letterSpacing: 0.5,
  },
  shadow: {
    shadowColor: '#7B1FA2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  chartSection: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  chartCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E1BEE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    padding: 12,
    minHeight: 180,
  },
  chartPlaceholderText: {
    color: '#B39DDB',
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
})