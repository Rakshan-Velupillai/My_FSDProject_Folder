package com.app.repository;

import com.app.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;



public interface JobRepository extends JpaRepository<Job,Integer> {

}
