import React, { useEffect, useState } from 'react'
import { Dimensions, View, Text, StyleSheet, Alert } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import { Feather } from '@expo/vector-icons'
import * as Location from 'expo-location'

import { useNavigation, useFocusEffect } from '@react-navigation/native'

import mapMarker from '../images/map-marker.png'
import { RectButton } from 'react-native-gesture-handler'
import api from '../services/api'

interface Orphanage {
  id: number,
  name: string,
  latitude: number,
  longitude: number
}

const OrphanagesMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([])
  const [userLocation, setUserLocation] = useState({ latitude: 0, longitude: 0 })

  const navigation = useNavigation()

  useFocusEffect(() => {
    api.get('orphanages')
      .then(response => setOrphanages(response.data))
  })

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied')
      }

      const { coords } = await Location.getCurrentPositionAsync()

      setUserLocation({
        latitude: coords.latitude,
        longitude: coords.longitude
      })
    })()
  }, [])

  const handleNavigateToOrphanageDetails = (id: number) => {
    navigation.navigate('OrphanageDetails', { id })
  }

  return (
    <View style={styles.container}>
      {userLocation.latitude !== 0 && (
        <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008
      }}>
        {orphanages.map(orphanage => (
            <Marker
            key={orphanage.id}
            icon={mapMarker}
            calloutAnchor={{
              x: 2.5,
              y: 0.8
            }}
            coordinate={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude
            }}>
                <Callout tooltip onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutText}>{orphanage.name}</Text>
                  </View>
                </Callout>
              </Marker>
        ))}
      </MapView>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>{orphanages.length} orfanatos encontrado</Text>
        <RectButton
          style={styles.createOrphanageButton}
          onPress={() => navigation.navigate('SelectMapPosition')}>
            <Feather name='plus' size={20} color='#fff'/>
        </RectButton>
      </View>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center'
  },
  calloutText: {
    color: '#0089a5',
    fontSize: 14,
    fontFamily: 'Nunito_700Bold'
  },
  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#FFF',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3
  },
  footerText: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_700Bold'
  },
  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default OrphanagesMap
