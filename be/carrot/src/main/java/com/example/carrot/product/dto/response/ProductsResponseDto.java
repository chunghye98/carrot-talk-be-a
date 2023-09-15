package com.example.carrot.product.dto.response;

import java.time.LocalDateTime;

import com.example.carrot.product.entity.ProductStatus;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ProductsResponseDto {
	private Long id;
	private Long sellerId;
	private String name;
	private String imageUrl;
	private String location;
	private LocalDateTime createdAt;
	private Long price;
	private String status;
	private Long chatCount;
	private Long likeCount;

	@Builder
	public ProductsResponseDto(Long id, Long sellerId, String name, String imageUrl, String location,
		LocalDateTime createdAt, Long price, ProductStatus status, Long likeCount) {
		this.id = id;
		this.sellerId = sellerId;
		this.name = name;
		this.imageUrl = imageUrl;
		this.location = location;
		this.createdAt = createdAt;
		this.price = price;
		this.status = status.getValue();
		this.chatCount = 0L; // chatroom이 erd에 추가되면 수정해야 함
		this.likeCount = likeCount;
	}
}
