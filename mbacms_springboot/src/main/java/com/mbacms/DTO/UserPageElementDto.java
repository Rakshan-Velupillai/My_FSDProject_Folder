package com.mbacms.DTO;

import com.mbacms.enums.Role;

public record UserPageElementDto(
        int id,
        String fullName,
        String username,
        String email,
        String phoneNumber,
        Role role,
        boolean isActive
) {
}
