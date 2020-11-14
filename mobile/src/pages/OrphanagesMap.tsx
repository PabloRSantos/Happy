import React from 'react'
import { Dimensions, TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import { Feather } from '@expo/vector-icons'

import { useNavigation } from '@react-navigation/native'

import mapMarker from '../images/map-marker.png'

const OrphanagesMap: React.FC = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: -29.8915911,
        longitude: -50.2652567,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008
      }}>
        <Marker
          icon={mapMarker}
          calloutAnchor={{
            x: 2.5,
            y: 0.8
          }}
          coordinate={{
            latitude: -29.8915911,
            longitude: -50.2652567
          }}>
             <Callout tooltip onPress={() => navigation.navigate('OrphanageDetails')}>
               <View style={styles.calloutContainer}>
                 <Text style={styles.calloutText}>Lar das meninas</Text>

               </View>
             </Callout>
           </Marker>
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>2 orfanatos encontrado</Text>
        <TouchableOpacity
          style={styles.createOrphanageButton}
          onPress={() => {}}>
            <Feather name='plus' size={20} color='#fff'/>
        </TouchableOpacity>
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
