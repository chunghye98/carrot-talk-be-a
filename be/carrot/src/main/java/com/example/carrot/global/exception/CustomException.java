package com.example.carrot.global.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class CustomException extends RuntimeException {
	private final StatusCode statusCode;
}
