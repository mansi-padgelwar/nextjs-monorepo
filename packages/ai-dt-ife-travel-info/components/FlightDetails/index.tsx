import React from 'react'
import styles from './FlightDetails.module.css'
import CustomComponent from '../CustomComponent'
import { FlightDetails } from 'types/commonTypes'

interface FlightDetailsProps {
  details: FlightDetails[]
}

const FlightDetails: React.FC<FlightDetailsProps> = ({ details }) => {
  return (
    <div
      className={styles.flightDetailsContainer}
      data-testid="flight-details-container"
    >
      {details?.map(({ title, subtitle }) => (
        <CustomComponent key={title} title={title} subtitle={subtitle} />
      ))}
    </div>
  )
}

export default FlightDetails
