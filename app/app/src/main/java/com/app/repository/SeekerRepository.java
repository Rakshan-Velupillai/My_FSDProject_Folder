package com.app.repository;

import com.app.model.Seeker;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeekerRepository extends JpaRepository<Seeker,Integer> {

    Seeker findByUserUsername(String name);
}
