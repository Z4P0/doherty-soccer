from django.shortcuts import render_to_response, get_object_or_404
from article.models import Article, Category, Series, Tag
from django.http import HttpResponse

def index(request):
	return HttpResponse('all articles')
	# return render_to_response('01-articles.html', {
	# 	'categories': Category.objects.all(),
	# 	'recent_articles': Article.objects.all()[:4],
	# 	})

def view_article(request, slug):
	return HttpResponse('article post')
	# return render_to_response('01-article-post.html', {
	# 	'post': get_object_or_404(Article, slug=slug)
	# 	})

def view_category(request, slug):
	return HttpResponse('article category')
	# category = get_object_or_404(Category, slug=slug)
	# return render_to_response('01-article-category-series.html', {
	# 	'category': category,
	# 	'posts': Article.objects.filter(category=category)[:5]
	# 	})

def view_series(request, slug):
	return HttpResponse('article series')
	# series = get_object_or_404(Series, slug=slug)
	# return render_to_response('01-article-category-series', {
	# 	'series': series,
	# 	'posts': Article.objects.filter(series=series)[:5]
	# 	})

def view_tag(request, slug):
	return HttpResponse('article tag')
	# tag = get_object_or_404(Tag, slug=slug)
	# return render_to_response('01-article-category-series.html', {
	# 	'tag': tag,
	# 	'posts': Article.objects.filter(tag=tag)[:5]
	# 	})