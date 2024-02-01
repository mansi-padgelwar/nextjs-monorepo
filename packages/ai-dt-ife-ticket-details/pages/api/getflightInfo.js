// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { flightInfo } from '../../data/flightInfo'

export default function handler(req, res) {
  res.status(200).json(flightInfo)
}


