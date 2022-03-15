import axios from 'axios'
import React, { useEffect, useState } from 'react'
import NaveBar from './NaveBar'
import { ToastContainer, toast } from "react-toastify";


export default function PlaceOrder() {
  const [localStorageData, setlocalStorageData]=useState(JSON.parse(localStorage.getItem("mainObj")) ? JSON.parse(localStorage.getItem("mainObj")) : '') 
  let [count,setCount]  = useState(0)
  let totalAmount= localStorageData.map((itms)=>itms.quntity).reduce((pv, cv) => pv + cv, 0)

  const data= localStorageData.map((itms)=>{
    return(
        {
            productID: itms.id,
            qty: itms.quntity,
            price: itms.price,
            total:(itms.quntity*itms.price)

        }
    )
})


  const [toPostData, setToPostData]=useState({
    personName: "",
    deliveryAddress: "",
    productsOrdered:data,
    orderTotal: totalAmount
      
  })

  function SetInformation(e)
  {

      const {name , value}=e.target
      setToPostData((prv)=>({...prv, [name]:value}))

  }
  function postData()
  {
    axios.post(' http://interviewapi.ngminds.com/api/placeOrder', toPostData)
    .then(response => toast('Placed Succesfuly', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })
    )
    .catch(error => {
        console.error('There was an error!', error);
    });

  }
  useEffect(()=>{

    if(JSON.parse(localStorage.getItem("mainObj")))
    { setCount(JSON.stringify(JSON.parse(localStorage.getItem("mainObj")).length))
      setlocalStorageData(JSON.parse(localStorage.getItem("mainObj")))
    }
  },[])
  
  
  
  
  
  
  
  return (
      <>
    <div className="container">
        <div className="row">
        <NaveBar count={count}/>
            <hr/>
            <div className="col-md-12">
                <div className="panel panel-default">
                    <div className="panel-heading">Place Order</div>
                    <div className="panel-body">
                        <form className="form-horizontal"  role="form" >

                            <table className="table table-striped">
                                <thead className="table-head">
                                    <tr>
                                        <td>Product Name</td>
                                        <td> Quntity</td>
                                        <td> SubTotal</td>
                                    </tr>
                                </thead>
                                <tbody>
                                   {
                                     localStorageData && 
                                     localStorageData.map((itms , count)=>{
                                       return(
                                        
                                        <tr key ={count}>
                                        <td>{itms.name}</td>
                                        <td>{itms.quntity}</td>
                                        <td><i className="fa fa-inr"></i>{itms.quntity * itms.price}</td>
                                    </tr>
                                   
                                        
                                       )
                                     })
                                   }
                                    <tr>
                                        <td><strong>Total</strong></td>
                                        <td>
                                            <strong>{totalAmount}</strong>
                                        </td>
                                        <td><strong><i className="fa fa-inr"></i>{localStorageData.map((itms)=>itms.quntity*itms.price).reduce((pv, cv) => pv + cv, 0)} </strong></td>
                                    </tr>
                                </tbody>
                            </table>
                            <br />

                            <br />
                            <div className="form-group">
                                <label htmlFor="inputName3" className="col-sm-2 control-label">Enter Order Details</label>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputName3" className="col-sm-2 control-label">Name</label>
                                <div className="col-sm-6">
                                    <input className="form-control"value={toPostData.personName} name="personName" onChange={(e)=>SetInformation(e)} id="inputName3" placeholder="Name"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputEmail3" className="col-sm-2 control-label">Address</label>
                                <div className="col-sm-6">
                                    <textarea name="deliveryAddress" onChange={(e)=>SetInformation(e)} value={toPostData.deliveryAddress} className="form-control" id="inputEmail3"
                                        placeholder="Deliver Address"></textarea>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label"></label>
                                <div className="col-sm-6">
                                    <a  onClick={()=>postData()} type='button' className="btn btn-warning">Confirm Order</a>
                                </div>
                            </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>
      </>
  )
}
 