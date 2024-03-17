// ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/Products.css';
import { useNavigate } from 'react-router';


const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [cart, setCart] = useState({});

    useEffect(() => {
        // Fetch all products from the API
        axios.get('http://localhost:8080/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const addToCart = (productId, productName, productPrice) => {
        // Check if the user is logged in
        const userEmail = localStorage.getItem('UserEmail');
        if (!userEmail) {
            // Redirect to the login page if not logged in
            navigate('/login');
            return;
        }

        console.log(productId)
        // Prepare the payload to be sent to the backend
        const cartItem = {
            userEmail: userEmail,
            productName: productName,
            price: productPrice,
            productId: productId,
            quantity: 1, // You can set the default quantity as needed
        };

        // Make a POST request to add or update the product in the cart
        axios.post('http://localhost:8080/api/cart/addOrUpdate', cartItem)
            .then(response => {
                // Handle the success response, you can show a success message or perform other actions
                console.log('Product added to cart:', response.data);
                alert("Product added to cart")
            })
            .catch(error => {
                // Handle errors, you can show an error message or perform other actions
                console.error('Error adding product to cart:', error);

            });
    };

    return (
        <div className="product-list-container">
            {products.map((product) => (
                <div className="product-card" key={product.productId}>
                    <img src={product.image} alt={product.name} className="product-image" />
                    <div className="product-name">{product.name}</div>
                    <div className="product-price">$ {product.price.toFixed(2)}</div>
                    <div className="product-description">{product.description}</div>
                    <br />
                    <div className='btn-container'>
                        <button onClick={() => addToCart(product.productId, product.name, product.price)} className="add-to-cart-button">Add to Cart</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
