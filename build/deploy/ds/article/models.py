from django.db import models

class Article(models.Model):
	title = models.CharField(max_length=250)
	slug = models.SlugField(max_length=250, unique=True)
	content = models.TextField()
	leadin = models.CharField(max_length=250)
	preview = models.TextField()
	published_date = models.DateTimeField(auto_now_add=True)
	updated_date = models.DateTimeField(auto_now_add=True)
	category = models.ForeignKey('article.Category')
	series = models.ForeignKey('article.Series')
	# tags = models.ManyTo
	# key people
	# author = models.CharField(max_length=100, default="Brendan")

class Category(models.Model):
	title = models.CharField(max_length=100)
	slug = models.SlugField(max_length=100, unique=True)

class Series(models.Model):
	title = models.CharField(max_length=100)
	slug = models.SlugField(max_length=100, unique=True)

class Tag(models.Model):
	title = models.CharField(max_length=50)
	slug = models.SlugField(max_length=50, unique=True)