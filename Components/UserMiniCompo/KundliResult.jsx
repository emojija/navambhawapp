import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';

import BirthDetails from './Kundliparts/BirthDetails';
import AscendantReport from './Kundliparts/AscendantReport';
import DashaSection from './Kundliparts/DashaSection';
import ExtraBirthDetails from './Kundliparts/ExtraBirthDetails';
import HoroChartSection from './Kundliparts/HoroChartSection';
import KalsarpaSection from './Kundliparts/KalsarpaSection';
import KundliSummarySection from './Kundliparts/KundliSummarySection';
import PlanetsSection from './Kundliparts/PlanetsSection';


export default function KundliResult({ route }) {
  const [selectedSection, setSelectedSection] = useState('chart');
  const navigation = useNavigation();
  const { KundliData } = route.params;

  const renderSection = () => {
    switch (selectedSection) {
      case 'basic':
        return (
          <ScrollView>
            <BirthDetails />
            <KalsarpaSection />
          </ScrollView>
        );
      case 'Summary':
        return (
          <ScrollView>
            <ExtraBirthDetails />
            <KundliSummarySection />
          </ScrollView>
        );
      case 'planet':
        return (
          <ScrollView>
            <PlanetsSection />
          </ScrollView>
        );
      case 'chart':
        return (
          <ScrollView>
            <HoroChartSection />
          </ScrollView>
        );
      case 'dosha':
        return (
          <ScrollView>
            <AscendantReport />
            <DashaSection />
          </ScrollView>
        );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Top Bar with Back Arrow and Heading */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <ArrowLeftIcon size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Kundli and Birth Details</Text>
      </View>

      {/* Selection Bar */}
      <View style={styles.selectionBar}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedSection === 'basic' && styles.activeTab,
          ]}
          onPress={() => setSelectedSection('basic')}
        >
          <Text
            style={[
              styles.tabText,
              selectedSection === 'basic' && styles.activeTabText,
            ]}
          >
            Basic
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedSection === 'planet' && styles.activeTab,
          ]}
          onPress={() => setSelectedSection('planet')}
        >
          <Text
            style={[
              styles.tabText,
              selectedSection === 'planet' && styles.activeTabText,
            ]}
          >
            Planet
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedSection === 'chart' && styles.activeTab,
          ]}
          onPress={() => setSelectedSection('chart')}
        >
          <Text
            style={[
              styles.tabText,
              selectedSection === 'chart' && styles.activeTabText,
            ]}
          >
            Chart
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedSection === 'dosha' && styles.activeTab,
          ]}
          onPress={() => setSelectedSection('dosha')}
        >
          <Text
            style={[
              styles.tabText,
              selectedSection === 'dosha' && styles.activeTabText,
            ]}
          >
            Dosha
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedSection === 'remedy' && styles.activeTab,
          ]}
          onPress={() => setSelectedSection('remedy')}
        >
          <Text
            style={[
              styles.tabText,
              selectedSection === 'remedy' && styles.activeTabText,
            ]}
          >
            Remedy
          </Text>
        </TouchableOpacity>
      </View>

      {/* Section Content */}
      {/* <View style={styles.sectionContainer}>{renderSection()}</View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 2,
    // paddingTop: 8,
    // paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  backButton: {
    marginRight: 8,
    padding: 4,
    borderRadius: 20,
    // backgroundColor: "#f3e6f2", // subtle purple background if needed
  },
  topBarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    // marginLeft: 4,
  },
  selectionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tabButton: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 50,
  },
  tabText: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  activeTab: {
    backgroundColor: '#580A46',
  },
  activeTabText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  sectionContainer: {
    flex: 1,
    padding: 12,
  },
});
