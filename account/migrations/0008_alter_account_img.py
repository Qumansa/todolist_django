# Generated by Django 4.2.4 on 2023-10-22 14:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0007_alter_account_img'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='img',
            field=models.ImageField(blank=True, default='Avatar/user.png', upload_to='Avatar/'),
        ),
    ]
