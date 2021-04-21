import './App.css';
import Product from "./product";
import {useEffect, useState} from "react";
import ProductForm from "./product-form";
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function App() {
    const [cart, setCart] = useState([]);
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState();

    const onNewProductHandler = (product) => {
        const newData = [...data];
        newData.push(product);
        console.log("\nNový produkt:");
        console.log(newData);
        setData(newData);
    }

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:3001/products')
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error(`Chyba při načítání dat:\n${response.statusText}`)
                })
                .then(json => setData(json))
                .catch(error => setError(error.message))
                .finally(() => setIsPending(false))
        }, 1000)
    }, [])

    const addToCartHandler = function (product) {
        const newCart = [...cart];
        newCart.push(product);
        console.log("\nNákupní košík:");
        console.log(newCart);
        setCart(newCart);
    }
    const removeFromCartHandler = function (product) {
        const newCart = [...cart];

        const productIndex = newCart.findIndex(item => item.id === product.id);
        newCart.splice(productIndex, 1);

        console.log("\nNákupní košík:");
        console.log(newCart);
        setCart(newCart);
    }

    return (
        <Router>
            <div className="App">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Hlavní stránka</Link>
                        </li>
                        <li>
                            <Link to="/edit-product">Editace produktu</Link>
                        </li>
                        <li>
                            <Link to="/cart">Nákupní košík</Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route path="/cart">
                        <h2>Nákupní košík</h2>
                        {cart.map(item => <div>{item.name}
                            <button style={{marginLeft: "5px"}} onClick={() => removeFromCartHandler(item)}>-</button>
                        </div>)}
                        <p>Počet produktů v košíku: {cart.length}</p>
                    </Route>
                    <Route path="/edit-product">
                        <ProductForm onNewProduct={onNewProductHandler}/>
                    </Route>
                    <Route path="/">
                        {isPending && <h2>Čekejte, prosím, načítám data...</h2>}
                        {error && [<h2>Neočekávaná chyba spojení:</h2>, <span>{error}</span>]}
                        {!error && !isPending &&
                        <>
                            <div style={{
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "flex-start"
                            }}>
                                {data.map(item => <Product key={item.id} product={item}
                                                           onClickHandler={addToCartHandler}/>)}
                            </div>
                            <p>Počet produktů v košíku: {cart.length}</p>
                        </>}
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
