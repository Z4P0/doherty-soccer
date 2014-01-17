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
  url(r'^$', 'ds.views.home', name='home'),
  url(r'^articles/', include('article.urls', namespace='article')),
  url(r'^article/', include('article.urls', namespace='article')),
  url(r'^admin/', include(admin.site.urls)),
)



if settings.DEBUG:
	urlpatterns += staticfiles_urlpatterns()