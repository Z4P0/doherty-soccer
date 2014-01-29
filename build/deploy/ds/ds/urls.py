from django.conf.urls import patterns, include, url
from django.conf import settings
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

# admin urls
# ----------------------------
from django.contrib import admin
admin.autodiscover()




# main urls
# ----------------------------
urlpatterns = patterns('',
  # home
  url(r'^$', 'ds.views.home', name='home'),
  # login
  url(r'^sign-in/', 'ds.views.sign_in', name='sign_in'),
  url(r'^u/$', 'ds.views.auth_user', name='authenticate_user'),
  url(r'^u/profile/$', 'ds.views.user_profile', name='user_profile'),
  url(r'^u/sign-out/$', 'ds.views.sign_out', name='sign_out'),
  # url(r'^u/(?P<username>[^\.]+)$', 'ds.views.user_profile', name='user_profile'),

  # register
  url(r'^register/', 'ds.views.register', name='register'),
  # forgotten password
  url(r'^forgotten-password/', 'ds.views.forgotten_password', name='forgotten_password'),

  # articles
  url(r'^article/', include('article.urls', namespace='article')),
  url(r'^articles/', include('article.urls', namespace='article')),
  # admin
  url(r'^admin/', include(admin.site.urls)),
)



if settings.DEBUG:
	urlpatterns += staticfiles_urlpatterns()
	urlpatterns += patterns('',
    (r'^media/(?P<path>.*)$', 'django.views.static.serve', {
    'document_root': settings.MEDIA_ROOT})) 