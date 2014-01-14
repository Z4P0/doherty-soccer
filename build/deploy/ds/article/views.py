from django.shortcuts import render_to_response, get_object_or_404
from article.models import Article, Category, Series, Tag
from django.http import HttpResponse


def index(request):
	published_articles = Article.objects.all()[:10]
	categories = Category.objects.all()
	series = Series.objects.all()
	title = 'Articles'
	return render_to_response('article/01-articles.html', {
		'title': title,
		'categories': categories,
		'series': series,
		'published_articles': published_articles,
		})

def view_article(request, slug):
	article = get_object_or_404(Article, slug=slug)
	return render_to_response('article/01-article-post.html', {
		'article': article
		})





def view_all_categories(request):
	return HttpResponse('all article categories')

def view_category(request, slug):
	category = get_object_or_404(Category, slug=slug)
	category_articles = Article.objects.filter(category=category)[:10]
	return render_to_response('article/01-article-category-series.html', {
		'category': category,
		'posts': category_articles
		})





def view_all_series(request):
	return HttpResponse('all series')

def view_series(request, slug):
	series = get_object_or_404(Series, slug=slug)
	series_articles = Article.objects.filter(series=series)[:10]
	return render_to_response('article/01-article-category-series', {
		'series': series,
		'posts': series_articles
		})




def view_all_tags(request):
	return HttpResponse('all tags')

def view_tag(request, slug):
	tag = get_object_or_404(Tag, slug=slug)
	tag_articles = Article.objects.filter(tag=tag)[:10]
	return render_to_response('article/01-article-category-series.html', {
		'tag': tag,
		'posts': tag_articles
		})