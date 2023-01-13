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


    // updation
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

  

    
    // initiation
    useEffect(()=>{
      let x = -1*radius*Math.sin((Math.PI/180)*radialDistribution*obj)
      let y =  radius*Math.cos((Math.PI/180)*radialDistribution*obj);
      setCoor([x,y])

      setTimeout(()=>{
        if(pre &&  pre.current){
          
          pre.current.style.height = '100vh'
          pre.current.style.width = '100vw'
          pre.current.style.zIndex = 100000
          pre.current.style.borderRadius = 0
               
          pre.current.style.background = "rgba(0, 0, 0)"
  
        }
      },(noOfCircles+1)*animationDelay)


    },[])



    return <div 
            className={ preStyle[`mainCircle`]} 
            ref={ obj==noOfCircles-1 ? pre : null }
            style={{zIndex:10*(noOfCircles - obj),transform: `translateX(${coor[0]}px) translateY(${coor[1]}px) `, transition: `transform ${animationDelay}ms, height ${animationDelay}ms, width ${animationDelay}ms`, background:color}}
            ></div>
    
  }

    
  
    return(
      
      <div className={ preStyle.wrap }>      
        {
          [...Array(noOfCircles).keys()].map((obj,i)=>{
            let color = generateRandomColor()
            return <Circle key={i} obj={i} color={color}/>
          })
        }
    </div>
    
    )
}

export default PreLoader;