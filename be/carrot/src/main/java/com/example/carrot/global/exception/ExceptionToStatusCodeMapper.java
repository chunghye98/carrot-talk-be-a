package com.example.carrot.global.exception;

import static com.example.carrot.global.exception.StatusCode.*;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;

@Service
public class ExceptionToStatusCodeMapper {
	public static final Map<Class<? extends RuntimeException>, StatusCode> exceptionMappings;

	static {
		exceptionMappings = new HashMap<>();
		exceptionMappings.put(MalformedJwtException.class, MALFORMED_JWT_EXCEPTION);
		exceptionMappings.put(ExpiredJwtException.class, EXPIRED_JWT_EXCEPTION);
		exceptionMappings.put(SignatureException.class, SIGNATURE_EXCEPTION);
		exceptionMappings.put(UnsupportedJwtException.class, UNSUPPORTED_JWT_EXCEPTION);
		exceptionMappings.put(IllegalArgumentException.class, ILLEGAL_ARGUMENT_EXCEPTION);
	}

	public StatusCode mapException(RuntimeException e) {
		return exceptionMappings.getOrDefault(e.getClass(), UNKNOWN_EXCEPTION);
	}
}
