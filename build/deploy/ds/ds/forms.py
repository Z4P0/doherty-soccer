from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

class DS_UserRegistration(UserCreationForm):
	email = forms.EmailField(required=True)
	termsAndConditions = forms.BooleanField(required=True)

	class Meta:
		model = User
		fields = ('username', 'email', 'password1', 'password2', 'termsAndConditions')

		def save(self, commit=True):
			user = super(UserCreationForm, self).save(commit=False)
			user.email = self.cleaned_date['email']

			if commit:
				user.save()

			return user