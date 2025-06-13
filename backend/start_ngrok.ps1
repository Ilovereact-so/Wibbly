# Definiuj port dla Ngrok
$port = 3003

# Uruchom Ngrok z określonym regionem i wymuszonym HTTPS
$ngrokProcess = Start-Process -FilePath "ngrok" -ArgumentList "http $port"

# Poczekaj chwilę, aby upewnić się, że Ngrok się uruchomił
Start-Sleep -Seconds 2

# Pobierz aktualny adres URL Ngrok
$response = Invoke-RestMethod http://127.0.0.1:4040/api/tunnels
$ngrokUrl = $response.tunnels[0].public_url

# Zapisz URL w pliku .env
$envContent = "REACT_APP_NGROK_URL=$ngrokUrl"
$publicEnvPath = "../.env" # Wskaż ścieżkę względną do public
Set-Content -Path $publicEnvPath -Value $envContent

Write-Output "Ngrok URL: $ngrokUrl zapisany w $publicEnvPath"

# Opcjonalnie: zatrzymaj Ngrok po zakończeniu działania skryptu
# $ngrokProcess | Stop-Process