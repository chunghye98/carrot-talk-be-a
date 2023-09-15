package com.example.carrot.global.common;

import com.example.carrot.global.exception.ErrorCode;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Builder;
import lombok.Getter;

@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {

	private boolean success;
	private T data;
	private ErrorCode errorCode;

	@Builder
	public ApiResponse(boolean success, T data, ErrorCode errorCode) {
		this.success = success;
		this.data = data;
		this.errorCode = errorCode;
	}

	public static <T> ApiResponse<T> success() {
		return ApiResponse.<T>builder()
			.success(true)
			.build();
	}

	public static <T> ApiResponse<T> success(T data) {
		return ApiResponse.<T>builder()
			.success(true)
			.data(data)
			.build();
	}

	public static <T> ApiResponse<T> fail(ErrorCode errorCode) {
		return ApiResponse.<T>builder()
			.success(false)
			.errorCode(errorCode)
			.build();
	}

}
