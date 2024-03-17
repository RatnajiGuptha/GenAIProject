package com.ecommerce.backend.Ecommerce.Controller;


import com.ecommerce.backend.Ecommerce.Entity.Cart;
import com.ecommerce.backend.Ecommerce.Repository.CartRepo;
import com.ecommerce.backend.Ecommerce.Service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin("*")
public class CartController {

    @Autowired
    private CartService cartService;


    // API to add a product to the cart or update quantity
    @PostMapping("/addOrUpdate")
    public ResponseEntity<String> addOrUpdateProductToCart(@RequestBody Cart cart) {
        cartService.addOrUpdateProduct(cart);
        return new ResponseEntity<>("Product added/updated successfully", HttpStatus.OK);
    }

    // API to get all products in the cart for a user
    @GetMapping("/getAll/{userEmail}")
    public ResponseEntity<List<Cart>> getAllProductsInCart(@PathVariable String userEmail) {
        List<Cart> cartProducts = cartService.getAllProductsInCart(userEmail);
        return new ResponseEntity<>(cartProducts, HttpStatus.OK);
    }

    // API to delete a product from the cart
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProductFromCart(@PathVariable int id) {
        cartService.deleteProduct(id);
        return new ResponseEntity<>("Product deleted successfully", HttpStatus.OK);
    }

    @PutMapping("/updateQuantity/{cartId}/{newQuantity}")
    public ResponseEntity<String> updateQuantityInCart(@PathVariable int cartId, @PathVariable int newQuantity) {
        // Retrieve the cart item from the database using cartId
        cartService.updateCartItemQuantity(cartId, newQuantity);
        return ResponseEntity.ok("Quantity updated successfully");
    }


}

