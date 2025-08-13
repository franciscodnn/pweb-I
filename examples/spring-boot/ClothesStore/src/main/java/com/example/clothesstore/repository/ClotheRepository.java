package com.example.clothesstore.repository;

import com.example.clothesstore.model.Clothe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClotheRepository extends JpaRepository<Clothe, Long> {
}
