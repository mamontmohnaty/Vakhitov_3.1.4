package ru.springboot.pp_3_1_4_fetchapi.repository;

import ru.springboot.pp_3_1_4_fetchapi.model.Role;

import java.util.List;

public interface RoleDao {
    List<Role> findAll();

    List<Role> getRoleByName(String name);
}
