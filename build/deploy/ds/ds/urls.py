from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'ds.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^article/', include('article.urls')),
    url(r'^articles/', include('article.urls')),
    url(r'^admin/', include(admin.site.urls)),
)
