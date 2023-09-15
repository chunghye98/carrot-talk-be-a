package com.example.carrot.like.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.carrot.like.entity.Like;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {

	Optional<Like> findByUserUserIdAndProductProductId(Long userId, Long productId);
}
