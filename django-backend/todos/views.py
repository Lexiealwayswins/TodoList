from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from .models import Todo
from django.http import JsonResponse
import json
from django.shortcuts import get_object_or_404

@method_decorator(csrf_exempt, name='dispatch') # CSRF（Cross-Site Request Forgery） 是一种常见的攻击方式：攻击者诱导用户在已登录的网站上执行恶意操作，比如伪造表单提交。
class TodoListCreateView(View):
  def get(self, request):
    todos = Todo.objects.all()[:10]
    data = [
      {
        'id': todo.id,
        'title': todo.title,
        'completed': todo.completed,
        'create_at': todo.create_at.isoformat()
      }
      for todo in todos
    ]
    return JsonResponse(data, safe=False)
  
  def post(self, request):
    try:
      body = json.loads(request.body)
      title = body.get('title', '').strip()
      if not title:
        return JsonResponse({'error': 'Title cannot be empty'}, status=400)
      
      todo = Todo.objects.create(title=title)
      return JsonResponse({
        'id': todo.id,
        'title': todo.title,
        'completed': todo.completed,
        'create_at': todo.create_at.isoformat()
      }, status=201)
      
    except json.JSONDecodeError:
      return JsonResponse({'error': 'Invalid Json'}, status=400)
    except Exception as e:
      return JsonResponse({'error': str(e)}, status=500)
    
@method_decorator(csrf_exempt, name='dispatch')
class TodoDetailView(View):
  def get(self, request, pk):
    todo = get_object_or_404(Todo, pk=pk) # pk = primary key
    return JsonResponse({
        'id': todo.id,
        'title': todo.title,
        'completed': todo.completed,
        'create_at': todo.create_at.isoformat()
    })
    
  def put(self, request, pk):
      todo = get_object_or_404(Todo, pk=pk)
      try:
        body = json.loads(request.body)
        title = body.get('title')
        completed = body.get('completed')
        
        if title is not None:
          todo.title = title.strip()
        if completed is not None:
          todo.completed = bool(completed)
        
        if title is not None and not todo.title:
          return JsonResponse({'error': 'Title cannot be empty'}, status=400)
        
        todo.save()
        return JsonResponse({
          'id': todo.id,
          'title': todo.title,
          'completed': todo.completed,
          'create_at': todo.create_at.isoformat()
        })
      except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
      
  def delete(self, request, pk):
    todo = get_object_or_404(Todo, pk=pk)
    todo.delete()
    return JsonResponse({}, status=204)
    