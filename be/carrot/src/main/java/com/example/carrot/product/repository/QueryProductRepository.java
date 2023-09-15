package com.example.carrot.product.repository;

import org.springframework.data.domain.Slice;

import com.example.carrot.product.dto.response.ProductsResponseDto;

public interface QueryProductRepository {
	Slice<ProductsResponseDto> findProducts(Long locationId, Long categoryId, Long next, int size);
}
