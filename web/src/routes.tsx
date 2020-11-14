import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import CreateOrphanage from './pages/CreateOrphanage'
import Landing from './pages/Landing'
import Orphanage from './pages/Orphanage'
import OrphanagesMap from './pages/OrphanagesMap'

function Routes () {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Landing} exact/>
        <Route path='/app' component={OrphanagesMap}/>
        <Route path='/orphanage/:id' component={Orphanage} exact/>
        <Route path='/orphanages/create' component={CreateOrphanage} exact/>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
