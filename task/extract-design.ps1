$ErrorActionPreference = 'Stop'
$designDir = Join-Path $PWD 'docs/design-exports'
$imageDir = Join-Path $PWD 'public/images'
New-Item -ItemType Directory -Path $imageDir -Force | Out-Null
$designReports = @()
$assetRegistry = @{}
foreach ($designFile in Get-ChildItem -LiteralPath $designDir -Filter *.svg) {
 [xml]$designDoc = Get-Content -LiteralPath $designFile.FullName -Raw
 $texts = @($designDoc.SelectNodes('//*[local-name()="text"]') | ForEach-Object {
  $attrs = @{}; foreach($attr in $_.Attributes) { $attrs[$attr.Name]=$attr.Value }
  $spans = @($_.SelectNodes('./*[local-name()="tspan"]') | ForEach-Object { @{x=$_.GetAttribute('x'); y=$_.GetAttribute('y'); text=$_.InnerText} })
  @{attributes=$attrs; text=$_.InnerText; spans=$spans}
 })
 $imageEntries = @($designDoc.SelectNodes('//*[local-name()="image"]') | ForEach-Object {
  $uri = $_.GetAttribute('href','http://www.w3.org/1999/xlink')
  if ($uri -match '^data:image/(?<ext>[^;]+);base64,(?<bytes>.+)$') {
   $ext=$Matches.ext.Replace('jpeg','jpg'); $bytes=[Convert]::FromBase64String($Matches.bytes)
   $hash=[Convert]::ToHexString([Security.Cryptography.SHA256]::HashData($bytes)).ToLower().Substring(0,12)
   $assetName="figma-$hash.$ext"
   $assetPath=Join-Path $imageDir $assetName
   if (-not (Test-Path -LiteralPath $assetPath)) { [IO.File]::WriteAllBytes($assetPath,$bytes) }
   $assetRegistry[$assetName]=@{width=$_.GetAttribute('width'); height=$_.GetAttribute('height'); bytes=$bytes.Length}
   @{id=$_.GetAttribute('id'); file=$assetName; width=$_.GetAttribute('width'); height=$_.GetAttribute('height')}
  }
 })
 $shapes = @($designDoc.SelectNodes('//*[local-name()="rect" or local-name()="pattern" or local-name()="use"]') | ForEach-Object {
  $attrs=@{}; foreach($attr in $_.Attributes) { if($attr.Value.Length -lt 500) {$attrs[$attr.Name]=$attr.Value} }
  @{tag=$_.LocalName; attributes=$attrs; parent=$_.ParentNode.GetAttribute('id')}
 })
 $groups = @($designDoc.SelectNodes('//*[local-name()="g"]') | ForEach-Object { @{id=$_.GetAttribute('id'); transform=$_.GetAttribute('transform'); children=$_.ChildNodes.Count} })
 $designReports += @{file=$designFile.Name; width=$designDoc.DocumentElement.GetAttribute('width'); height=$designDoc.DocumentElement.GetAttribute('height'); texts=$texts; images=$imageEntries; shapes=$shapes; groups=$groups}
}
$designReports | ConvertTo-Json -Depth 18 | Set-Content -LiteralPath (Join-Path $designDir 'inspection.json') -Encoding utf8
$assetRegistry | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $designDir 'images.json') -Encoding utf8
Write-Output "Frames: $($designReports.Count); unique images: $($assetRegistry.Count)"
