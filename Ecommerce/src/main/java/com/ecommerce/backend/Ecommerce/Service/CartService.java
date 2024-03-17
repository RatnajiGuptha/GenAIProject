package com.ecommerce.backend.Ecommerce.Service;

import com.ecommerce.backend.Ecommerce.Entity.Cart;
import com.ecommerce.backend.Ecommerce.Repository.CartRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    @Autowired
    private CartRepo cartRepository;


    public void addOrUpdateProduct(Cart cart) {
        // Add your logic to handle adding or updating the product in the cart
        // You might want to check if the product is already in the cart and update the quantity
        Optional<Cart> existingCartItem = cartRepository.findByProductIdAndUserEmail(
                cart.getProductId(),
                cart.getUserEmail()
        );

        if (existingCartItem.isPresent()) {
            // Product already exists in the cart, update the quantity
            Cart currentCartItem = existingCartItem.get();
            currentCartItem.setQuantity(currentCartItem.getQuantity() + cart.getQuantity());
            cartRepository.save(currentCartItem);
        } else {
            // Product does not exist in the cart, add it to the cart
            cartRepository.save(cart);
        }
    }

    public List<Cart> getAllProductsInCart(String userEmail) {
        // Add your logic to retrieve all products in the cart for a user
        return cartRepository.findByUserEmail(userEmail);
    }

    public void deleteProduct(int id) {
        // Add your logic to delete a product from the cart
        cartRepository.deleteById(id);
    }

    public void updateCartItemQuantity(int cartId, int newQuantity) {
        // Fetch the cart item from the database
        Optional<Cart> optionalCart = cartRepository.findById(cartId);

        if (optionalCart.isPresent()) {
            // Cart item found, update the quantity
            Cart cartItem = optionalCart.get();
            cartItem.setQuantity(newQuantity);

            // Save the updated cart item back to the database
            cartRepository.save(cartItem);
        }
    }

}
