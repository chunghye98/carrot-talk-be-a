package com.example.carrot.product.dto.response;

import com.example.carrot.product.entity.Product;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ModifyProductResponseDto {

	private Long productId;

	@Builder
	public ModifyProductResponseDto(Long productId) {
		this.productId = productId;
	}

	public static ModifyProductResponseDto of(Product product) {
		return ModifyProductResponseDto.builder()
			.productId(product.getProductId())
			.build();
	}
}
