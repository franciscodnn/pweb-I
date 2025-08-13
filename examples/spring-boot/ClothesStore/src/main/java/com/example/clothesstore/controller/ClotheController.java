package com.example.clothesstore.controller;

import com.example.clothesstore.model.Clothe;
import com.example.clothesstore.service.ClotheService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/clothes")
public class ClotheController {

    private final ClotheService clotheService;

    public ClotheController(ClotheService clotheService) {
        this.clotheService = clotheService;
    }

    // localhost:8080/clothes/all
    @GetMapping("/all")
    public List<Clothe> findAll() {
        return clotheService.findAll();
    }

    // localhost:8080/clothes/1
    @GetMapping("/{id}")
    public Clothe findById(@PathVariable Long id) {
        return clotheService.findById(id);
    }
}
