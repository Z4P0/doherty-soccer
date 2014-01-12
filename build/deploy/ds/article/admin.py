from django.contrib import admin
from article.models import Article, Category, Series, Tag



class ArticleAdmin(admin.ModelAdmin):
	prepopulated_fields = {'slug': ('title',)}

class CategoryAdmin(admin.ModelAdmin):
	prepopulated_fields = {'slug': ('title',)}

class SeriesAdmin(admin.ModelAdmin):
	prepopulated_fields = {'slug': ('title',)}

class TagAdmin(admin.ModelAdmin):
	prepopulated_fields = {'slug': ('title',)}



admin.site.register(Article, ArticleAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Series, SeriesAdmin)
admin.site.register(Tag, TagAdmin)