import {useState} from "react";

function ProductForm(props) {

    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [feedback, setFeedback] = useState("");

    const onSubmitHandler = event => {
        event.preventDefault()

        const newProduct = {
            name: productName,
            price: price,
            image: image
        }

        fetch('http://localhost:3001/products', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(newProduct) // body data type must match "Content-Type" header
        }).then(response => response.json()
            .then(json => setFeedback(json))
            .finally(() => {
                props.onNewProduct(newProduct);
                setProductName("");
                setImage("");
                setPrice(0);
                setImage();
            }));
    }

    return (
        <>
            <h4>Přidat nový produkt:</h4>
            <form onSubmit={onSubmitHandler}>
                <label>Název: <input type={"text"} placeholder={"Název produktu"} value={productName}
                                     onChange={(e => setProductName(e.target.value))}/></label><br/>
                <label>URL obrázku: <input type={"text"} placeholder={"URL obrázku"} value={image}
                                           onChange={(e => setImage(e.target.value))}/></label><br/>
                <label>Cena: <input type={"number"} placeholder={"Cena"} value={price}
                                    onChange={(e => setPrice(e.target.value))}/></label><br/>
                <input type={"submit"} value={"Odeslat"}/>
            </form>
            {feedback && <div>Nový produkt: {JSON.stringify(feedback)}</div>}
        </>
    )
}

export default ProductForm;