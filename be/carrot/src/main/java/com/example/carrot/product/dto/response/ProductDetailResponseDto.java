package com.example.carrot.product.dto.response;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

/**
 * product
 */
@NoArgsConstructor
@AllArgsConstructor
public class ProductDetailResponseDto {

	@JsonProperty("location")
	private String location;
	@JsonProperty("status")
	private String status;
	@JsonProperty("title")
	private String title;
	@JsonProperty("category")
	private String category;
	@JsonProperty("createdAt")
	private LocalDateTime createdAt;
	@JsonProperty("content")
	private String content;
	@JsonProperty("chatCount")
	private Long chatCount;
	@JsonProperty("likeCount")
	private Long likeCount;
	@JsonProperty("hits")
	private Long hits;
	@JsonProperty("price")
	private Long price;
	@JsonProperty("isLiked")
	private boolean isLiked;

	public static ProductDetailResponseDto of(String location, String status, String title, String category,
		LocalDateTime createdAt,
		String content, Long chatCount, Long likeCount, Long hits, Long price, boolean isLiked) {
		return new ProductDetailResponseDto(location, status, title, category, createdAt, content, chatCount, likeCount,
			hits, price, isLiked);
	}

}


