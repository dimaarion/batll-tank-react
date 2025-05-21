<?php
header("Access-Control-Allow-Origin:*");
header("Content-type: application/json");
header("Content-Type: audio/mp3");
$path = '../asset/sound/IMG-Approaching.mp3';
readfile($path);