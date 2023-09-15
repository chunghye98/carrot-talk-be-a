package com.example.carrot.image.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.carrot.image.entity.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
}
