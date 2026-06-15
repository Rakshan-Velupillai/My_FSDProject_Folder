package com.mbacms.DTO;


public record UserRespDto(
       
        String fullName,
        String username,
        String email,
        String password,
        String phoneNumber
) {
}
