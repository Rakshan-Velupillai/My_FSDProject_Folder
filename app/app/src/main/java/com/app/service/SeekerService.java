package com.app.service;

import com.app.model.Seeker;
import com.app.repository.SeekerRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class SeekerService {

    private final SeekerRepository seekerRepository;

    public Seeker getByUserName(String name) {
        return seekerRepository.findByUserUsername(name);
    }

    public void save(Seeker seeker) {
        seekerRepository.save(seeker);
    }
}
