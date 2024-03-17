package com.ecommerce.backend.Ecommerce.Repository;

import com.ecommerce.backend.Ecommerce.Entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepo extends JpaRepository<Products, Integer> {
}
