package ru.springboot.pp_3_1_4_fetchapi.controller;

import ru.springboot.pp_3_1_4_fetchapi.model.User;
import ru.springboot.pp_3_1_4_fetchapi.service.RoleService;
import ru.springboot.pp_3_1_4_fetchapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/api/v1/")
public class RestAdminController {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public RestAdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }


    @GetMapping(value = "/principal")
    public User getPrincipal(Principal principal) {
        return userService.findUserByName(principal.getName());
    }

    @GetMapping(value = "/users")
    public List<User> getAllUsers() {
        return userService.findAll();
    }


    @PostMapping(value = "/add")
    public List<User> saveUser(@RequestBody User user) {
        user.setRoles(roleService.getSetRoles(user.getRoles()));
        userService.saveUser(user);
        return userService.findAll();
    }

    @GetMapping(value = "/{id}")
    public User getUser (@PathVariable("id") Long id) {
        return userService.findById(id);
    }

    @PatchMapping(value = "/")
    public List<User> updateUser(@RequestBody User user) {
        user.setRoles(roleService.getSetRoles(user.getRoles()));
        userService.updateUser(user);
        return userService.findAll();
    }

    @DeleteMapping(value = "/{id}")
    public List<User> deleteUser(@PathVariable ("id") Long id) {
        userService.deleteById(id);
        return userService.findAll();
    }
}
