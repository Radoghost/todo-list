from django.db import models


class Todo(models.Model):
    title = models.CharField(max_length=100)
    body = models.TextField(max_length=300, null=True, blank=True)
    done = models.BooleanField(default=False)

    def __str__(self):
        return self.title