package com.main.dao;

import com.main.exceptions.ResourceNotFoundException;
import com.main.model.User;

import java.util.List;


public interface UserDao {
    void insert(User user);
    List<User> getAll();
    User getById(int id);
    void deleteById(int id) throws ResourceNotFoundException;
    void update(User user,int id);
}
