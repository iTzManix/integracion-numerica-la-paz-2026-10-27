param(
    [string]$GhPath = 'gh',
    [string]$RepositoryName = 'integracion-numerica-la-paz-2026-10-27'
)
$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot

function Invoke-Gh {
    param([string[]]$Arguments)
    $taskOutput = & $GhPath @Arguments
    if ($LASTEXITCODE -ne 0) { throw ('GitHub CLI no pudo completar: ' + ($Arguments -join ' ')) }
    return $taskOutput
}

& $GhPath auth status
if ($LASTEXITCODE -ne 0) { throw 'Primero inicia sesión de forma segura con gh auth login. No guardes tokens en estos archivos.' }
$taskUser = (Invoke-Gh -Arguments @('api','user')) | ConvertFrom-Json
$taskFullName = $taskUser.login + '/' + $RepositoryName
$taskExistingRemote = git remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0) { throw ('Esta carpeta ya tiene origin: ' + $taskExistingRemote + '. Comprueba PUBLICACION.md antes de volver a publicar.') }
if (-not (Test-Path -LiteralPath '.git')) {
    git init -b main
    if ($LASTEXITCODE -ne 0) { throw 'No se pudo iniciar el repositorio local.' }
}
git config user.name $taskUser.login
git config user.email ($taskUser.id.ToString() + '+' + $taskUser.login + '@users.noreply.github.com')
git add -- .
if ($LASTEXITCODE -ne 0) { throw 'No se pudieron preparar los archivos.' }
git commit -m 'Resolver integración numérica y añadir aplicación estática verificable'
if ($LASTEXITCODE -ne 0) { throw 'No se pudo crear el commit; revisa si ya existen cambios confirmados.' }
Invoke-Gh -Arguments @('repo','create',$taskFullName,'--public','--source','.','--remote','origin','--push','--description','Ejercicios 19 a 27 de integración numérica, calculadora, resolución PDF y pruebas.')
Invoke-Gh -Arguments @('api',('--method'),'POST',('repos/' + $taskFullName + '/pages'),'-f','source[branch]=main','-f','source[path]=/')
$taskPage = (Invoke-Gh -Arguments @('api',('repos/' + $taskFullName + '/pages'))) | ConvertFrom-Json
$taskRepositoryUrl = 'https://github.com/' + $taskFullName
@"
# Estado de publicación

Repositorio creado y archivos enviados: $taskRepositoryUrl

Dirección de GitHub Pages: $($taskPage.html_url)

La configuración de Pages está creada. Debe verificarse que el primer despliegue termine y que la página responda correctamente antes de declarar la publicación finalizada.
"@ | Set-Content -LiteralPath PUBLICACION.md -Encoding utf8
git add -- PUBLICACION.md
git commit -m 'Registrar repositorio y dirección de GitHub Pages'
if ($LASTEXITCODE -eq 0) { git push origin main }
Write-Output ('Repositorio: ' + $taskRepositoryUrl)
Write-Output ('Pages: ' + $taskPage.html_url)
Write-Output 'Comprueba el despliegue con gh api repos/PROPIETARIO/REPOSITORIO/pages/builds/latest y visita la URL.'
