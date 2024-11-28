from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from users.models import CustomUser

class UserTests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.create_url = reverse('create_user')  # URL za kreiranje korisnika
        self.all_users_url = reverse('get_all_users')  # URL za dobijanje svih korisnika
        self.login_url = reverse('login_user')  # URL za prijavu korisnika

        # Kreirajte korisnika za prijavu testove
        self.user_data = {
            'username': 'testuser',
            'email': 'testuser@example.com',
            'first_name': 'Test',
            'last_name': 'User',
            'password': 'testpassword123'
        }
        self.user = CustomUser.objects.create_user(**self.user_data)

    def test_create_user(self):
        response = self.client.post(self.create_url, data={
            'email': 'newuser@example.com',
            'username': 'newuser',
            'first_name': 'New',
            'last_name': 'User',
            'password': 'newpassword'
        })

        # Debugging: Proverite sadržaj odgovora da biste videli zašto je došlo do greške
        print(response.content)  # Debug izlaz
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_all_users(self):
        # Testiranje dohvatanja svih korisnika
        response = self.client.get(self.all_users_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  # Trebalo bi da imamo samo jednog korisnika (onog kojeg smo napravili u setUp)

    def test_login_user_success(self):
        # Kreiramo korisnika sa ispravnim podacima (korisnik koji treba da se prijavi)
        response = self.client.post(self.login_url, data={
            'email': 'testuser@example.com',  # Ispravan email
            'password': 'testpassword123'  # Ispravna lozinka
        })

        # Proverava da li je korisnik uspešno prijavljen
        print(response.json())  # Debugging izlaz
        self.assertEqual(response.json()['message'], "User logged in successfully")

    def test_login_user_fail(self):
        # Testiranje neuspešne prijave
        response = self.client.post(self.login_url, data={
            'email': 'wrongemail@example.com',  # Pogrešan email
            'password': 'wrongpassword'  # Pogrešna lozinka
        })

        # Proverava da li je odgovor "Invalid credentials"
        print(response.json())  # Debugging izlaz
        self.assertEqual(response.json()['message'], "Invalid credentials")
