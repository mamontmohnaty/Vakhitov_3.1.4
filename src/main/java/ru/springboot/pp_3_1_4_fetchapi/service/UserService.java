package ru.springboot.pp_3_1_4_fetchapi.service;


import ru.springboot.pp_3_1_4_fetchapi.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    void deleteById(Long id);

    User findUserByName(String name);

    List<User> findAll();

    User findById(Long id);

    void saveUser(User user);

    void updateUser(User user);

}