
$result = 0
try {
    msbuild.exe Vue-Testing-DotNet-3.csproj /t:build /p:Configuration=Debug /p:VisualStudioVersion=14.0
}
catch {
    $result = 1
}

if ($result -ne 0) {
    Write-Output "build fail, please check the project status"
    Exit 1
}

$loopCount = 0

do {
    if ($loopCount -eq 10) {
        Write-Output "iisexpress stop fail, and re-try 10 times..."
        Exit 2
    }

    $iisexpress = Get-Process -name iisexpress -ErrorAction SilentlyContinue
    if ($iisexpress) {
        Stop-Process -processname iisexpress -Force
        $iisexpress = Get-Process -name iisexpress -ErrorAction SilentlyContinue
    }

    $loopCount = $loopCount + 1

} while ($iisexpress -or $loopCount > 10)

$path = Get-Location
cd..
$upPath = Get-Location
$hostPath = "$upPath\.vs\config\applicationhost.config"

if (![System.IO.File]::Exists($hostPath)) {
    Write-Output "error!! no found applicationhost.config for iisexpress..."
    Write-Output "error!! please open with visual studio 2017 and debug first to create applicationhost.config..."
    Exit 3
}

Set-Location $path
Start-Process -WorkingDirectory "C:\Program Files\IIS Express" -ArgumentList "/config:$hostPath" iisexpress.exe -PassThru -WindowStyle Hidden

#& "C:\Program Files\IIS Express\iisexpress.exe" /config:$ConfigPath