param(
  [Parameter(Mandatory = $false)]
  [string]$PdfPath,

  [Parameter(Mandatory = $false)]
  [string]$OutPath
)

$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Runtime.WindowsRuntime | Out-Null

if (-not $PdfPath -or $PdfPath.Trim() -eq "") {
  $PdfPath = Join-Path $PSScriptRoot "..\\src\\data\\best-mfs.pdf"
}
if (-not $OutPath -or $OutPath.Trim() -eq "") {
  $OutPath = Join-Path $PSScriptRoot "..\\src\\data\\mutualFundsDataset.json"
}

$PdfPath = (Resolve-Path -LiteralPath $PdfPath).Path

function AwaitOp($op, [Type]$resultType) {
  $m = ([System.WindowsRuntimeSystemExtensions]).GetMethods() | Where-Object {
    $_.Name -eq 'AsTask' -and $_.IsGenericMethodDefinition -and $_.GetParameters().Count -eq 1 -and $_.ToString().Contains('IAsyncOperation`1')
  } | Select-Object -First 1
  if (-not $m) { throw "AsTask(IAsyncOperation<T>) not found" }
  $gm = $m.MakeGenericMethod($resultType)
  $task = $gm.Invoke($null, @($op))
  $task.Wait()
  return $task.Result
}

function AwaitAction($action) {
  $m = ([System.WindowsRuntimeSystemExtensions]).GetMethods() | Where-Object {
    $_.Name -eq 'AsTask' -and -not $_.IsGenericMethodDefinition -and $_.GetParameters().Count -eq 1 -and $_.ToString() -eq 'System.Threading.Tasks.Task AsTask(Windows.Foundation.IAsyncAction)'
  } | Select-Object -First 1
  if (-not $m) { throw "AsTask(IAsyncAction) not found" }
  $task = $m.Invoke($null, @($action))
  $task.Wait() | Out-Null
}

function NormalizeAmc([string]$raw) {
  $s = (($(if ($null -eq $raw) { "" } else { $raw }))).Trim()
  if ($s -match '(?i)mutual\\s+funds?$') {
    $s = ($s -replace '(?i)\\s+mutual\\s+funds?$', '').Trim()
  }
  if ($s -eq "") { return $null }
  return $s
}

function ParseCommission([string]$raw) {
  $s = (($(if ($null -eq $raw) { "" } else { $raw }))).Trim()
  $s = $s -replace 'o\\.', '0.' -replace 'O\\.', '0.'
  $s = $s -replace '[^0-9\\.]', ''
  if ($s -notmatch '^[0-9]+(\\.[0-9]+)?$') { return $null }
  try { return [double]$s } catch { return $null }
}

if (-not (Test-Path -LiteralPath $PdfPath)) {
  throw "PDF not found: $PdfPath"
}

$StorageFileT = [type]::GetType('Windows.Storage.StorageFile, Windows.Storage, ContentType=WindowsRuntime')
$PdfDocumentT = [type]::GetType('Windows.Data.Pdf.PdfDocument, Windows.Data.Pdf, ContentType=WindowsRuntime')
$PdfPageRenderOptionsT = [type]::GetType('Windows.Data.Pdf.PdfPageRenderOptions, Windows.Data.Pdf, ContentType=WindowsRuntime')
$InMemoryRandomAccessStreamT = [type]::GetType('Windows.Storage.Streams.InMemoryRandomAccessStream, Windows.Storage.Streams, ContentType=WindowsRuntime')
$BitmapDecoderT = [type]::GetType('Windows.Graphics.Imaging.BitmapDecoder, Windows.Graphics.Imaging, ContentType=WindowsRuntime')
$SoftwareBitmapT = [type]::GetType('Windows.Graphics.Imaging.SoftwareBitmap, Windows.Graphics.Imaging, ContentType=WindowsRuntime')
$OcrEngineT = [type]::GetType('Windows.Media.Ocr.OcrEngine, Windows.Media.Ocr, ContentType=WindowsRuntime')
$OcrResultT = [type]::GetType('Windows.Media.Ocr.OcrResult, Windows.Media.Ocr, ContentType=WindowsRuntime')

$file = AwaitOp ($StorageFileT::GetFileFromPathAsync($PdfPath)) $StorageFileT
$pdf = AwaitOp ($PdfDocumentT::LoadFromFileAsync($file)) $PdfDocumentT
$ocr = $OcrEngineT::TryCreateFromUserProfileLanguages()
if (-not $ocr) { throw "OCR engine not available on this machine." }

$rows = @()

for ($i = 0; $i -lt $pdf.PageCount; $i++) {
  $page = $pdf.GetPage($i)
  $stream = [Activator]::CreateInstance($InMemoryRandomAccessStreamT)

  $opt = [Activator]::CreateInstance($PdfPageRenderOptionsT)
  $opt.DestinationWidth = 2400
  $opt.DestinationHeight = 3100

  AwaitAction ($page.RenderToStreamAsync($stream, $opt))
  $decoder = AwaitOp ($BitmapDecoderT::CreateAsync($stream)) $BitmapDecoderT
  $bitmap = AwaitOp ($decoder.GetSoftwareBitmapAsync()) $SoftwareBitmapT
  $res = AwaitOp ($ocr.RecognizeAsync($bitmap)) $OcrResultT

  $pageLines = New-Object System.Collections.Generic.List[string]
  foreach ($line in $res.Lines) {
    if ($line -and $line.Text) { $pageLines.Add(($line.Text).Trim()) }
  }

  $fundQueue = New-Object System.Collections.Generic.List[object]
  $commissionBlocks = New-Object System.Collections.Generic.List[object]
  $currentAmc = $null
  $inCommission = $false
  $currentCommissions = New-Object System.Collections.Generic.List[double]

  foreach ($rawLine in $pageLines) {
    $line = (($(if ($null -eq $rawLine) { "" } else { $rawLine }))).Trim()
    if ($line -eq "") { continue }

    if ($line -match '(?i)^commis(ion|ion\\s+percentage|ion\\s+pencentage)\\b' -or $line -match '(?i)^commission\\b') {
      if ($inCommission -and $currentCommissions.Count -gt 0) {
        $commissionBlocks.Add($currentCommissions.ToArray())
        $currentCommissions = New-Object System.Collections.Generic.List[double]
      }
      $inCommission = $true
      continue
    }

    if ($inCommission) {
      $c = ParseCommission $line
      if ($null -ne $c) { $currentCommissions.Add($c) | Out-Null }
      continue
    }

    if ($line -match '(?i)mutual\\s+fund\\s+name') { continue }

    if ($line -match '(?i)mutual\\s+funds?$' -or $line -match '(?i)^sbi\\s+mutual\\s+fund$' -or $line -match '(?i)^uti\\s+mutual\\s+fund$') {
      $currentAmc = NormalizeAmc $line
      continue
    }

    if ($currentAmc) {
      $fundQueue.Add([pscustomobject]@{
        amc = $currentAmc
        fundName = $line
        commissionPct = $null
      }) | Out-Null
    }
  }

  if ($inCommission -and $currentCommissions.Count -gt 0) {
    $commissionBlocks.Add($currentCommissions.ToArray())
  }

  $cursor = 0
  foreach ($block in $commissionBlocks) {
    foreach ($pct in $block) {
      if ($cursor -ge $fundQueue.Count) { break }
      $fundQueue[$cursor].commissionPct = [double]$pct
      $cursor++
    }
  }

  foreach ($row in $fundQueue) {
    if ($null -eq $row.commissionPct) { continue }
    $rows += [pscustomobject]@{
      amc = $row.amc
      fundName = $row.fundName
      commissionPct = $row.commissionPct
    }
  }
}

$meta = [pscustomobject]@{
  extractedAt = (Get-Date).ToString("o")
  sourcePdf = (Resolve-Path -LiteralPath $PdfPath).Path
  count = $rows.Count
}

$payload = [pscustomobject]@{
  meta = $meta
  funds = $rows
}

New-Item -ItemType Directory -Force (Split-Path -Parent $OutPath) | Out-Null
$payload | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath $OutPath -Encoding UTF8

Write-Host "Wrote: $OutPath"
