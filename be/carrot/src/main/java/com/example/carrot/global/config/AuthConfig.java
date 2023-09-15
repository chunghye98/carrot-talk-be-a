package com.example.carrot.global.config;

import javax.servlet.Filter;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.carrot.global.exception.ExceptionToStatusCodeMapper;
import com.example.carrot.global.filter.AuthFilter;
import com.example.carrot.global.jwt.JwtProvider;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class AuthConfig {

	private final JwtProvider provider;
	private final ExceptionToStatusCodeMapper exceptionMapper;

	@Bean
	public AuthFilter filter(ObjectMapper objectMapper) {
		return new AuthFilter(exceptionMapper, objectMapper, provider);
	}

	@Bean
	public FilterRegistrationBean<Filter> authFilter(AuthFilter authFilter) {
		FilterRegistrationBean<Filter> filterRegistrationBean = new FilterRegistrationBean<>();
		filterRegistrationBean.setFilter(authFilter);
		filterRegistrationBean.setOrder(1);
		return filterRegistrationBean;
	}
}
