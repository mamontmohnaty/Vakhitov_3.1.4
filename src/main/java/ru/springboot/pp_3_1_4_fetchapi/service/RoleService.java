package ru.springboot.pp_3_1_4_fetchapi.service;

import ru.springboot.pp_3_1_4_fetchapi.model.Role;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public interface RoleService {
    List<Role> getAllRoles();

    Set<Role> getSetRoles(Set<Role> role);
}