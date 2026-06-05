package com.app.repository;

import com.app.model.Application;
import com.app.model.Seeker;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application,Integer> {

    Page<Application> findBySeeker(Seeker seeker, Pageable pageable);
}
