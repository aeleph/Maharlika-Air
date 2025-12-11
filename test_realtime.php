<?php
header('Content-Type: application/json');

$access_key = 'c35450ec0a048a3e31d41fdd9bf38693';

// Limit to 5 flights for testing
$queryString = http_build_query([
    'access_key' => $access_key,
    'limit' => 5
]);

$ch = curl_init("https://api.aviationstack.com/v1/flights?$queryString");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$json = curl_exec($ch);
curl_close($ch);

// Output raw JSON
echo $json;
