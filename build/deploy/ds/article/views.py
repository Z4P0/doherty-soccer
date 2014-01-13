from django.shortcuts import render_to_response, get_object_or_404
from article.models import Article, Category, Series, Tag
from django.http import HttpResponse


def index(request):
	published_articles = Article.objects.all()[:10]
	categories = Category.objects.all()
	return render_to_response('article/01-articles.html', {
		'categories': categories,
		'published_articles': published_articles,
		})

def view_article(request, slug):
	return HttpResponse('article: %s' % slug)
	# return render_to_response('01-article-post.html', {
	# 	'post': get_object_or_404(Article, slug=slug)
	# 	})




def view_all_categories(request):
	return HttpResponse('all article categories')


def view_category(request, slug):
	return HttpResponse('article category: %s' % slug)
	# category = get_object_or_404(Category, slug=slug)
	# return render_to_response('01-article-category-series.html', {
	# 	'category': category,
	# 	'posts': Article.objects.filter(category=category)[:5]
	# 	})


def view_all_series(request):
	return HttpResponse('all series')

def view_series(request, slug):
	return HttpResponse('article series: %s' % slug)
	# series = get_object_or_404(Series, slug=slug)
	# return render_to_response('01-article-category-series', {
	# 	'series': series,
	# 	'posts': Article.objects.filter(series=series)[:5]
	# 	})




def view_all_tags(request):
	return HttpResponse('all tags')

def view_tag(request, slug):
	return HttpResponse('article tag: %s' % slug)
	# tag = get_object_or_404(Tag, slug=slug)
	# return render_to_response('01-article-category-series.html', {
	# 	'tag': tag,
	# 	'posts': Article.objects.filter(tag=tag)[:5]
	# 	})