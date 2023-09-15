package com.example.carrot.product.dto.request;

import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ModifyProductStatusRequestDto {

	@NotNull(message = "판매 상태를 입력해 주세요.")
	private String status;

}
