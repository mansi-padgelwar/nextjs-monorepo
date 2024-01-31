// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiResponse } from "next";

export default function handler(req:Request, res:NextApiResponse ) {
  res.status(200).json({
    "carrierCode": "AI",
    "flightNumber": "173",
    "origin": "DEL",
    "destination": "SFO",
    "originAirPortName": "New Delhi",
    "destinationAirPortName": "San Fransisco",
    "totalJourneyTime": "15h 30m",
    "scheduledDepartureDate": "21-NOV-2023",
    "scheduledArrivalDate": "21-NOV-2023",
    "scheduledDepartureTime": "04:00",
    "scheduledDepartureTerminal": "3",
    "scheduledDepartureGate": "23A",
    "scheduledArrivalTime": "06:00",
    "scheduledArrivalTerminal": "1" 
  })
}


