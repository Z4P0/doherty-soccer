from django.shortcuts import render_to_response, get_object_or_404
from article.models import Article, Category, Series, Tag
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib import auth
from django.core.context_processors import csrf


def home(request):
	published_articles = Article.objects.all()[:10]
	latest_post = published_articles[0];
	recent_posts = published_articles[1:7]
	# ----------------------------
	title = 'Home'
	description = 'Your source for CONCACAF Coverage'
	return render_to_response('ds/00-homepage.html', {
		'title': title,
		'description': description,
		'latest_post': latest_post,
		'recent_posts': recent_posts
		})


def sign_in(request):
	c = {}
	c.update(csrf(request))
	c['title'] = 'Login'
	c['description'] = 'Login'
	return render_to_response('ds/03-login.html', c)


def sign_out(request):
	auth.logout(request)
	return HttpResponseRedirect('/sign-in')


def auth_user(request):
	username = request.POST.get('username', '')
	password = request.POST.get('password', '')
	user = auth.authenticate(username=username, password=password)

	if user is not None:
		auth.login(request, user)
		return HttpResponseRedirect('/u/profile')
		# return HttpResponseRedirect('/u/%s/' % username)
	else:
		return HttpResponseRedirect('/sign-in')


def user_profile(request):
	return render_to_response('ds/03-profile.html',{
		'title': request.user.username,
		'username': request.user.username,
		'description': 'Profile',
		})

