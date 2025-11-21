from django.db import models


class Todo(models.Model):
  title = models.CharField(max_length=200)
  completed = models.BooleanField(default=False)
  create_at = models.DateTimeField(auto_now_add=True)
  
  def __str__(self):
    return self.title
  
  class Meta:
    ordering = ['-create_at']
    