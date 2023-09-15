package com.example.carrot.like.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.carrot.global.exception.CustomException;
import com.example.carrot.global.exception.StatusCode;
import com.example.carrot.like.dto.response.ModifyLikeResponseDto;
import com.example.carrot.like.entity.Like;
import com.example.carrot.like.repository.LikeRepository;
import com.example.carrot.product.entity.Product;
import com.example.carrot.product.repository.ProductRepository;
import com.example.carrot.user.entity.User;
import com.example.carrot.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class LikeService {

	private final LikeRepository likeRepository;
	private final ProductRepository productRepository;
	private final UserRepository userRepository;

	@Transactional
	public ModifyLikeResponseDto modifyLike(Long productId, Long userId) {
		Optional<Like> like = likeRepository.findByUserUserIdAndProductProductId(userId, productId);

		if (like.isPresent()) {
			likeRepository.delete(like.get());
			return ModifyLikeResponseDto.of(false);
		}

		likeRepository.save(Like.builder()
			.user(getUser(userId))
			.product(getProduct(productId))
			.build());

		return ModifyLikeResponseDto.of(true);
	}

	private Product getProduct(Long productId) {
		return productRepository.findById(productId)
			.orElseThrow(() -> new CustomException(StatusCode.NOT_FOUND_PRODUCT));
	}

	private User getUser(Long userId) {
		return userRepository.findById(userId).orElseThrow(() -> new CustomException(StatusCode.NOT_FOUND_USER));
	}
}
