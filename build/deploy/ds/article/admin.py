from django.contrib import admin
from article.models import Article, Category, Series, Tag

# class ArticleAdmin(admin.ModelAdmin):
#     prepopulated_fields = {"slug": ("title",)}

admin.site.register(Article)
admin.site.register(Category)
admin.site.register(Series)
admin.site.register(Tag)