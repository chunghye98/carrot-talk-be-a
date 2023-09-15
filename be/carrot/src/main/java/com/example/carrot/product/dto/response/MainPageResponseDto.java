package com.example.carrot.product.dto.response;

import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MainPageResponseDto {

	private List<ProductsResponseDto> products;
	private Long nextId;

	@Builder
	public MainPageResponseDto(List<ProductsResponseDto> products, Long nextId) {
		this.products = products;
		this.nextId = nextId;
	}

	public static MainPageResponseDto of(List<ProductsResponseDto> contents, Long nextProductId) {
		return MainPageResponseDto.builder()
			.products(contents)
			.nextId(nextProductId)
			.build();
	}

	public static MainPageResponseDto of(List<ProductsResponseDto> contents) {
		return MainPageResponseDto.builder()
			.products(contents)
			.build();
	}
}
