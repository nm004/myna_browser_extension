python -m pip install dist\myna_browser_extension_nmh-0.1.0-py3-none-any.whl

$nmh_dir = "$env:LOCALAPPDATA\MPA\myna_browser_extension"
$exe = (Get-Command myna_browser_extension_nmh.exe).Path

New-Item -Force -ItemType Directory "$env:LOCALAPPDATA\MPA\myna_browser_extension"
(Get-Content extension.json.in) -replace "@path@","$exe" | Set-Content -Force "$nmh_dir\myna_browser_extension.json"
New-Item -Force -Path HKCU:\Software\Mozilla\NativeMessagingHosts\myna_browser_extension -Value "$nmh_dir\myna_browser_extension.json"