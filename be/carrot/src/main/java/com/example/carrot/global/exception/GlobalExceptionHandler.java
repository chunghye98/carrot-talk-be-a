package com.example.carrot.global.exception;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.carrot.global.common.ApiResponse;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ApiResponse<ErrorCode> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
		log.error("MethodArgumentNotValidException : " + e);

		List<String> errorCodes = e.getBindingResult().getFieldErrors().stream()
			.map(error ->  error.getDefaultMessage())
			.collect(Collectors.toList());

		return ApiResponse.fail(new ErrorCode(HttpStatus.BAD_REQUEST, errorCodes));
	}

	@ExceptionHandler(CustomException.class)
	public ApiResponse<ErrorCode> handleCustomException(CustomException e) {
		log.error("CustomException : " + e);
		StatusCode statusCode = e.getStatusCode();

		return ApiResponse.fail(new ErrorCode(statusCode.getStatus(), statusCode.getMessage()));
	}
}
