package com.capstone.Health_Management_Service.feign;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class UserData {
    private String userId;
    private String username;
    private String email;
    private String password;
}

