from django.urls import path
from .views import TodoListCreateView, TodoDetailView

urlpatterns = [
  path('todos/', TodoListCreateView.as_view(), name='todo-list'),
  path('todo/<int:pk>/', TodoDetailView.as_view(), name='todo-detail')
]