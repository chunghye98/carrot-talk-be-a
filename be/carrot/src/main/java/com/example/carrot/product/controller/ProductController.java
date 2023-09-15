package com.example.carrot.product.controller;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.carrot.global.common.ApiResponse;
import com.example.carrot.product.dto.request.ModifyProductRequestDto;
import com.example.carrot.product.dto.request.ModifyProductStatusRequestDto;
import com.example.carrot.product.dto.request.SaveProductRequestDto;
import com.example.carrot.product.dto.response.MainPageResponseDto;
import com.example.carrot.product.dto.response.ModifyProductResponseDto;
import com.example.carrot.product.dto.response.ReadProductDetailResponseDto;
import com.example.carrot.product.dto.response.SaveProductResponseDto;
import com.example.carrot.product.service.ProductService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ProductController {

	private final ProductService productService;

	/**
	 * 메인페이지 조회 API
	 */
	@GetMapping("/products")
	public ApiResponse<MainPageResponseDto> getMainPage(
		@RequestParam(required = false) Long locationId,
		@RequestParam(required = false) Long categoryId,
		@RequestParam(required = false) Long next,
		@RequestParam(defaultValue = "10") int size) {

		MainPageResponseDto mainPageResponseDto = productService.getMainPage(locationId, categoryId, next, size);
		return ApiResponse.success(mainPageResponseDto);
	}

	/**
	 * 상품 수정 API
	 */
	@PatchMapping("/products/{productId}")
	public ApiResponse<ModifyProductResponseDto> modifyProduct(
		@Valid @RequestBody ModifyProductRequestDto modifyProductRequestDto,
		@RequestAttribute Long userId,
		@PathVariable Long productId) {

		ModifyProductResponseDto modifyProductResponseDto = productService.modifyProduct(modifyProductRequestDto,
			userId, productId);
		return ApiResponse.success(modifyProductResponseDto);
	}

	/**
	 * 상품 삭제 API
	 */
	@DeleteMapping("/products/{productId}")
	public ApiResponse<?> deleteProduct(@RequestAttribute Long userId, @PathVariable Long productId) {
		productService.deleteProduct(userId, productId);
		return ApiResponse.success();
	}

	/**
	 * 상품 상태 수정 API
	 */
	@PatchMapping("/products/{productId}/status")
	public ApiResponse<ModifyProductResponseDto> modifyProductStatus(
		@Valid @RequestBody ModifyProductStatusRequestDto modifyProductStatusRequestDto,
		@RequestAttribute Long userId,
		@PathVariable Long productId) {
		ModifyProductResponseDto modifyProductResponseDto = productService.updateProductStatus(
			modifyProductStatusRequestDto, userId, productId);
		return ApiResponse.success(modifyProductResponseDto);
	}

	/**
	 * 상품 등록 API
	 */
	@PostMapping("/products")
	public ApiResponse<SaveProductResponseDto> saveProduct(
		@Valid @RequestBody SaveProductRequestDto saveProductRequestDto,
		@RequestAttribute(required = false) Long userId) {
		return ApiResponse.success(productService.saveProduct(saveProductRequestDto, userId));
	}

	/**
	 * 상품 상세 조회 API
	 */
	@GetMapping("/products/{productId}")
	public ApiResponse<ReadProductDetailResponseDto> getProductDetail(@PathVariable Long productId, @RequestAttribute(required = false) Long userId) {
		return ApiResponse.success(productService.getProductDetail(productId, userId));
	}

}
