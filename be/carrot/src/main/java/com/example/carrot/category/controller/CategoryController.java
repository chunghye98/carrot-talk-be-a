package com.example.carrot.category.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.carrot.category.dto.response.CategoryResponseDto;
import com.example.carrot.category.service.CategoryService;
import com.example.carrot.global.common.ApiResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class CategoryController {

	private final CategoryService categoryService;

	@GetMapping("/categories")
	public ApiResponse<List<CategoryResponseDto>> getCategories() {
		return ApiResponse.success(categoryService.findCategories());
	}

}
