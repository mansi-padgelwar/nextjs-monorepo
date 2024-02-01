import React from 'react'
import styles from './CustomComponent.module.css'
import { type FlightDetails } from 'types/commonTypes'

const CustomComponent: React.FC<FlightDetails> = ({ title, subtitle }) => {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>{title}</h4>
      <h6 className={styles.subtitle}>{subtitle}</h6>
    </div>
  )
}

export default CustomComponent
