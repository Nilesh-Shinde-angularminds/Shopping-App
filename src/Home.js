import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import NaveBar from "./NaveBar";
import Pagination from "./Pagination";
// import {Redirect} from "react-router-dom
//http://assignment.ngminds.com/shopping.pdf

export default function Home() {
  const history = useHistory();
  const [dataFromApi, setDataFromApi] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  let [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(5);

  const [AllDataLength, setAllDataLength] = useState(); // setLastPageIndex( Math.ceil(response.data.products.length/itemsPerPage))}

  const fetch2 = useEffect(() => {
    fetch();
    return setDataFromApi([]);
  }, [start, end]);

  function fetch() {
    axios
      .get("http://interviewapi.ngminds.com/api/getAllProducts")
      .then((response) => {
        setDataFromApi(response.data.products.slice(start, end));
        setAllDataLength(Math.ceil(response.data.products.length));
      });
  }


  useEffect(() => {
    setStart(itemsPerPage * currentPage);
    setEnd(itemsPerPage * currentPage + itemsPerPage);
  }, [itemsPerPage, currentPage]);



  let [localData, setLocalData] = useState(
    JSON.parse(localStorage.getItem("mainObj"))
      ? JSON.parse(localStorage.getItem("mainObj"))
      : []
  );

  useEffect(() => {
    if (selectedData !== null) {
      localData.push(selectedData);
      localStorage.setItem("mainObj", JSON.stringify(localData));
    }
    if (localStorage.getItem("mainObj")) {
      localData = JSON.parse(localStorage.getItem("mainObj"));

      // localData.push(selectedData)
      localStorage.setItem("mainObj", JSON.stringify(localData));
      localStorage.setItem("main2", JSON.stringify(localData));
    }
  }, [selectedData]);

  useEffect(() => {
    if (localStorage.getItem("mainObj")) {
      setCount(
        JSON.stringify(JSON.parse(localStorage.getItem("mainObj")).length)
      );
    }
  }, [selectedData]);

  const [sort, setSort] = useState("");

  function AddTOCart(id, name, image, price) {
    let count = localData.filter((itm) => itm.id == id);
    if (JSON.parse(localStorage.getItem("mainObj"))) {
      // localData.map((itms)=>{
      //   if(itms.id==id){count++ }})

      if (count.length > 0) {
        let myData = JSON.parse(localStorage.getItem("mainObj"));
        const data = myData.map((itms) =>
          itms.id == id ? { ...itms, quntity: itms.quntity + 1 } : itms
        );
        localStorage.setItem("mainObj", JSON.stringify(data));
        setLocalData(data);
      }
      if (count.length == 0) {
        setSelectedData({
          id: id,
          name: name,
          image: image,
          price: price,
          quntity: 1,
        });
      }
    }
    if (JSON.parse(localStorage.getItem("mainObj")) == []) {
      setSelectedData({
        id: id,
        name: name,
        image: image,
        price: price,
        quntity: 1,
      });
    }
  }

  function Sorting(e) {
    e.preventDefault();
    const sort = e.target.value;

    if (sort == "H") {
      const data1 = dataFromApi.sort((a, b) => {
        return b.price - a.price;
      });
      setSort("h");
    }
    if (sort == "L") {
      const sort2 = dataFromApi.sort((a, b) => {
        return a.price - b.price;
      });
      setSort("l");
    }
    if (sort == "D") {
      axios
        .get("http://interviewapi.ngminds.com/api/getAllProducts")
        .then((response) =>
          setDataFromApi(response.data.products.slice(start, end))
        );
    }
  }

  //  const [displayData ,setDisplayData]=useState("hello")
  // useEffect(()=>{
  //    const displayDatas=
  //     // if(displayData!==displayDatas)
  //     // {
  //       setDisplayData(displayDatas)
  //       return(displayDatas)
  //     // }
  //   },[dataFromApi,sort])

  return (
    <>
      <div className="container">
        <NaveBar count={count} />
        <hr />

        <div className="row">
          <div className="col-sm-12">
            <div style={{ margin: "margin: 25px 0" }}>
              <label  className="control-label">
                Sort by:
              </label>
              <select
                onChange={(e) => {
                  Sorting(e);
                }}
                name=""
                id=""
              >
                <option value="D">Default</option>
                <option value="H">High to Low</option>
                <option value="L">Low to High</option>
              </select>
            </div>
          </div>
        </div>
        {/* <div className="row"> */}
        {

          Array.from({ length: Math.ceil(dataFromApi.length / 4) }, (_, index) => index).map((productNo,i2) => {
            return (
              <div  key={i2}>
                <div className="row">
                  {dataFromApi.map((itms, i) => {
                    if (productNo * 4 <= i && i < productNo * 4 + 4) {
                      return (
                        <div key={i} className="col-md-3">
                          <div 
                            className={
                              i % 4 === 0 ?
                                "bg-info" :
                                i % 4 === 1 ?
                                  "bg-warning" :
                                  i % 4 === 2 ?
                                    "bg-danger" :
                                    "bg-success"
                            }
                          >
                            <img
                              src={`http://interviewapi.ngminds.com/${itms.image}`}
                              width="100"
                              height="200"
                            />
                            <br />
                            <p>{itms.name}</p>
                            <p>
                              <i className="fa fa-inr"></i>
                              {itms.price}
                            </p>

                            <a
                              onClick={() =>
                                AddTOCart(
                                  itms._id,
                                  itms.name,
                                  itms.image,
                                  itms.price
                                )
                              }
                              className="btn btn-warning"
                            >
                              Add to Cart
                            </a>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
                <hr />
              </div>
            )
          })

        }
     
        <Pagination
          AllDataLength={AllDataLength}
          data={dataFromApi}
          setItemsPerPage={setItemsPerPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
}
