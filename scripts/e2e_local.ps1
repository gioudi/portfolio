<#
.SYNOPSIS
  Portfolio E2E proof robot (SPEC-P06 Stage A).
  Run from the repo root (the folder containing docker-compose.yml).

.USAGE
  docker compose up --build -d
  .\scripts\e2e_local.ps1
#>

param(
    [string]$BaseUrl = "http://localhost:5000",
    [string]$Username = "admin",
    [string]$Password = "Portfolio-dev-2026!"
)

$script:pass = 0
$script:fail = 0

function Check($name, $ok, $detail) {
    if ($ok) {
        $script:pass++
        Write-Host "  [PASS] $name $(if($detail){"- $detail"})" -ForegroundColor Green
    } else {
        $script:fail++
        Write-Host "  [FAIL] $name $(if($detail){"- $detail"})" -ForegroundColor Red
    }
}

function Wait-Healthy($url, $seconds) {
    for ($i = 0; $i -lt $seconds; $i++) {
        try {
            if ((Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 2).StatusCode -eq 200) { return $true }
        } catch { }
        Start-Sleep 1
    }
    return $false
}

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "   PORTFOLIO E2E PROOF ROBOT (Stage A)"      -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

# ── TEST 0: Docker engine reachable ────────────────────────
docker info *> $null
Check "Docker engine is running" ($LASTEXITCODE -eq 0) "open Docker Desktop and wait for the whale if not"

# ── TEST 1: /health answers and reports PostgreSQL ─────────
try {
    $h = Invoke-RestMethod "$BaseUrl/health" -TimeoutSec 5
    Check "/health responds" ($h.status -eq "ok") "db=$($h.db)"
} catch {
    Check "/health responds" $false "is the stack up? run: docker compose up --build -d"
}

# ── TEST 2: login returns a JWT wristband ──────────────────
$tok = $null
try {
    $b = @{ username = $Username; password = $Password } | ConvertTo-Json
    $r = Invoke-RestMethod -Uri "$BaseUrl/api/login" -Method Post -ContentType "application/json" -Body $b -TimeoutSec 5
    $tok = $r.token
    Check "login works" ([bool]$tok) "JWT length $($tok.Length)"
} catch {
    Check "login works" $false "check DEFAULT_USER/DEFAULT_PASSWORD seed warnings in api logs"
}

# ── TEST 3: public project list readable ───────────────────
try {
    $before = @(Invoke-RestMethod "$BaseUrl/api/projects" -TimeoutSec 5).Count
    Check "GET /api/projects readable" $true "current rows: $before"
} catch {
    $before = -1
    Check "GET /api/projects readable" $false $_.Exception.Message
}

# ── TEST 4: authenticated create round-trip ────────────────
$name = "E2E-{0}" -f (Get-Date -Format "yyyyMMdd-HHmmss")
$createdOk = $false
if ($tok) {
    try {
        $body = @{
            name             = $name
            description      = "Row created by scripts/e2e_local.ps1"
            link             = "https://example.com/e2e"
            project_type_id  = 1
            technologies     = @("Docker", "Gunicorn", "PostgreSQL")
            tags             = @("e2e")
            responsibilities = "Stage A proof P-A5"
            images           = @(@{ url = "https://res.cloudinary.com/douq2tfdm/image/upload/portfolio/INTERCAM.webp" })
        } | ConvertTo-Json -Depth 3
        $c = Invoke-RestMethod -Uri "$BaseUrl/api/projects" -Method Post -ContentType "application/json" -Body $body -Headers @{ Authorization = "Bearer $tok" } -TimeoutSec 10
        $createdOk = ($c.message -match "success")
        Check "create project with Bearer token" $createdOk "id=$($c.project.id) name=$name"
    } catch {
        Check "create project with Bearer token" $false $_.Exception.Message
    }
} else {
    Check "create project with Bearer token" $false "skipped - no token from TEST 2"
}

# ── TEST 5: the row really lives in PostgreSQL ─────────────
$row = docker compose exec -T db psql -U portfolio -d portfolio -tAc "SELECT count(*) FROM projects WHERE name='$name';" 2>$null
Check "row visible inside Postgres (SQL proof)" ("$row".Trim() -ge "1") "psql found the created row"

# ── TEST 6: data survives an api restart (volume proof) ────
docker compose restart api *> $null
$alive = Wait-Healthy "$BaseUrl/health" 40
$after = -1
if ($alive) {
    try { $after = @(Invoke-RestMethod "$BaseUrl/api/projects" -TimeoutSec 5 | Where-Object { $_.name -eq $name }).Count } catch { }
}
Check "data survives 'docker compose restart api'" ($after -eq 1) "found $after matching row(s) after restart"

# ── TEST 7: login rate limiter blocks abusers ──────────────
$codes = @()
for ($i = 1; $i -le 6; $i++) {
    $wb = @{ username = "intruder"; password = "WrongPass-123!" } | ConvertTo-Json
    try {
        $null = Invoke-WebRequest -Uri "$BaseUrl/api/login" -Method Post -ContentType "application/json" -Body $wb -UseBasicParsing -TimeoutSec 5
        $codes += 200
    } catch {
        $codes += $_.Exception.Response.StatusCode.value__
    }
    Start-Sleep -Milliseconds 300
}
Check "rate limiter: 5 tries then HTTP 429" (($codes[0..4] | Where-Object { $_ -ne 401 }).Count -eq 0 -and $codes[5] -eq 429) "codes: $($codes -join ',')"

# ── SUMMARY ────────────────────────────────────────────────
Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
if ($script:fail -eq 0) {
    Write-Host "   RESULT: ALL $script:pass PROOFS PASSED" -ForegroundColor Green
    Write-Host "   Stage A verified. Evidence = this console output."  -ForegroundColor Green
} else {
    Write-Host "   RESULT: $script:pass passed / $script:fail FAILED" -ForegroundColor Yellow
    Write-Host "   Red lines above say exactly which proof broke."       -ForegroundColor Yellow
}
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "NOTE: TEST 7 burned the 5-per-minute login budget."
Write-Host "Wait ~60s before your next manual login attempt."
Write-Host ""
