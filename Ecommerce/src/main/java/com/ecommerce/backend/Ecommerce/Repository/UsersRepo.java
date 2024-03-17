package com.ecommerce.backend.Ecommerce.Repository;

import com.ecommerce.backend.Ecommerce.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepo extends JpaRepository<Users,Integer> {

    Users findByUserEmail(String User);
}
