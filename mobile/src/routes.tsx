import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Header from './components/Header'

import OrphanagesMap from './pages/OrphanagesMap'
import OrphanagesDetails from './pages/OrphanagesDetails'
import OrphanageData from './pages/CreateOrphanage/OrphanageData'
import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition'

const { Navigator, Screen } = createStackNavigator()

const Routes = () => (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5' } }}>
                <Screen
                    name='OrphanagesMap'
                    component={OrphanagesMap}/>
                <Screen
                    name='OrphanageDetails'
                    component={OrphanagesDetails}
                    options={{
                      headerShown: true,
                      header: () => <Header title='Orfanato' showCancel={false}/>
                    }}/>
                <Screen
                    name='SelectMapPosition'
                    component={SelectMapPosition}
                    options={{
                      headerShown: true,
                      header: () => <Header title='Selecione no mapa'/>
                    }}/>
                <Screen
                    name='OrphanageData'
                    component={OrphanageData}
                    options={{
                      headerShown: true,
                      header: () => <Header title='Informe os dados'/>
                    }}/>
            </Navigator>
        </NavigationContainer>
)

export default Routes
