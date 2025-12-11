<?php
header('Content-Type: application/json');

// Get parameters
$from = isset($_GET['from']) ? strtoupper($_GET['from']) : '';
$to   = isset($_GET['to']) ? strtoupper($_GET['to']) : '';
$limit = 10;

if (!$from || !$to) {
    echo json_encode(['error' => 'Please provide From and To airport codes']);
    exit;
}

$access_key = 'c35450ec0a048a3e31d41fdd9bf38693';

$queryString = http_build_query([
    'access_key' => $access_key,
    'dep_iata'   => $from,
    'arr_iata'   => $to,
    'limit'      => $limit
]);

$ch = curl_init("https://api.aviationstack.com/v1/flights?$queryString");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$json = curl_exec($ch);
curl_close($ch);

$api_result = json_decode($json, true);

if (!$api_result) {
    echo json_encode(['error' => 'Invalid response from API']);
    exit;
}
if (isset($api_result['error'])) {
    echo json_encode(['error' => $api_result['error']['message']]);
    exit;
}

$flights = [];
if (isset($api_result['data'])) {
    foreach ($api_result['data'] as $flight) {
        $flights[] = [
            'airline' => $flight['airline']['name'] ?? 'N/A',
            'flightNumber' => $flight['flight']['iata'] ?? 'N/A',
            'from' => $flight['departure']['iata'] ?? 'N/A',
            'to' => $flight['arrival']['iata'] ?? 'N/A',
            'departure' => $flight['departure']['estimated'] ?? $flight['departure']['actual'] ?? null,
            'arrival' => $flight['arrival']['estimated'] ?? $flight['arrival']['actual'] ?? null
        ];
    }
}

echo json_encode($flights);
