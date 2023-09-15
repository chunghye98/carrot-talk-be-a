package com.example.carrot.like.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.example.carrot.global.common.BaseCreatedTimeEntity;
import com.example.carrot.product.entity.Product;
import com.example.carrot.user.entity.User;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "likes")
public class Like extends BaseCreatedTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long likeId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_id")
	private Product product;

	@Builder
	public Like(User user, Product product) {
		this.user = user;
		this.product = product;
	}

	public void addLike(Product product) {
		this.product = product;
		product.getLikes().add(this);
	}

	public void addUser(User user) {
		this.user = user;
		user.getLikes().add(this);
	}

}
