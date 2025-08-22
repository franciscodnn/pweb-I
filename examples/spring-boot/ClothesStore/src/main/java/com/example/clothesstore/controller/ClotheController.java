package com.example.clothesstore.controller;

import com.example.clothesstore.model.Clothe;
import com.example.clothesstore.service.ClotheService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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
    public List<?> findAll() {
        return clotheService.findAll();
        /*
        List<String> l = new ArrayList<String>();
        l.add("elemento 1");
        l.add("elemento 2");
        return l;
        */
    }

    // localhost:8080/clothes/1
    @GetMapping("/{id}")
    public ResponseEntity<Clothe> findById(@PathVariable Long id) {
        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(clotheService.findById(id));
    }

    @PostMapping
    public String create(@RequestBody Clothe clothe) {
        return clotheService.create(clothe);
    }

    @DeleteMapping("/{id}")
    public String remove(@PathVariable long id) {
        return clotheService.remove(id);
    }
}
