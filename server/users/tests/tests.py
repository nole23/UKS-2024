from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from users.models import CustomUser
from unittest.mock import patch

class UserTests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.create_url = reverse('create_user')  # URL za kreiranje korisnika
        self.all_users_url = reverse('get_all_users')  # URL za dobijanje svih korisnika
        self.login_url = reverse('login_user')  # URL za prijavu korisnika
        self.reset_password_url = reverse('reset_password')  # URL za resetovanje lozinke
        self.verify_token_url = reverse('verify_token')  # URL za verifikaciju tokena
        self.set_new_password_url = reverse('set_new_passwrod')  # URL za postavljanje nove lozinke

        # Kreirajte korisnika za prijavu testove
        self.user_data = {
            'username': 'testuser',
            'email': 'testuser@example.com',
            'first_name': 'Test',
            'last_name': 'User',
            'password': 'testpassword123'
        }
        self.user = CustomUser.objects.create_user(**self.user_data)

    # Testiranje kreiranja korisnika
    def test_create_user(self):
        response = self.client.post(self.create_url, data={
            'email': 'newuser@example.com',
            'username': 'newuser',
            'first_name': 'New',
            'last_name': 'User',
            'password': 'newpassword'
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json()['email'], 'newuser@example.com')

    # Testiranje dohvatanja svih korisnika
    def test_get_all_users(self):
        response = self.client.get(self.all_users_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  # Trebalo bi da imamo samo jednog korisnika (onog kojeg smo napravili u setUp)

    # Testiranje uspešne prijave korisnika
    def test_login_user_success(self):
        response = self.client.post(self.login_url, data={
            'email': 'testuser@example.com',
            'password': 'testpassword123'
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()['message'], 'SUCCESS')  # Popravljen očekivani odgovor

    # Testiranje neuspešne prijave korisnika
    def test_login_user_fail(self):
        response = self.client.post(self.login_url, data={
            'email': 'wrongemail@example.com',
            'password': 'wrongpassword'
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.json()['message'], 'INVALID_CREDENTIALS')  # Popravljen očekivani odgovor

    # Testiranje resetovanja lozinke
    @patch('users.views.send_mail')  # Mocking send_mail kako bismo izbegli slanje stvarnih emailova
    def test_reset_password(self, mock_send_mail):
        response = self.client.post(self.reset_password_url, data={'email': 'testuser@example.com'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()['message'], 'SUCCESS')
        mock_send_mail.assert_called_once()  # Proveravamo da li je send_mail pozvan

    # Testiranje verifikacije tokena (uspešna verifikacija)
    def test_verify_token_success(self):
        token = 'valid-token'
        email = 'testuser@example.com'
        CustomUser.objects.filter(email=email).update(bio=token)  # Simuliraj token čuvanje u 'bio'
        response = self.client.get(self.verify_token_url, {'token': token, 'email': email})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()['message'], 'SUCCESS')

    # Testiranje verifikacije tokena (neuspešna verifikacija)
    def test_verify_token_fail(self):
        token = 'invalid-token'
        email = 'testuser@example.com'
        response = self.client.get(self.verify_token_url, {'token': token, 'email': email})
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertEqual(response.json()['message'], 'Token is invalid')

    # Testiranje postavljanja nove lozinke
    def test_set_new_password_success(self):
        token = 'valid-token'
        email = 'testuser@example.com'
        password = 'newpassword123'
        CustomUser.objects.filter(email=email).update(bio=token)  # Simuliraj token čuvanje u 'bio'
        response = self.client.put(self.set_new_password_url, data={
            'email': email,
            'password': password,
            'token': token
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()['message'], 'SUCCESS')

    def test_set_new_password_fail(self):
        token = 'invalid-token'
        email = 'testuser@example.com'
        password = 'newpassword123'
        response = self.client.put(self.set_new_password_url, data={
            'email': email,
            'password': password,
            'token': token
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.json()['message'], 'Token not valid')
