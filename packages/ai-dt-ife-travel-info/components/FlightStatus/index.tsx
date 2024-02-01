import React from 'react'
import styles from './FlightStatus.module.css'
import { PiAirplaneTiltFill } from 'react-icons/pi'
import { type FlightInfo } from 'data/flights'
import CustomIcons from "@nextjs-monorepo/shared/CustomIcons/index"


type NullableFlightInfoArray = FlightInfo[] | null

interface FlightStatusProps {
  flightData: NullableFlightInfoArray
}

interface StatusProps {
  flightData: FlightInfo[]
}

const FlightStatus: React.FC<FlightStatusProps> = ({ flightData }) => {
  if (!flightData || flightData.length === 0) {
    return null
  }

  return (
    <div className={styles.FlightStatusContainer}>
      <Status flightData={flightData} />
    </div>
  )
}

const Status: React.FC<StatusProps> = ({ flightData }) => {
  const firstFlight = flightData[0]

  const { current_local_time, details } = firstFlight

  return (
    <div className={styles.StatusContainer}>
      <p className={styles.FlightNumber}>{current_local_time}: 3pm</p>
      <FlightPath />
      <p className={styles.StatusTime}>
        {
          details.find(
            (detail: { title: string }) =>
              detail.title === 'Scheduled Departure'
          )?.subtitle
        }
      </p>
    </div>
  )
}

const FlightPath: React.FC = () => {
  return (
    <div className={styles.FlightPathContainer}>
      <div className={styles.PlaneContainer}>
        <CustomIcons icon={PiAirplaneTiltFill} iconSize={32} className="TiltRight" />
        {/* <PiAirplaneTiltFill size={32} className={styles.TiltRight} /> */}
      </div>
      <div className={`${styles.AirportCode} ${styles.SourceCode}`}>DEL</div>
      <div className={`${styles.AirportCode} ${styles.DestinationCode}`}>
        SFO
      </div>
    </div>
  )
}

export default FlightStatus
