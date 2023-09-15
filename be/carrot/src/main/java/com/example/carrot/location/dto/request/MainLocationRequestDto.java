package com.example.carrot.location.dto.request;

import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MainLocationRequestDto {

	@NotNull(message = "locationId를 입력해주세요.")
	private Long locationId;
}
