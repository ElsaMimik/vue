if (Get-Command "choco" -errorAction SilentlyContinue) {
    "chocolatey exist, pass install"
}
else {
    $chocoInstallCommand = "/c Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))";
    Start-Process powershell -Verb runAs -WorkingDirectory (Get-Location).Path -Wait -ArgumentList $chocoInstallCommand;
}

$nodeInstallCommand = "/c choco install netfx-4.7.1-devpack -y";
Start-Process powershell -Verb runAs -WorkingDirectory (Get-Location).Path -Wait -ArgumentList $nodeInstallCommand

if (Get-Command "npm" -errorAction SilentlyContinue) {
    "node exist, pass install"
}
else {
    Start-Process powershell -Verb runAs -WorkingDirectory (Get-Location).Path -Wait -ArgumentList "/c choco install nodejs --version 9.3.0 -n -y"
}

Start-Process powershell -Verb runAs -WorkingDirectory (Get-Location).Path -Wait -ArgumentList "/c npm install webpack -g"
Start-Process powershell -Verb runAs -WorkingDirectory (Get-Location).Path -Wait -ArgumentList "/c npm install webpack-dev-server -g"
Start-Process powershell -Verb runAs -WorkingDirectory (Get-Location).Path -Wait -ArgumentList "/c npm install"
