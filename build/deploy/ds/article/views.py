from django.shortcuts import render_to_response, get_object_or_404
from article.models import Article, Category, Series, Tag
from django.http import HttpResponse


def index(request):
	published_articles = Article.objects.all()[:10]
	categories = Category.objects.all()
	series = Series.objects.all()
	title = 'Articles'
	description = 'All articles published'
	# should loop throug all categories and series to say:
	# covering: MLS, USMNT, Youth Development, Soccer In America
	return render_to_response('article/01-articles.html', {
		'title': title,
		'description': description,
		'categories': categories,
		'series': series,
		'published_articles': published_articles,
		})




def view_article(request, slug):
	article = get_object_or_404(Article, slug=slug)
	# next article
	if Article.objects.filter(id=article.id+1).exists():
		next_article = get_object_or_404(Article, id=article.id+1)
	else:
		next_article = get_object_or_404(Article, id=article.id-1)

	# related articles
	# get 1.) category 2.) tag 3.)series
	related_articles = Article.objects.filter(category=article.category)[:3]

	return render_to_response('article/01-article-post.html', {
		'article': article,
		'next_article': next_article,
		'related_articles': related_articles
		})





def view_all_categories(request):
	return HttpResponse('all article categories')

def view_category(request, slug):
	category = get_object_or_404(Category, slug=slug)
	description = 'Description about the category'
	category_articles = Article.objects.filter(category=category)[:10]
	return render_to_response('article/01-article-category-series.html', {
		'title': category,
		'description': description,
		'posts': category_articles[1:5],
		'latest_post': category_articles[0]
		})



def view_all_tags(request):
	return HttpResponse('all tags')

def view_tag(request, slug):
	tag = get_object_or_404(Tag, slug=slug)
	tag_articles = Article.objects.filter(tags=tag)[:10]
	return render_to_response('article/01-article-category-series.html', {
		'title': tag,
		'posts': tag_articles[1:5],
		'latest_post': tag_articles[0]
		})





def view_all_series(request):
	return HttpResponse('all series')

def view_series(request, slug):
	series = get_object_or_404(Series, slug=slug)
	series_articles = Article.objects.filter(series=series)[:10]
	return render_to_response('article/01-article-category-series', {
		'series': series,
		'posts': series_articles,
		'latest_post': series_articles[0]
		})



