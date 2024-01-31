import React, { useState} from 'react';
import Head from 'next/head'
import Image from 'next/image';
import { Inter } from 'next/font/google'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styles from './index.module.css'
import { languages } from '../data/languages'
import { NextFont } from 'next/dist/compiled/@next/font';

const inter: NextFont = Inter({ subsets: ['latin'] })
declare global {
  interface Window {
    Android?: any;
    handleLanguage?: Function
  }
}
interface Languages {
  en: { pair_earphone: string; waiting_to_pair: string; close: string; };
  hi: { pair_earphone: string; waiting_to_pair: string; close: string; };
  es: { pair_earphone: string; waiting_to_pair: string; close: string; };
}

export async function getServerSideProps({ req, locale }: { req: Request, locale: any }) {

  const res: Response = await fetch(`http://${(req.headers as any).host}/api/getflightInfo`);
  const flightInfo = await res.json();
  return {
    props: {
      flightInfo
    }
  }
}

export default function Home() {
  // const { t } = useTranslation();
  // const { locale } = useRouter();
  const [openDeviceWrapper, setOpenDeviceWrapper] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const onOpenWrapper = (): void => {
    setOpenDeviceWrapper(true);
    if (window.Android)
     window.Android.triggerOverlayOpen();
  }

  const onCloseWrapper = (): void => {
    setOpenDeviceWrapper(false);
  }

  const handleTransitionEnd: React.TransitionEventHandler<HTMLDivElement> = (): void => {
    if (window.Android) {
      !openDeviceWrapper && window.Android.triggerOverlayClose();
    }
  }

  const handleLanguage = (language: string): void => {
    setSelectedLanguage(language);
  }

  if (typeof window !== "undefined") {
    window.handleLanguage = handleLanguage;
  }

  return (
    <>
      <Head>
        <title >IFE Device Connectivity</title>
        <meta name="description" content="IFE - Device connecting app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/ai.png" />
      </Head>
      <main className={`${styles.main} ${inter.className} ${openDeviceWrapper && styles.mainbgdark}`}>
        {/* <div className={`${openDeviceWrapper ? styles.showouterContainer : styles.outerContainer}`}></div> */}
        <div onTransitionEndCapture={handleTransitionEnd} className={`${styles.deviceWrapper} ${openDeviceWrapper && styles.deviceWrapperOpen}`}></div>
        <div className={`${styles.deviceContainer}`}>
          <div className={`${openDeviceWrapper ? styles.bluetoothImgExpanded : styles.bluetoothImg}`}>
            <Image
              src="/images/Bluetooth.png" // Route of the image file
              height={60} // Desired size with correct aspect ratio
              width={60} // Desired size with correct aspect ratio
              alt="bluetooth"
            />
          </div>
          <div className={`${styles.earphoneContainer} ${openDeviceWrapper && styles.earphoneContainerExpanded}`}>
            <div>
              <Image
                src="/images/earphone.png" // Route of the image file
                height={50} // Desired size with correct aspect ratio
                width={50} // Desired size with correct aspect ratio
                alt="earphone"
              />
              {/* <FiHeadphones  className={`${styles.earphoneImg}`}/> */}
            </div>
            <div data-testid="device-wrapper" className={`${styles.pairEPText} ${openDeviceWrapper && styles.pairEPTextHide}`} onClick={onOpenWrapper}>
              {/* {t('pair_earphone')}  */}
              {languages[selectedLanguage as keyof Languages].pair_earphone}
            </div>
          </div>
          <div className={`${styles.pairEPTextEnlarged} ${openDeviceWrapper && styles.showEPTextEnlarged}`}>
            {/* {t('waiting_to_pair')} */}
            {languages[selectedLanguage as keyof Languages].waiting_to_pair}
          </div>
        </div>

        <div data-testid="close-btn" className={`${styles.closeWrapperBtn} ${openDeviceWrapper ? styles.closeWrapperBtnShow : styles.closeWrapperBtnHide}`} onClick={onCloseWrapper}>
          {/* {t('close')} */}
          {languages[selectedLanguage as keyof Languages].close}
        </div>
      </main>
    </>
  )
}
