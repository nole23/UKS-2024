@echo off
:: Definišite direktorijum za SSL fajlove
set CERT_DIR=C:\nginx\ssl

:: Kreirajte direktorijum ako ne postoji
if not exist "%CERT_DIR%" mkdir "%CERT_DIR%"

:: Generisanje privatnog ključa sa šifrom
echo Generisanje privatnog ključa sa šifrom...
openssl genpkey -algorithm RSA -out "%CERT_DIR%\nginx.key" -aes256 -pkeyopt rsa_keygen_bits:2048 -passout pass:novicanikolic

:: Generisanje CSR (Certificate Signing Request)
echo Generisanje CSR (Certificate Signing Request)...
openssl req -new -key "%CERT_DIR%\nginx.key" -out "%CERT_DIR%\nginx.csr" -passin pass:novicanikolic -subj "/CN=localhost"

:: Generisanje SSL sertifikata (self-signed) sa šifrovanim ključem
echo Generisanje SSL sertifikata...
openssl x509 -req -in "%CERT_DIR%\nginx.csr" -signkey "%CERT_DIR%\nginx.key" -out "%CERT_DIR%\nginx.crt" -days 365 -passin pass:novicanikolic

echo SSL sertifikat generisan u %CERT_DIR%
pause
