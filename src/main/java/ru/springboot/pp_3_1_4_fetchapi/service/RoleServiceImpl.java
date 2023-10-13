package ru.springboot.pp_3_1_4_fetchapi.service;

import ru.springboot.pp_3_1_4_fetchapi.model.Role;
import ru.springboot.pp_3_1_4_fetchapi.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Transactional
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;

    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }
    @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @Override
    public Set<Role> getSetRoles(Set<Role> roleNames){

        Set<Role> roleSet = new HashSet<>();
        for (Role role : roleNames) {
            roleSet.addAll(roleRepository.getRoleByName(role.getName()));
        }
        return roleSet;
    }
}