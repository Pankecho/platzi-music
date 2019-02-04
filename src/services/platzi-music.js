import trae from 'trae'
import configService from './config'

const platziService = trae.create({
  baseUrl: configService.apiURL
})

export default platziService
