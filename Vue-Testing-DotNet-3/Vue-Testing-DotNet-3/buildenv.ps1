Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
choco install netfx-4.7.1-devpack -y
choco install nodejs --version 9.3.0 -y
npm install webpack -g
npm install webpack-dev-server -g
