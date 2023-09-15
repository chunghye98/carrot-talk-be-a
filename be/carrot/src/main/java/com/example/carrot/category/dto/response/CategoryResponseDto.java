package com.example.carrot.category.dto.response;

import com.example.carrot.category.entity.Category;

import lombok.Builder;
import lombok.Getter;

@Getter
public class CategoryResponseDto {

	private Long id;
	private String name;
	private String imageUrl;

	@Builder
	public CategoryResponseDto(Long id, String name, String imageUrl) {
		this.id = id;
		this.name = name;
		this.imageUrl = imageUrl;
	}

	public static CategoryResponseDto of(Category category) {
		return CategoryResponseDto.builder()
			.id(category.getCategoryId())
			.name(category.getName())
			.imageUrl(category.getImageUrl())
			.build();
	}

}
