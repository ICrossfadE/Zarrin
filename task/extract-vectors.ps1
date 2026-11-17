$ErrorActionPreference='Stop'
$requests=@(
 @{source='Zarrin Landing Page-1.svg';id='Group 237737';name='logo-mark'},
 @{source='Zarrin Landing Page-1.svg';id='search-minus';name='search'},
 @{source='Zarrin Landing Page-1.svg';id='Mask group';name='newsletter-wave-left'},
 @{source='Zarrin Landing Page-1.svg';id='Mask group_2';name='newsletter-wave-right'},
 @{source='Zarrin Landing Page-1.svg';id='Mask group_3';name='hero-wave-top'},
 @{source='Zarrin Landing Page-1.svg';id='Mask group_4';name='hero-wave-bottom'},
 @{source='404.svg';id='404_2';name='not-found-art'},
 @{source='Contact page.svg';id='Frame';name='office-icon'},
 @{source='Contact page.svg';id='Frame_2';name='email-icon'},
 @{source='Contact page.svg';id='Frame_3';name='phone-icon'}
)
foreach($req in $requests){
 [xml]$doc=Get-Content -LiteralPath (Join-Path 'docs/design-exports' $req.source) -Raw
 $node=$doc.SelectNodes('//*[@id]') | Where-Object {$_.GetAttribute('id') -eq $req.id} | Select-Object -First 1
 if(-not $node){throw "Missing $($req.id)"}
 $w=$doc.DocumentElement.GetAttribute('width');$h=$doc.DocumentElement.GetAttribute('height')
 $markup='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="'+$w+'" height="'+$h+'" viewBox="0 0 '+$w+' '+$h+'">'+$node.OuterXml+'</svg>'
 [IO.File]::WriteAllText((Join-Path $PWD "public/images/$($req.name).svg"),$markup)
}
$requests | ConvertTo-Json | Set-Content docs/design-exports/vector-sources.json -Encoding utf8
