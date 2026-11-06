Set-StrictMode -Version Latest

function Split-LeeWaySpeechText {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory = $true)]
        [ValidateNotNullOrEmpty()]
        [string]$Text,

        [ValidateRange(1, 1500)]
        [int]$MaximumCharacters = 900
    )

    # The existing Runtime Fabric route accepts at most 1,500 characters per
    # request. Keep a margin for provider-side duration limits and never split
    # a word. The input is already whitespace-normalized by the caller.
    $words = $Text -split ' '
    $segments = [Collections.Generic.List[string]]::new()
    $current = ''

    foreach ($word in $words) {
        if ($word.Length -gt $MaximumCharacters) {
            throw "A speech token exceeds the $MaximumCharacters-character segment limit."
        }

        $candidate = if ($current.Length -eq 0) { $word } else { "$current $word" }
        if ($candidate.Length -le $MaximumCharacters) {
            $current = $candidate
            continue
        }

        if ($current.Length -eq 0) {
            throw 'Unable to create a bounded LeeWay speech segment.'
        }
        $segments.Add($current)
        $current = $word
    }

    if ($current.Length -gt 0) { $segments.Add($current) }
    if ($segments.Count -eq 0) { throw 'Speech text produced no segments.' }
    if (($segments -join ' ') -cne $Text) {
        throw 'Speech segmentation did not preserve the normalized input text.'
    }

    return $segments.ToArray()
}

Export-ModuleMember -Function Split-LeeWaySpeechText

