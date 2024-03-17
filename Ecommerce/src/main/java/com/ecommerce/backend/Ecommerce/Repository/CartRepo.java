package com.ecommerce.backend.Ecommerce.Repository;

import com.ecommerce.backend.Ecommerce.Entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartRepo extends JpaRepository<Cart,Integer> {
    List<Cart> findByUserEmail(String userEmail);

    Optional<Cart> findByProductIdAndUserEmail(int productId, String userEmail);
}
