package com.example.carrot.product.dto.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class ReadProductDetailResponseDto {

	@JsonProperty("imageUrls")
	private List<String> imageUrls;
	@JsonProperty("seller")
	private ProductDetailSellerResponseDto seller;
	@JsonProperty("product")
	private ProductDetailResponseDto product;

	public static ReadProductDetailResponseDto of(List<String> imageUrls, ProductDetailSellerResponseDto seller,
		ProductDetailResponseDto product) {
		return new ReadProductDetailResponseDto(imageUrls, seller, product);
	}

}
