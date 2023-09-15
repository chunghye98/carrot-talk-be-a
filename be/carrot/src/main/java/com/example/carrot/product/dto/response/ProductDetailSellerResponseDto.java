package com.example.carrot.product.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

/**
 * seller
 */
@NoArgsConstructor
@AllArgsConstructor
public class ProductDetailSellerResponseDto {

	@JsonProperty("id")
	private Long id;
	@JsonProperty("nickname")
	private String nickname;

	public static ProductDetailSellerResponseDto of(Long id, String nickname) {
		return new ProductDetailSellerResponseDto(id, nickname);
	}

}
