package com.example.carrot.like.controller;

import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.carrot.global.common.ApiResponse;
import com.example.carrot.like.dto.response.ModifyLikeResponseDto;
import com.example.carrot.like.service.LikeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class LikeController {

	private final LikeService likeService;

	/**
	 * 상품 좋아요 수정 API
	 */
	@PatchMapping("/products/{productId}/like")
	public ApiResponse<ModifyLikeResponseDto> modifyLike(@PathVariable Long productId, @RequestAttribute Long userId) {
		ModifyLikeResponseDto modifyLikeResponseDto = likeService.modifyLike(productId, userId);
		return ApiResponse.success(modifyLikeResponseDto);
	}
}
