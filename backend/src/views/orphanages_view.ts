import Orphanage from '../models/Orphanages'
import imagesView from './images_view'

export default {
  render (orphanage: Orphanage) {
    return {
      id: orphanage.id,
      name: orphanage.name,
      latitude: Number(orphanage.latitude),
      longitude: Number(orphanage.longitude),
      about: orphanage.about,
      instructions: orphanage.instructions,
      open_hours: orphanage.open_hours,
      open_on_weekends: orphanage.open_on_weekends,
      images: imagesView.renderMany(orphanage.images)
    }
  },

  renderMany (orphanages: Orphanage[]) {
    return orphanages.map(orphanage => this.render(orphanage))
  }
}
