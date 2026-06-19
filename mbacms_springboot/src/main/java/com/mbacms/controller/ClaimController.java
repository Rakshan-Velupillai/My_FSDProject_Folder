package com.mbacms.controller;


import com.mbacms.DTO.ClaimReqDto;
import com.mbacms.DTO.ClaimRespDto;
import com.mbacms.model.Claim;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/claim")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173/")

public class ClaimController {

//    private final ClaimService claimService;
//
//
//
//    @PostMapping("/submit")
//    public ClaimRespDto submitClaim(Principal principal, @Valid @RequestBody ClaimReqDto dto){
//        return claimService.submitClaim(principal.getName(),dto);
//    }


//    @GetMapping("/all")
//    public List<Claim> getAll(){
//        return claimService.getAll();
//    }
//
//
//    @GetMapping("/getById/{id}")
//    public ResponseEntity<Claim> getById(@PathVariable int id){
//            return ResponseEntity.ok(claimService.getById(id));
//    }
//
//    @PostMapping("/add")
//    public void add(@Valid @RequestBody ClaimDTO dto){
//        claimService.add(dto);
//    }
//
//
//    @DeleteMapping("/delete/{id}")
//    public void deleteById(@PathVariable int id){
//            claimService.deleteById(id);
//    }
//
//    @PutMapping("/update/{id}")
//    public void update(@PathVariable int id,@RequestBody Claim claim){
//            claimService.update(id,claim);
//    }

}
