import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState((0));
  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=6").then((result) => {
      result.json().then((resp) => {
        //console.warn("response Data", resp);
        setData(resp);
      })
    })
  })



return (
  <>
    <div><button type='button' >previous</button>
      <p>{page + 1} Of 18</p>
      <button type='button'  >next</button>
    </div>
    <header className="masthead clear">
      <div className="centered">

        <div className="site-branding">
          <h1 className="site-title">Get Api Calling</h1>

        </div>
      </div>
    </header>

    {

      data.map((item) =>

        <main className="main-area">

          <div className="centered">

            <section className="cards">

              <article className="card">

                <picture className="thumbnail">
                  <img src={item.image} alt="" />
                </picture>
                <div className="card-content">

                  <h2> {item.title}</h2>
                  <p>{item.description}</p>
                  <h1>price: {item.price}</h1>
                </div>

              </article>



            </section>

          </div>

        </main>
      )
    }
  </>

);
}

export default App;
