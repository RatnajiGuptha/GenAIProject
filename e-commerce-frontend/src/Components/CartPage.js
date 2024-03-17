// CartPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/Cart.css';

const CartPage = () => {
    const [cartProducts, setCartProducts] = useState([]);
    const [userEmail, setUserEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Fetch user email from localStorage or wherever it's stored
        const userEmailFromStorage = localStorage.getItem('UserEmail');
        setUserEmail(userEmailFromStorage);

        if (userEmailFromStorage) {
            // Fetch all products in the cart for the user
            fetchCartProducts(userEmailFromStorage);
        }
    }, []);

    const fetchCartProducts = (userEmail) => {
        setIsLoading(true);
        axios.get(`http://localhost:8080/api/cart/getAll/${userEmail}`)
            .then(response => {
                setCartProducts(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching cart products:', error);
                setIsLoading(false);
            });
    };

    const deleteProductFromCart = (productId) => {
        setIsLoading(true);
        axios.delete(`http://localhost:8080/api/cart/delete/${productId}`)
            .then(response => {
                // Remove the deleted product from the cartProducts state
                setCartProducts(cartProducts.filter(product => product.id !== productId));
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error deleting product from cart:', error);
                setIsLoading(false);
            });
    };

    const calculateTotalPrice = () => {
        return cartProducts.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
    };

    const updateQuantityInDatabase = (cartId, newQuantity) => {
        axios.put(`http://localhost:8080/api/cart/updateQuantity/${cartId}/${newQuantity}`)
            .then(response => {
                // Handle success response if needed
                console.log('Quantity updated in the database:', response.data);
            })
            .catch(error => {
                // Handle error if needed
                console.error('Error updating quantity in the database:', error);
            });
    };

    const incrementQuantity = (cartId) => {
        const updatedCart = cartProducts.map(product => {
            if (product.id === cartId) {
                return { ...product, quantity: product.quantity + 1 };
            }
            return product;
        });

        setCartProducts(updatedCart);
        const updatedProduct = updatedCart.find(product => product.id === cartId);

        if (updatedProduct) {
            updateQuantityInDatabase(cartId, updatedProduct.quantity);
        }
    };

    const decrementQuantity = (cartId) => {
        const updatedCart = cartProducts.map(product => {
            if (product.id === cartId && product.quantity > 1) {
                return { ...product, quantity: product.quantity - 1 };
            }
            return product;
        });

        setCartProducts(updatedCart);
        const updatedProduct = updatedCart.find(product => product.id === cartId);

        if (updatedProduct) {
            updateQuantityInDatabase(cartId, updatedProduct.quantity);
        }
    };



    const handleProceedToCheckout = () => {
        // Implement logic to proceed to checkout
        console.log('Proceeding to checkout');
    };

    // CartPage.js (continued)
    return (
        <div className="cart-container">
            <h1>Cart</h1>
            {isLoading && <p>Loading...</p>}
            {!isLoading && cartProducts.length === 0 && <p>No products in cart.</p>}
            {!isLoading && cartProducts.length > 0 && (
                <>
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartProducts.map(product => (
                                <tr key={product.id}>
                                    <td>{product.productName}</td>
                                    <td>
                                        <button onClick={() => decrementQuantity(product.id)}>-</button>
                                        {product.quantity}
                                        <button onClick={() => incrementQuantity(product.id)}>+</button>
                                    </td>
                                    <td>${product.price}</td>
                                    <td>${(product.price * product.quantity).toFixed(2)}</td>
                                    <td>
                                        <button className="delete-button" onClick={() => deleteProductFromCart(product.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="total-container">
                        <span>Total:</span>
                        <span>${calculateTotalPrice()}</span>
                    </div>
                    <div className='checkout-btn'>
                        <button onClick={handleProceedToCheckout} className="proceed-to-checkout-button">Proceed to Checkout</button>
                    </div>

                </>
            )}
        </div>
    );
};

export default CartPage;
