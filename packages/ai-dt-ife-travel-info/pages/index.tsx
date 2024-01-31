/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useState } from 'react'
import '../app/globals.css'
import styles from './styles/Home.module.css'
import FlightStatus from '../components/FlightStatus'
import FlightInformation from '../components/FlightInfo'
import {
  type GetServerSideProps,
  type GetServerSidePropsContext,
  type GetServerSidePropsResult
} from 'next'
import { type FlightDetails } from 'types/commonTypes'

export interface FlightInfo {
  current_local_time?: string
  city: string
  date: string
  details: FlightDetails[]
}

export type FlightsByLanguage = Record<string, FlightInfo[]>

export type InitialFlights = FlightsByLanguage[]

interface HomeProps {
  initialFlights: InitialFlights
  switchLanguage?: (lang: string) => void
}

export const switchLanguage = (
  initialFlights: InitialFlights,
  lang: string
): FlightInfo[] | undefined => {
  let selectedLanguage: keyof FlightsByLanguage | any

  for (const [languageKey, flights] of Object.entries(initialFlights)) {
    if (flights[lang] !== undefined) {
      selectedLanguage = languageKey
      break
    }
  }

  if (selectedLanguage !== undefined) {
    return initialFlights[selectedLanguage][lang]
  }

  return undefined
}

export const handleLanguage = (
  lang: string,
  setLanguage: React.Dispatch<React.SetStateAction<string>>,
  initialFlights: InitialFlights,
  setSelectedFlights: React.Dispatch<React.SetStateAction<FlightInfo[] | undefined>>): void => {
    setLanguage(lang);
    const newSelectedFlights = switchLanguage(initialFlights,lang);
    if(newSelectedFlights !== undefined){
      setSelectedFlights(newSelectedFlights); 
    }
}

function Home ({ initialFlights }: HomeProps): React.JSX.Element {
  const [isVisible, setIsVisible] = useState(false)
  const [language, setLanguage] = useState('en')
  const [selectedFlights, setSelectedFlights] = useState<FlightInfo[] | undefined>(initialFlights[0]?.en);
  const shouldRenderButtons = process.env.NODE_ENV === 'test'

 const handleLanguageClick = (lang: string): void => {
  handleLanguage(lang,setLanguage,initialFlights,setSelectedFlights);
 };

  if (typeof window !== 'undefined') {
    window.handleLanguage = handleLanguageClick
  }

  return (
    <div className={`${styles.container} ${isVisible ? styles.visible : ''}`}> {/* LINE 77*/ }
      {shouldRenderButtons && (
        <>
          <button
            onClick={() => {
              handleLanguageClick('en') 
            }}
          >
            English
          </button>
          <button
            onClick={() => {
              handleLanguageClick('hi')
            }}
          >
            Hindi
          </button>
          <button
            onClick={() => {
              handleLanguageClick('es')
            }}
          >
            es
          </button>
        </>
       )}
      <FlightStatus flightData={selectedFlights || []} />
      <div
        className={styles.statusContainer}
        data-testid="flight-details-container1"
      >
        {selectedFlights?.map(
          (flight: any, index: React.Key | null | undefined) => (
            <FlightInformation  
              key={index}
              {...flight}
              isVisible={isVisible}
              setIsVisible={setIsVisible}
            />
          )
        )}
      </div>
      {shouldRenderButtons && <div data-testid="language">{language}</div>}
    </div>
  )
}


export default Home

export let initialFlights = []

export const setInitialFlights = (flights: never[]): void => {
  initialFlights = flights
}
export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<HomeProps>> => {
  const { req } = context
  const res = await fetch(`http://${req.headers.host}/api/flights`)
  const flights = await res.json()
  setInitialFlights(flights)

  return {
    props: {
      initialFlights: flights
    }
  }
}
