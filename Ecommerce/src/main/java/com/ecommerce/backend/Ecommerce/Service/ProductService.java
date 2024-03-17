package com.ecommerce.backend.Ecommerce.Service;

import com.ecommerce.backend.Ecommerce.Entity.Products;
import com.ecommerce.backend.Ecommerce.Repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepo productRepository;

    public Products saveProduct(Products product) {
        return productRepository.save(product);
    }

    public List<Products> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Products> getProductById(Integer id) {
        return productRepository.findById(id);
    }

    public List<Products> saveProducts(List<Products> products) {
        return productRepository.saveAll(products);
    }
}
