
$result = 0
try {
    msbuild.exe Vue-Testing-DotNet-3.csproj /t:build /p:Configuration=Debug /p:VisualStudioVersion=14.0
}
catch {
    $result = 1
}

if ($result -ne 0) {
    Exit 1
}

$iisexpress = Get-Process -name iisexpress -ErrorAction SilentlyContinue
if (!$iisexpress) {
    $Path = Get-Location
    $ConfigPath = "$Path\applicationhost.config"
    Start-Process -WorkingDirectory "C:\Program Files\IIS Express" -ArgumentList "/config:$ConfigPath" iisexpress.exe -PassThru -WindowStyle Hidden
    #& "C:\Program Files\IIS Express\iisexpress.exe" /config:$ConfigPath
}