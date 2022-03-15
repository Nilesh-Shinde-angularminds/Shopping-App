import React, { useEffect, useMemo, useState } from 'react'

export default function NaveBar(props) {

// const [count ,setCount] =useState(()=>JSON.parse(localStorage.getItem("count"))? JSON.parse(localStorage.getItem("count")):0)

    // let count =JSON.parse(localStorage.getItem("count"))
    // const count2 = useEffect(()=>{
    //         if( JSON.parse(localStorage.getItem("count")))
    //         {
    //             count = JSON.parse(localStorage.getItem("count"))
    //             // return(JSON.parse(localStorage.getItem("count")))
               
                
    //         }
        

    //       })
        //   const count3 = useMemo(()=>{
        //       return(JSON.parse(localStorage.getItem("count")))
        //   })
    
  return (
        <>
        <h1>
            <a href="/">My Ecommerce Site</a>
            <span className="pull-right">
                <a href="cart">Cart ({props.count})</a>
            </span>
        </h1>
        </>

  )

}
