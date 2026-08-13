$ErrorActionPreference = 'Stop'

$taskName = 'MetaAdsTokenRefresh'
$workingDir = 'E:\meta-ads-client'
$scriptPath = 'node lib/refreshToken.js'

$action = New-ScheduledTaskAction -Execute 'cmd.exe' -Argument "/c cd /d `"$workingDir`" && $scriptPath >> refresh.log 2>&1" -WorkingDirectory $workingDir

$trigger = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(2)
$trigger.Repetition = New-ScheduledTaskTrigger -Once -At (Get-Date) -RepetitionInterval (New-TimeSpan -Days 45) -RepetitionDuration (New-TimeSpan -Days 3650)

$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -DontStopOnIdleEnd

Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -Force | Out-Null

Write-Host "Task '$taskName' berhasil dibuat. Akan refresh token setiap 45 hari."