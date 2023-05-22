Remove-Item -Force -Path "$env:LOCALAPPDATA\MPA\myna_browser_extension\myna_browser_extension.json"
Remove-Item -Force -Path HKCU:\Software\Mozilla\NativeMessagingHosts\myna_browser_extension
python -m pip uninstall -y myna_browser_extension_nmh