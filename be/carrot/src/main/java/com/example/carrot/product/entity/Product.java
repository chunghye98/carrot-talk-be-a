package com.example.carrot.product.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.example.carrot.category.entity.Category;
import com.example.carrot.global.common.BaseAllTimeEntity;
import com.example.carrot.global.exception.CustomException;
import com.example.carrot.global.exception.StatusCode;
import com.example.carrot.like.entity.Like;
import com.example.carrot.location.entity.Location;
import com.example.carrot.product_image.entity.ProductImage;
import com.example.carrot.user.entity.User;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Product extends BaseAllTimeEntity {
	@Id
	@GeneratedValue
	private Long productId;

	@Column(nullable = false)
	private String name;

	private Long price;

	@Column(length = 500)
	private String content;

	@Column(nullable = false, columnDefinition = "bigint default 0")
	private Long hits;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private ProductStatus status;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "category_id")
	private Category category;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "location_id")
	private Location location;

	@OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Like> likes = new ArrayList<>();

	@OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ProductImage> productImages = new ArrayList<>();

	@Builder
	public Product(String name, Long price, String content, Long hits, ProductStatus status, User user,
		Category category, Location location) {
		this.name = name;
		this.price = price;
		this.content = content;
		this.hits = hits;
		this.status = status;
		this.user = user;
		this.category = category;
		this.location = location;
	}

	public void validateEditAccess(Long userId) {
		if (!this.user.getUserId().equals(userId)) {
			throw new CustomException(StatusCode.NO_EDIT_PERMISSION);
		}
	}

	public Product update(String title, String content, Long price, Category category, Location location) {
		this.name = title;
		this.content = content;
		this.price = price;
		this.category = category;
		this.location = location;
		return this;
	}

	public void addCategory(Category category) {
		this.category = category;
		category.getProducts().add(this);
	}

	public void addUser(User user) {
		this.user = user;
		user.getProducts().add(this);
	}

	public Product updateStatus(ProductStatus productStatus) {
		this.status = productStatus;
		return this;
	}

	public void increaseHit() {
		this.hits++;
	}

}
