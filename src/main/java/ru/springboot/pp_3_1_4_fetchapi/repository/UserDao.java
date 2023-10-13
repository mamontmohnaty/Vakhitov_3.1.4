package ru.springboot.pp_3_1_4_fetchapi.repository;

import ru.springboot.pp_3_1_4_fetchapi.model.User;

import java.util.List;

public interface UserDao {
    List<User> findAll();

    User findById(Long id);

    void saveUser(User user);

    void updateUser(User user);

    void deleteById(Long id);

    User getUser(String name);
}