package com.mbacms.controller;


import com.mbacms.exception.ResourceNotFoundException;
import com.mbacms.model.Claim;
import com.mbacms.service.ClaimService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class MainController {

    private final ClaimService claimService;

    @GetMapping("/api/claim/all")
    public List<Claim> getAll(){
        return claimService.getAll();
    }


    @GetMapping("/api/claim/getById/{id}")
    public ResponseEntity<?> getById(@PathVariable int id){
        try{
            Claim claim=claimService.getById(id);
            return ResponseEntity.ok(claim);
        }
        catch (ResourceNotFoundException e){
            return ResponseEntity
                    .badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/api/claim/add")
    public void add(@RequestBody Claim claim){
        claimService.add(claim);
    }


    @DeleteMapping("/api/claim/delete/{id}")
    public ResponseEntity<?> deleteById(@PathVariable int id){
        try{
            claimService.deleteById(id);
            return ResponseEntity.ok().build();
        }
        catch (ResourceNotFoundException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/api/claim/update/{id}")
    public ResponseEntity<?> update(@PathVariable int id,@RequestBody Claim claim){
        try{
            claimService.update(id,claim);
            return ResponseEntity.ok()
                    .build();
        }
        catch (ResourceNotFoundException e){
            return ResponseEntity.badRequest()
                    .body(e.getMessage());
        }
    }

}
