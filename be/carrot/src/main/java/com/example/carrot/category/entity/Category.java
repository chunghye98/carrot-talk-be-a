package com.example.carrot.category.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.example.carrot.global.common.BaseCreatedTimeEntity;
import com.example.carrot.product.entity.Product;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Category extends BaseCreatedTimeEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long categoryId;

	@Column(nullable = false, unique = true)
	private String name;

	@Column(nullable = false, length = 500)
	private String imageUrl;

	@OneToMany(mappedBy = "category", cascade = CascadeType.PERSIST)
	private List<Product> products = new ArrayList<>();

	@Builder
	public Category(String name, String imageUrl) {
		this.name = name;
		this.imageUrl = imageUrl;
	}
}
