package com.example.carrot.global.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class ErrorCode <T> {
	private final HttpStatus status;
	private final T message;
}
