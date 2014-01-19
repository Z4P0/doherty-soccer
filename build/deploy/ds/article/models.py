from django.db import models

class Article(models.Model):
	title = models.CharField(max_length=250)
	slug = models.SlugField(max_length=250, unique=True)
	content = models.TextField()
	leadin = models.CharField(max_length=250)
	preview = models.TextField()
	published_date = models.DateTimeField()
	updated_date = models.DateTimeField()
	category = models.ForeignKey('article.Category')
	series = models.ForeignKey('article.Series')
	tags = models.ManyToManyField('article.Tag')
	# key people
	# author = models.CharField(max_length=100, default="Brendan")
	# ----------------------------
	class Meta:
		ordering = ["-published_date"]
		verbose_name_plural = "Articles"

	def __unicode__(self):
		return self.title





# Category, Series, and Tag are all OneToMany
class Category(models.Model):
	title = models.CharField(max_length=100)
	slug = models.SlugField(max_length=100, unique=True)
	# ----------------------------
	class Meta:
		verbose_name_plural = "Catgories"
		ordering = ["title"]

	def __unicode__(self):
		return self.title





class Series(models.Model):
	title = models.CharField(max_length=100)
	slug = models.SlugField(max_length=100, unique=True)
	# ----------------------------
	class Meta:
		verbose_name_plural = "Series"
		ordering = ["title"]

	def __unicode__(self):
		return self.title





class Tag(models.Model):
	title = models.CharField(max_length=50)
	slug = models.SlugField(max_length=50, unique=True)
	# ----------------------------
	class Meta:
		verbose_name_plural = "Tags"
		ordering = ["title"]

	def __unicode__(self):
		return self.title