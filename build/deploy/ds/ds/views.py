from django.shortcuts import render_to_response, get_object_or_404
from article.models import Article, Category, Series, Tag
from django.http import HttpResponse


# def home(request):
# 	return HttpResponse('homepage')

def home(request):
	published_articles = Article.objects.all()[:10]
	latest_post = published_articles[0];
	recent_posts = published_articles[1:6]
	# ----------------------------
	title = 'Home'
	description = 'Your source for CONCACAF Coverage'
	return render_to_response('ds/00-homepage.html', {
		'title': title,
		'description': description,
		'latest_post': latest_post,
		'recent_posts': recent_posts
		})