import React, { useEffect, useState } from 'react';
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
import axios from 'axios';


export default function KundliResult({ route }) {
  const [selectedSection, setSelectedSection] = useState('chart');
  const navigation = useNavigation();
  const { KundliData } = route.params;
  const [ planetsData,setPlanetsData] = useState()
  const [ birthDetails,setBirthDetails]  = useState()
  const [dashaData,setDashaData] = useState()
  const [kalsarpaData,setKalsarpaData] = useState()
  const [d1Svg,setD1Svg ] = useState()
  const [d9Svg,setD9Svg] = useState()
  const [d1CharData,setD1ChartData] = useState()
  const [d9CharData,setD9ChartData] = useState()
  const [astroKundliDetails,setAstroKundliDetails] = useState()
  const [ascendantReport,setAscendantReport] = useState()

  
  const day = parseInt(KundliData.day, 10);
  const month = parseInt(KundliData.month, 10);
  const year = parseInt(KundliData.year, 10);
  const hour = parseInt(KundliData.hour, 10);
  const min = parseInt(KundliData.min, 10);
  const lat = parseFloat(parseFloat(KundliData.lat).toFixed(4));
  const lon = parseFloat(parseFloat(KundliData.lon).toFixed(4));


  const requestBody = {
    day,
    month,
    year,
    hour,
    min,
    lat,
    lon,
    tzone: 5.5
  };
  
  const chartPayload = {
    day: requestBody.day,
    month: requestBody.month,
    year: requestBody.year,
    hour: requestBody.hour,
    min: requestBody.min,
    lat: requestBody.lat,
    lon: requestBody.lon,
    tzone: requestBody.tzone,
    planetColor: '#ff0000',
    signColor: '#00ff00',
    lineColor: '#0000ff',
    chartType: 'north',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [planets, birth, dasha, kalsarpa, d1, d9, d1Chart, d9Chart] = await Promise.all([
          axios.post('https://backend.navambhaw.com/v2/planets', requestBody),
          axios.post('https://backend.navambhaw.com/v2/birth_details', requestBody),
          axios.post('https://backend.navambhaw.com/v2/current_vdasha', requestBody),
          axios.post('https://backend.navambhaw.com/v2/kalsarpa_details', requestBody),
          axios.post('https://backend.navambhaw.com/v2/horo_chart_image/d1', chartPayload),
          axios.post('https://backend.navambhaw.com/v2/horo_chart_image/d9', chartPayload),
          axios.post('https://backend.navambhaw.com/v2/horo_chart/d1', requestBody),
          axios.post('https://backend.navambhaw.com/v2/horo_chart/d9', requestBody),
        ]);
        // console.log('Planets Data:', planets.data);
        // console.log('Birth Details:', birth.data);
        // console.log('Dasha Data:', dasha.data);
        // console.log('Kalsarpa Data:', kalsarpa.data);
        // console.log('D1 SVG:', d1.data);
        // console.log('D9 SVG:', d9.data);
        // console.log('D1 Chart Data:', d1Chart.data);
        // console.log('D9 Chart Data:', d9Chart.data);
        setPlanetsData(planets.data.message || []);
        setBirthDetails(birth.data.message || {});
        setDashaData(dasha.data.message || {});
        setKalsarpaData(kalsarpa.data.message || {});
        setD1Svg(d1.data.message.svg || '');
        setD9Svg(d9.data.message.svg || '');
        setD1ChartData(d1Chart.data.message || []);
        setD9ChartData(d9Chart.data.message || []);
      } catch (err) {
        // setError(err.message);
        console.log('error occur in first',err)
      } finally {
        // setLoading(false);
      }
    };
    fetchData();
    console.log(KundliData)
  }, [])
  
  useEffect(() => {
    const fetchAstroKundliDetails = async () => {
      // setAstroKundliLoading(true);
      // setAstroKundliError(null);
      try {
        const res = await axios.post('https://backend.navambhaw.com/v2/astro_deatils', chartPayload);
        if (res.data && res.data.success) {
          console.log("astrokundli",res.data)
          setAstroKundliDetails(res.data.message);
        } else {
          // setAstroKundliError('Failed to fetch astro details');
        }
      } catch (err) {
        console.log('error occur in second',rr)
        // setAstroKundliError('Failed to fetch astro details');
      } finally {
        // setAstroKundliLoading(false);
      }
    };
    fetchAstroKundliDetails();
  }, []);
  
  useEffect(() => {
    // Fetch General Ascendant Report
    const fetchAscendantReport = async () => {
      // setAscendantReportLoading(true);
      // setAscendantReportError(null);
      try {
        const res = await axios.post('https://backend.navambhaw.com/v2/genral_ascendant_report', chartPayload);
        if (res.data && res.data.success) {
          console.log("ascednat",res.data)
          setAscendantReport(res.data.message.asc_report);
        } else {
          // setAscendantReportError('Failed to fetch ascendant report');
        }
      } catch (err) {
        console.log('error occur in third',err)
        // setAscendantReportError('Failed to fetch ascendant report');
      } finally {
        // setAscendantReportLoading(false);
      }
    };
    fetchAscendantReport();
  }, []);

  const renderSection = () => {
    switch (selectedSection) {
      case 'basic':
        return (
          <ScrollView>
            <BirthDetails  birthDetails={birthDetails}/>
            <KalsarpaSection kalsarpaData={kalsarpaData}/>
          </ScrollView>
        );
      case 'Summary':
        return (
          <ScrollView>
            <ExtraBirthDetails astroKundliDetails={astroKundliDetails}  />
            <KundliSummarySection planetsData={planetsData} />
          </ScrollView>
        );
      case 'planet':
        return (
          <ScrollView> 
            <PlanetsSection planetsData={planetsData} />
          </ScrollView>
        );
      case 'chart':
        return (
          <ScrollView>
            <HoroChartSection d1Svg={d1Svg} d1CharData={d1CharData} d9Svg={d9Svg} d9CharDat={d9CharData} />
          </ScrollView>
        );
      case 'dosha':
        return (
          <ScrollView>
            <AscendantReport ascendantReport={ascendantReport} />
            <DashaSection dashaData={dashaData}/>
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
