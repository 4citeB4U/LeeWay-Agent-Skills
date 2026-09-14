#requires -Version 7.0
<#+
.SYNOPSIS
  Governed LeeWay -> Gemini Interactions API bridge.

.DESCRIPTION
  Sends a LeeWay task/prompt to Gemini through the current Interactions API,
  optionally attaches one remote MCP server, and writes an inspectable receipt.

  Secrets are read only from environment variables. Nothing in this script
  stores an API key in source control.

.NOTES
  Requires an authorized Gemini API project/key. Google AI consumer-plan access
  and Gemini API billing/quota are separate concerns.
#>

[CmdletBinding()]
param(
    [Parameter(ParameterSetName='Text', Mandatory=$true)]
    [string]$Prompt,

    [Parameter(ParameterSetName='File', Mandatory=$true)]
    [ValidateScript({ Test-Path -LiteralPath $_ -PathType Leaf })]
    [string]$PromptFile,

    [Parameter(ParameterSetName='Envelope', Mandatory=$true)]
    [ValidateScript({ Test-Path -LiteralPath $_ -PathType Leaf })]
    [string]$TaskEnvelopeFile,

    [string]$Model = $(if ($env:LEEWAY_GEMINI_MODEL) { $env:LEEWAY_GEMINI_MODEL } else { 'gemini-3.8-flash' }),

    [ValidateSet('v1','v1beta')]
    [string]$ApiVersion = 'v1',

    [string]$McpUrl,

    [string]$McpName = 'leeway_bridge',

    [string]$OutFile
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Get-Sha256Hex {
    param([Parameter(Mandatory)][string]$Text)
    $bytes = [Text.Encoding]::UTF8.GetBytes($Text)
    $hash = [Security.Cryptography.SHA256]::HashData($bytes)
    return ([Convert]::ToHexString($hash)).ToLowerInvariant()
}

if (-not $env:GEMINI_API_KEY) {
    throw 'GEMINI_API_KEY is not set. Create/authorize a Gemini API key in Google AI Studio and expose it only through the environment or a secret store.'
}

switch ($PSCmdlet.ParameterSetName) {
    'Text'     { $inputText = $Prompt }
    'File'     { $inputText = Get-Content -LiteralPath $PromptFile -Raw -Encoding UTF8 }
    'Envelope' {
        $rawEnvelope = Get-Content -LiteralPath $TaskEnvelopeFile -Raw -Encoding UTF8
        $null = $rawEnvelope | ConvertFrom-Json -Depth 100
        $inputText = @"
You are an authorized Google-side worker inside the LeeWay ecosystem.
Process the following LeeWay Intermodel Envelope. Return conclusions, evidence, sources, uncertainty, blocked items, recommended next action, and runtime evidence. Do not reveal private chain-of-thought. Do not fabricate Formula execution, hashes, citations, benchmarks, or receipts.

$rawEnvelope
"@
    }
}

$body = [ordered]@{
    model = $Model
    input = $inputText
}

if ($McpUrl) {
    if ($McpName -match '-') {
        throw 'Gemini remote MCP server names must not contain hyphens. Use snake_case.'
    }
    $body.tools = @(
        [ordered]@{
            type = 'mcp_server'
            name = $McpName
            url  = $McpUrl
        }
    )
}

$requestJson = $body | ConvertTo-Json -Depth 30
$requestHash = Get-Sha256Hex -Text $requestJson
$endpoint = "https://generativelanguage.googleapis.com/$ApiVersion/interactions"

$headers = @{
    'x-goog-api-key' = $env:GEMINI_API_KEY
    'Content-Type'   = 'application/json'
}

$started = [DateTimeOffset]::UtcNow
$response = Invoke-RestMethod -Method Post -Uri $endpoint -Headers $headers -Body $requestJson
$finished = [DateTimeOffset]::UtcNow
$responseJson = $response | ConvertTo-Json -Depth 100
$responseHash = Get-Sha256Hex -Text $responseJson

$receipt = [ordered]@{
    receipt_type = 'LEEWAY_GEMINI_BRIDGE_RECEIPT'
    protocol_version = 'LEEWAY-INTERMODEL-v1'
    execution_mode = 'DIRECT_API'
    endpoint = $endpoint
    model = $Model
    mcp_url = $(if ($McpUrl) { $McpUrl } else { $null })
    started_utc = $started.ToString('o')
    finished_utc = $finished.ToString('o')
    request_sha256 = $requestHash
    response_sha256 = $responseHash
    formula_execution_state = 'NOT_EXECUTED'
    response = $response
}

if ($OutFile) {
    $parent = Split-Path -Parent $OutFile
    if ($parent -and -not (Test-Path -LiteralPath $parent)) {
        New-Item -ItemType Directory -Path $parent -Force | Out-Null
    }
    $receipt | ConvertTo-Json -Depth 100 | Set-Content -LiteralPath $OutFile -Encoding UTF8
}

$receipt
