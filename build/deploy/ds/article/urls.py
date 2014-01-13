from django.conf.urls import patterns, url
from article import views

urlpatterns = patterns('',

	# article/
	# articles/
	# ----------------------------
	url(r'^$', views.index, name='all_articles'),





	# article/category
	# article/categories
	# ----------------------------
	url(r'^category/$', views.view_all_categories, name='all_article_categories'),
	url(r'^categories/$', views.view_all_categories, name='all_article_categories'),
	
	# article/category/[title]
	# article/categories/[title]
	# ----------------------------
	url(r'^category/(?P<slug>[^\.]+)$', views.view_category, name='article_category'),
	url(r'^categories/(?P<slug>[^\.]+)$', views.view_category, name='article_category'),





	# article/series
	# ----------------------------
	url(r'^series/$', views.view_all_series, name='all_article_series'),
	
	# article/series/[title]
	# ----------------------------
	url(r'^series/(?P<slug>[^\.]+)$', views.view_series, name='article_series'),





	# article/tags
	# article/tag
	# ----------------------------
	url(r'^tag/$', views.view_all_tags, name='all_article_tags'),
	url(r'^tags/$', views.view_all_tags, name='all_article_tags'),

	# article/tag/[title]
	# article/tags/[title]
	# ----------------------------
	url(r'^tag/(?P<slug>[^\.]+)$', views.view_tag, name='article_tag'),
	url(r'^tags/(?P<slug>[^\.]+)$', views.view_tag, name='article_tag'),



	

	# article/[title]
	# ----------------------------
	url(r'^(?P<slug>[^\.]+)/$', views.view_article, name='article'),
	)