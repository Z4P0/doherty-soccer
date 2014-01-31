from django.shortcuts import render_to_response, get_object_or_404
from article.models import Article, Category, Series, Tag
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib import auth
from django.core.context_processors import csrf
from forms import DS_UserRegistration

def home(request):
	published_articles = Article.objects.all()[:10]
	latest_post = published_articles[0];
	recent_posts = published_articles[1:7]
	# ----------------------------
	title = 'Home'
	description = 'Your source for CONCACAF Coverage'
	page_id = 'homepage'
	data_page = 'home'
	return render_to_response('ds/00-homepage.html', {
		'title': title,
		'description': description,
		'page_id': page_id,
		'data_page': data_page,
		'latest_post': latest_post,
		'recent_posts': recent_posts
		})


# sign in
def sign_in(request):
	c = {}
	c.update(csrf(request))
	c['title'] = 'Login'
	c['description'] = 'Login'
	c['page_id'] = 'login'
	c['data_page'] = 'signin'
	return render_to_response('ds/03-login.html', c)


# sign out
def sign_out(request):
	auth.logout(request)
	return HttpResponseRedirect('/sign-in')


# authenticate user
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


# register
def register(request):
	if request.method == 'POST':
		form = DS_UserRegistration(request.POST)
		if form.is_valid():
			form.save()
			# how do we grab the username from this to pass to the view?
			# form['username']
			return HttpResponseRedirect('/u/profile')
	
	args = {}
	args.update(csrf(request))
	args['form'] = DS_UserRegistration()
	args['title'] = 'Register'
	args['description'] = 'Register'
	args['page_id'] = 'register'
	args['data_page'] = 'signin'
	return render_to_response('ds/03-register.html', args)

# register - sucess
# def register_success(request):


# register - complete
# def thoing(request):



# forgotten password
def forgotten_password(request):
	# if request.method == 'POST':
	# 	form = 
	return render_to_response('ds/03-forgotten-password.html', {
		'title': 'Forgotten Password',
		'description': 'Forgotten Password',
		'page_id': 'forgotten-password',
		'data_page': 'signin'
		})


# view user profile
def user_profile(request):
	return render_to_response('ds/03-profile.html',{
		'title': request.user.username,
		'username': request.user.username,
		'description': 'Profile',
		})

