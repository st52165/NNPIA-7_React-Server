import {useState} from "react";


function Product({product, onClickHandler}) {

    const [isInCart, setIsInCart] = useState(false);

    return (
        <div style={{
            width: "300px",
            border: "1px solid black",
            display: "flex",
            flexDirection: "column",
            padding: "0.5%",
            margin: "0.5%"
        }}>
            <h2>{product.name}</h2>
            <div><a href={product.image} target="_blank"><img src={product.image} alt="" width={300}/></a>
            </div>
            <div>Cena: {product.price} CZK</div>
            <div>{isInCart && "V košíku"}</div>
            <button onClick={() => {
                setIsInCart(true);
                onClickHandler(product);
            }}>Koupit
            < /button>
        </div>
    )
}

export default Product;