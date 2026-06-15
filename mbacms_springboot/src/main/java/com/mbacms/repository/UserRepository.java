package com.mbacms.repository;

import com.mbacms.model.Healthcare;
import com.mbacms.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Integer> {

//find by fullname
    Optional<User> findByFullName(String fullname);

    //finding and checking the user by username
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);

    //finding and checking the user by email
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);






}
