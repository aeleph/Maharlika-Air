<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

// Your API key
$access_key = 'c35450ec0a048a3e31d41fdd9bf38693';

// Example query: MNL → CEB on a specific date
$from = 'MNL';
$to   = 'CEB';
$date = '2025-12-20';

// Build query string
$queryString = http_build_query([
    'access_key' => $access_key,
    'dep_iata'   => $from,
    'arr_iata'   => $to,
    'flight_date'=> $date
]);

// Initialize cURL
$ch = curl_init(sprintf('%s?%s', 'https://api.aviationstack.com/v1/flights', $queryString));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$json = curl_exec($ch);
curl_close($ch);

// Save raw response to a file for debugging
file_put_contents('debug_test.json', $json);

// Decode JSON
$api_result = json_decode($json, true);

// Output JSON response
echo json_encode($api_result, JSON_PRETTY_PRINT);
