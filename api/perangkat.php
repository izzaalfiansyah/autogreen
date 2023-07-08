<?php

require 'db.php';

$sample = [
  [
    'gsId' => '1688656447275',
    'status' => 1,
    'flow' => '3m/s',
    'temperatur' => '30',
  ],
  [
    'gsId' => '1688369699702',
    'status' => 1,
    'flow' => '3m/s',
    'temperatur' => '30',
  ],
  [
    'gsId' => '1688375280896',
    'status' => 0,
    'flow' => '0m/s',
    'temperatur' => '0',
  ],
  [
    'gsId' => '1688526459262',
    'status' => 1,
    'flow' => '3m/s',
    'temperatur' => '30',
  ],
  [
    'gsId' => '1688526568795',
    'status' => 0,
    'flow' => '0m/s',
    'temperatur' => '0',
  ],
  [
    'gsId' => '1688532130825',
    'status' => 1,
    'flow' => '3m/s',
    'temperatur' => '30',
  ],
];

if (isset($_GET['create'])) {
} else {
  echo json_encode([
    'success' => true,
    'data' => $sample,
  ]);
}
