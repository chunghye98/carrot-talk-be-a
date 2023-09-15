package com.example.carrot.product.dto.request;

import java.util.List;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ModifyProductRequestDto {

	@Size(min = 1, message = "이미지는 최소 1개 이상 등록되어야 합니다.")
	private List<Long> images;
	@NotNull(message = "상품의 이름을 입력해주세요")
	private String title;
	@NotNull(message = "카테고리를 입력해주세요")
	private Long categoryId;
	@NotNull(message = "동네를 입력해주세요")
	private Long locationId;
	private String content;
	private Long price;
}
