import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import PreLoader from '../component/PreLoader'
import React, { use, useEffect, useState } from 'react'


import { gsap } from 'gsap'
import  styles from '../styles/Home.module.css'
import preStyle from '../styles/PreLoader.module.css'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {

    const header = React.createRef();
    const contain = React.createRef();

  const pre = React.createRef();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
        },9000)

    }, [])

    useEffect(() => {
      gsap.to(header.current, {color: "rgb(255, 255, 255)", y:10, opacity: 1, scale: 1,  duration: 2});
    }, [header]);

    useEffect(() => {
      gsap.to(contain.current, { opacity: 1, scale: 1,  duration: .5});
    }, [contain]);

  



  return (
    <div className={ styles.container }>
      <Head>
        <title>PreLoader</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {

        loading ?

        <PreLoader  noOfCircles={7} />

        :
        <div className={ styles.wrapper } ref={ contain }>
          <main className={ styles.main }>
          <h1 ref={header} className={ styles.mainTitle}>Home Page</h1>
          </main>
        </div>  
        

      }

      



    </div>
  )
}
