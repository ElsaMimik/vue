
$Result = 0
try {
    msbuild.exe Vue-Testing-DotNet-3.csproj /t:build /p:Configuration=Debug /p:VisualStudioVersion=14.0
}
catch {
    $Result = 1
}

if ($Result -eq 0) {
    $Path = Get-Location
    $ConfigPath = "$Path\applicationhost.config"
    #Start-Process -WorkingDirectory "C:\Program Files\IIS Express" -ArgumentList "/config:$ConfigPath" iisexpress.exe 
    & "C:\Program Files\IIS Express\iisexpress.exe" /config:$ConfigPath
}
