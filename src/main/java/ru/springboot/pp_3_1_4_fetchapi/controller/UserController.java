package ru.springboot.pp_3_1_4_fetchapi.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/")
public class UserController {

    @GetMapping("/")
    public String index() {
        return "redirect:/login";
    }

    @GetMapping("/user")
    public String userPage() {
        return "user";
    }
}
