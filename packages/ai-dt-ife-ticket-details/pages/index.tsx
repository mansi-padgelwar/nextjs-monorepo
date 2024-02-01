import  React, { useState } from 'react'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '../styles/Home.module.css'
import languages from '../data/languages.json';
import { GetServerSideProps } from 'next';
import { FlightInfo } from '../reusable-types/flightInfo';

const inter = Inter({ subsets: ['latin'] })

export const getServerSideProps:GetServerSideProps = async ({req, locale}:any) => {  
  const res = await fetch(`http://${req.headers.host}/api/getflightInfo`)
  const flightInfo = await res.json();
  return { 
    props: 
    { 
      flightInfo 
    } 
  } 
}

type TicketDetailsProps = {
  flightInfo: FlightInfo;
}

const TicketDetails: React.FC<TicketDetailsProps> = ({flightInfo}) => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  // const handleLanguage = (language:string) => {
  //   setSelectedLanguage(language);
  // }

  // if (typeof window !== "undefined") {
  //   const customWindow = window as CustomWindow;
  //   customWindow.handleLanguage = handleLanguage;
  // } 

  return (
    <>
      <Head>
        <title>IFE Ticket Details</title>
        <meta name="description" content="IFE - Ticket details app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/ai.png" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className='container d-flex justify-end'>
        </div>
        <div>
          <div style={{fontSize: '4rem'}}> {`${flightInfo?.carrierCode} ${flightInfo.flightNumber}`} </div>
          <div style={{fontSize: '2.5rem'}}> 
            <img src="/images/seat.png" style={{width:'1em'}} alt='Seat Image'/> 12 A </div>
          <div style={{fontSize: '1.3rem'}}>  {languages[selectedLanguage as keyof typeof languages].business} </div>
        </div>
      </main>
    </>
  )
}
export default TicketDetails