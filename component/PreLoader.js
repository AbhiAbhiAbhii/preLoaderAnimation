import preStyle from '../styles/PreLoader.module.css'

//gsap imports
import { gsap } from 'gsap'
//useEffect & useState
import React, { useEffect, useState } from 'react'


function generateRandomColor(){
  let maxVal = 0xFFFFFF; // 16777215
  let randomNumber = Math.random() * maxVal; 
  randomNumber = Math.floor(randomNumber);
  randomNumber = randomNumber.toString(16);
  let randColor = randomNumber.padStart(6, 0);   
  return `#${randColor.toUpperCase()}`
}


const PreLoader = ({noOfCircles=6, animationDelay=1000}) => {

  const pre = React.createRef();

  const Circle = ({obj, color}) => {
    const [coor,setCoor] = useState([0,0])
    const [counter,setCounter] = useState(1)
    const [updationCounter,setUpdationCounter] = useState(1)
    const [toggle,setToggle] = useState(false)
    
    let radius = -100
    let radialDistribution =360/noOfCircles 

    useEffect(()=>{
      setTimeout(()=>{
        if(counter>=obj+1){
          let x =  -1*radius*Math.sin((Math.PI/180)*radialDistribution*(obj+updationCounter))
          let y =  radius*Math.cos((Math.PI/180)*radialDistribution*(obj+updationCounter));
          setCoor([x,y])
          setUpdationCounter(updationCounter+1)
        }
        setCounter(counter+1)
        setToggle(!toggle)
      },animationDelay)

    },[toggle])

  
    
    // setInterval(()=>{
    //   let x =  -1*radius*Math.sin((Math.PI/180)*radialDistribution*(obj+i))
    //   let y =  radius*Math.cos((Math.PI/180)*radialDistribution*(obj+i));
    //   i=i+1
    //   if (obj==1){
    //     console.log(x,y)
    //   }
    //   setCoor([x,y])
    // },animationDelay*(obj+1))

    setTimeout(()=>{
      if(pre &&  pre.current){
        
        pre.current.style.height = '200vh'
        pre.current.style.width = '200vw'
        pre.current.style.zIndex = 100000     
        pre.current.style.background = "rgba(0, 0, 0)"

      }
    },(noOfCircles+1)*animationDelay)
    
    useEffect(()=>{
      let x = -1*radius*Math.sin((Math.PI/180)*radialDistribution*obj)
      let y =  radius*Math.cos((Math.PI/180)*radialDistribution*obj);
      setCoor([x,y])
    },[])
    return <div 
            className={ preStyle[`mainCircle`]} 
            ref={ obj==noOfCircles-1 ? pre : null }
            style={{zIndex:10*(noOfCircles - obj),transform: `translateX(${coor[0]}px) translateY(${coor[1]}px) `, transition: `transform ${animationDelay}ms, height ${animationDelay}ms, width ${animationDelay}ms`, background:color}}
            ></div>
    
  }

  useEffect(() => {
    setTimeout(() => {
      gsap.to(pre.current,{ background: "rgba(0, 0, 0)", borderRadius: 0})
    },animationDelay*(noOfCircles+1))
  }, [])
    
  
    return(
      <div className={ preStyle.wrap }>      
        {
          [...Array(noOfCircles).keys()].map((obj,i)=>{
            let color = generateRandomColor()
            return <Circle key={i} obj={i} color={color}/>
          })
        }
        {/* {
          [['translateY(100px)','circle4 3s linear','1.4s','rgb(52, 169, 232)' ],
          ['translateY(-100px)','circle 3s linear','0s','rgb(38, 206, 114)' ],
          ['translateX(100px)','circle2 4.4s linear','.7s','rgb(167, 37, 227)' ],
          ['translateX(-100px)','circle3 1.5s linear','2.2s','rgb(67, 173, 152)' ]].map((obj,i)=>{
            return <Circle obj={obj}/>
            
            
          })
        } */}
          {/* <div className={ preStyle.circle}></div>
          <div className={ preStyle.circle2} ref={ pre }></div>
          <div className={ preStyle.circle3}></div>
          <div className={ preStyle.circle4}></div> */}
          {/* <div className={ preStyle.circle5}></div>
          <div className={ preStyle.circle6}></div>
          <div className={ preStyle.circle7}></div>
          <div className={ preStyle.circle8}></div>
          <div className={ preStyle.circle9}></div>
          <div className={ preStyle.circle10}></div>
          <div className={ preStyle.circle11}></div>
          <div className={ preStyle.circle12}></div> */}
          {/* 12circles */}
    </div>
    )
}

export default PreLoader;