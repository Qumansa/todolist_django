# Generated by Django 4.2.4 on 2023-10-20 18:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='img',
            field=models.ImageField(default='user.png', upload_to='avatar'),
        ),
    ]
