package com.example.carrot.product.entity;

import com.example.carrot.global.exception.CustomException;
import com.example.carrot.global.exception.StatusCode;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ProductStatus {
	ON_SALE("판매중"),
	SOLD_OUT("판매완료"),
	RESERVED("예약중");

	private String value;

	public static ProductStatus chooseStatus(final String statusString) {
		for (ProductStatus status : ProductStatus.values()) {
			if (status.getValue().equalsIgnoreCase(statusString)) {
				return status;
			}
		}
		throw new CustomException(StatusCode.INVALID_PRODUCT_STATUS);
	}

}
