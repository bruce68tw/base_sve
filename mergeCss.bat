@ECHO OFF
cls

rem set baseDir=d:\_project\base_sve\src
set baseDir=%~dp0src

rem copy %baseDir%\src\base\css\*.css %baseDir%\src\base\base.css /Y
powershell -Command "& {Get-content %baseDir%\css\*.css | out-file -encoding UTF8 %baseDir%\base.css}"

@ECHO finish!!

pause