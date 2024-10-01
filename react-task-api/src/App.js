import { useEffect, useState } from 'react';
import './App.css';
import React from 'react';




function App() {
  const [data, setData] = useState([]);
  const [api_data,setApi_Data]=useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 3;

  const handleOpenModal = () => {
    // setValueToPass(currentItems)
    // setShowModal(true);
    console.log("caling")

  };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };


  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((result) => result.json())
      .then((resp) => {
        setData(resp);
      });
  }, []);


  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);


  const handleNext = () => {
    if (itemOffset + itemsPerPage < data.length) {
      setItemOffset(itemOffset + itemsPerPage);
    }
  };

  const handlePrevious = () => {
    if (itemOffset - itemsPerPage >= 0) {
      setItemOffset(itemOffset - itemsPerPage);
    }
  };
  const showDetails=(id)=>{
// alert(id);
fetch(`https://fakestoreapi.com/products/${id}`)
      .then((result) => result.json())
      .then((resp) => {
        setApi_Data(resp);
        console.log(api_data);
        //alert(api_data.title)
        
      });
  }

  return (
    <>
      <div className='pagination'>
        <button type='button' onClick={handlePrevious}>
          Previous
        </button>
        <p>{Math.floor(itemOffset / itemsPerPage) + 1} of {pageCount}</p>
        <button type='button' onClick={handleNext}>
          Next
        </button>
      </div>



      <header className="masthead clear">
        <div className="centered">
          <div className="site-branding">
            <h1 className="site-title">Products Details</h1>
          </div>
        </div>
      </header>
      <div className="cards-container">
        {currentItems.map((item) => (
          <div className="card" key={item.id}>
            <picture className="">
             
              <img src={item.image} alt={item.title}   data-bs-toggle="modal"  data-bs-target="#exampleModal"  
               onClick={(e)=>showDetails(item.id)}/>
            </picture>
            <div className="card-content">
              <h2>{item.title}</h2>
              {/* <p>{item.description}</p> */}
              <h1>Price: ${item.price}</h1>
              {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
             
             onClick={(e)=>showDetails(item.id)}>
                Open Popup
              </button> */}
            </div>
          </div>

        ))}
      </div>

      {/* <!-- Modal --> */}
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Title :{api_data.title}</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <img src={api_data.image}></img>
            <u><h2 style={{color:"blue"}}>${api_data.price}rs</h2></u>
            <p  ><b>{api_data.description}</b></p>

            </div>
            <div class="modal-footer">
              {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
