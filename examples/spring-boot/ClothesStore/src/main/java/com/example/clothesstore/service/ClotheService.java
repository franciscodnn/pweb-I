package com.example.clothesstore.service;

import com.example.clothesstore.model.Clothe;
import com.example.clothesstore.repository.ClotheRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClotheService {

    private final ClotheRepository clotheRepository;

    public ClotheService(ClotheRepository clotheRepository) {
        this.clotheRepository = clotheRepository;
    }



    public List<Clothe> findAll() {
        return clotheRepository.findAll();
    }

    public Clothe findById(Long id) {
        return clotheRepository.findById(id).orElse(null);
    }

}
