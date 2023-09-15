package com.example.carrot.user.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LoginRequestDto {

	private String code;

	public LoginRequestDto(String code) {
		this.code = code;
	}
}
