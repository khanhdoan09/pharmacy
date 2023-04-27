package com.project.pharmacy.repository;

import com.project.pharmacy.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findById(int id);
    Optional<User> findByEmailAndPassword(String email, String password);
    User findByName(String username);
    Optional<User> findByEmailAndAccountType(String email, String accountType);

    User findUserById(int id);


    Optional<User> findByEmail(String email);

}
