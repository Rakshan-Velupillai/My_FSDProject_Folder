package com.mbacms.service;


import com.mbacms.exception.ResourceNotFoundException;
import com.mbacms.model.Claim;
import com.mbacms.repository.ClaimRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ClaimService {

    private final ClaimRepository claimRepository;

    public List<Claim> getAll() {
        return claimRepository.findAll();
    }

    public Claim getById(int id) {
        return claimRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("No Claim mentioned by this ID!"));
    }

    public void add(Claim claim) {
        claimRepository.save(claim);
    }

    public void deleteById(int id) {
        getById(id);
        claimRepository.deleteById(id);
    }

    public void update(int id, Claim claim) {
        Claim existingClaim=getById(id);
        existingClaim.setClaimAmount(claim.getClaimAmount());
        existingClaim.setDiagnosis((claim.getDiagnosis()));
        existingClaim.setTreatment(claim.getTreatment());
        existingClaim.setStatus(claim.getStatus());

        claimRepository.save(existingClaim);
    }
}
