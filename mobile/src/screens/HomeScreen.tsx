import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const categories = [
  {
    name: 'Neurofeedback',
    icon: 'school-outline' as const,
    color: '#0ea5e9',
  },
  {
    name: 'PBM Therapy',
    icon: 'flash-outline' as const,
    color: '#a855f7',
  },
  {
    name: 'HRV Tracking',
    icon: 'heart-outline' as const,
    color: '#22c55e',
  },
  {
    name: 'Community',
    icon: 'people-outline' as const,
    color: '#f97316',
  },
];

export function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>PBM Knowledge Hub</Text>
        <Text style={styles.subtitle}>
          Your comprehensive resource for photobiomodulation education and wellness
        </Text>
      </View>

      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Explore Categories</Text>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.categoryCard, { borderLeftColor: category.color }]}
          >
            <Ionicons name={category.icon} size={32} color={category.color} />
            <View style={styles.categoryContent}>
              <Text style={styles.categoryName}>{category.name}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.featuresContainer}>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>📚</Text>
          <Text style={styles.featureName}>Rich Content Library</Text>
          <Text style={styles.featureDescription}>
            Access research papers and educational materials
          </Text>
        </View>
        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>💓</Text>
          <Text style={styles.featureName}>HRV Tracking</Text>
          <Text style={styles.featureDescription}>
            Monitor your heart rate variability with guided breathing
          </Text>
        </View>
        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>🤝</Text>
          <Text style={styles.featureName}>Community Support</Text>
          <Text style={styles.featureDescription}>Connect with experts and share experiences</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    padding: 24,
    backgroundColor: '#0ea5e9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  categoriesContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1f2937',
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryContent: {
    flex: 1,
    marginLeft: 16,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  featuresContainer: {
    padding: 16,
    paddingTop: 0,
  },
  featureCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  featureName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1f2937',
  },
  featureDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
});
