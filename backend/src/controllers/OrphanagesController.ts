import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Orphanage from '../models/Orphanages'
import orphanageView from '../views/orphanages_view'
import * as Yup from 'yup'

export default {
  async create (req: Request, res: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      open_hours,
      open_on_weekends
    } = req.body

    const orphanagesRepository = getRepository(Orphanage)

    // eslint-disable-next-line no-undef
    const requestImages = req.files as Express.Multer.File[]
    const images = requestImages.map(image => {
      return { path: image.filename }
    })

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      open_hours,
      open_on_weekends: open_on_weekends === 'true',
      images
    }

    const schema = Yup.object().shape({
      name: Yup.string().required('Nome é obrigatório'),
      latitude: Yup.number().required('Latitude é obrigatório'),
      longitude: Yup.number().required('Longitutde é obrigatório'),
      about: Yup.string().required('Sobre é obrigatório').max(300),
      instructions: Yup.string().required('as instruções são obrigatórias'),
      open_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required('Imagem é obrigatório')
        })
      )
    })

    await schema.validate(data, {
      abortEarly: false
    })

    const orphanage = orphanagesRepository.create(data)

    await orphanagesRepository.save(orphanage)

    return res.status(201).json(orphanage)
  },

  async index (req: Request, res: Response) {
    const orphanagesRepository = getRepository(Orphanage)

    const orphanages = await orphanagesRepository.find({
      relations: ['images']
    })

    return res.json(orphanageView.renderMany(orphanages))
  },
  async show (req: Request, res: Response) {
    const { id } = req.params

    const orphanagesRepository = getRepository(Orphanage)

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images']
    })

    return res.json(orphanageView.render(orphanage))
  }
}
