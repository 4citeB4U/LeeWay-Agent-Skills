$ErrorActionPreference='Continue'
Write-Output 'LEEWAY_PHONE_TEST_AUTORESUME_ARMED'
while($true){
  $dev=adb devices 2>$null | Select-String "\tdevice$" | Select-Object -First 1
  if($dev){
    Write-Output ((Get-Date -Format o)+' AUTHORIZED_ADB_DEVICE_DETECTED')
    adb reverse tcp:8770 tcp:8770 | Out-Null
    adb shell am start -a android.intent.action.VIEW -d https://rapidwebdevelop.com/ com.android.chrome | Out-Null
    Start-Sleep -Seconds 3
    $sockLine=adb shell cat /proc/net/unix | Select-String 'chrome_devtools_remote' | Select-Object -Last 1
    if($sockLine){
      $sock=$sockLine.ToString().Split('@')[-1]
      adb forward --remove tcp:9223 2>$null
      adb forward tcp:9223 localabstract:$sock | Out-Null
      Push-Location 'C:\Users\Leona\.codex\leeway\LeeWay-Agent-Skills'
      Write-Output 'AUTORESUME_LIVE_CONTROLLER'
      node .\rapid-live-inject.mjs
      Write-Output 'AUTORESUME_TWO_PHASE'
      node .\rapid-two-phase.mjs
      Write-Output 'AUTORESUME_LOCAL_LISTENER'
      node .\rapid-local-listener.mjs
      Write-Output 'AUTORESUME_BUFFERED_TRANSCRIPT'
      node .\rapid-buffer-transcript.mjs
      Pop-Location
      Write-Output 'LEEWAY_DIGITAL_BRAIN_READY_FOR_MANUAL_QUESTION'
      Start-Process powershell -ArgumentList '-NoProfile','-ExecutionPolicy','Bypass','-File','C:\Users\Leona\.codex\leeway\LeeWay-Agent-Skills\call-agent-watcher.ps1' -WindowStyle Hidden
      break
    }
  }
  Start-Sleep -Seconds 2
}