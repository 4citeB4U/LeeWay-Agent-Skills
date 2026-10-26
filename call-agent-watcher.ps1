$ErrorActionPreference='Continue'
Write-Output 'LEEWAY_CALL_AGENT_WATCHER_ARMED'
$last=-1;$btWasOn=$null
while($true){
  $raw=adb shell dumpsys telephony.registry 2>$null
  $m=$raw | Select-String -Pattern '^\s*mCallState=' | Select-Object -First 1
  $state=-1;if($m){$state=[int](($m.ToString() -split '=')[1].Trim())}
  if($state -ne $last){Write-Output ((Get-Date -Format o)+' CALL_STATE='+$state);$last=$state}
  if($state -eq 1){
    if($null -eq $btWasOn){$btWasOn=(adb shell settings get global bluetooth_on).Trim()}
    Write-Output ((Get-Date -Format o)+' RINGING_DETECTED')
    adb shell svc bluetooth disable | Out-Null
    Start-Sleep -Milliseconds 700
    adb shell input keyevent 79 | Out-Null
    Start-Sleep -Milliseconds 1500
    $raw2=adb shell dumpsys telephony.registry 2>$null
    $m2=$raw2 | Select-String -Pattern '^\s*mCallState=' | Select-Object -First 1
    $s2=-1;if($m2){$s2=[int](($m2.ToString() -split '=')[1].Trim())}
    Write-Output ((Get-Date -Format o)+' POST_ANSWER_STATE='+$s2)
    if($s2 -eq 2){
      Write-Output 'LEEWAY_CALL_ANSWER_CONTROL_PASS'
      1..4 | ForEach-Object { adb shell input keyevent 24 | Out-Null; Start-Sleep -Milliseconds 80 }
      adb shell am start -a android.intent.action.VIEW -d https://rapidwebdevelop.com/ com.android.chrome | Out-Null
      Start-Sleep -Seconds 2
      $sockLine=adb shell cat /proc/net/unix | Select-String 'chrome_devtools_remote' | Select-Object -Last 1
      if($sockLine){
        $sock=$sockLine.ToString().Split('@')[-1]
        adb forward --remove tcp:9223 2>$null
        adb forward tcp:9223 localabstract:$sock | Out-Null
        adb reverse tcp:8770 tcp:8770 | Out-Null
        Push-Location 'C:\Users\Leona\.codex\leeway\LeeWay-Agent-Skills'
        node .\rapid-call-mode.mjs
        Pop-Location
      }
    }
  }
  if($state -eq 0 -and $null -ne $btWasOn){
    Write-Output ((Get-Date -Format o)+' CALL_ENDED')
    if($btWasOn -eq '1'){adb shell svc bluetooth enable | Out-Null;Write-Output 'BLUETOOTH_RESTORED'}
    $btWasOn=$null
  }
  Start-Sleep -Milliseconds 500
}