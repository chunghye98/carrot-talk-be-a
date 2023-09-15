package com.example.carrot.product.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class SaveProductResponseDto {

	@JsonProperty("productId")
	private Long productId;

	public static SaveProductResponseDto of(Long productId) {
		return new SaveProductResponseDto(productId);
	}

}
