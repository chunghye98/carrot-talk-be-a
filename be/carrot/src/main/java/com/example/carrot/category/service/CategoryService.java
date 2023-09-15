package com.example.carrot.category.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.carrot.category.dto.response.CategoryResponseDto;
import com.example.carrot.category.entity.Category;
import com.example.carrot.category.repository.CategoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryService {

	private final CategoryRepository categoryRepository;

	public List<CategoryResponseDto> findCategories() {
		List<Category> categories = categoryRepository.findAll();
		return categories.stream()
			.map(CategoryResponseDto::of)
			.collect(Collectors.toUnmodifiableList());
	}

}
