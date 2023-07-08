<?php

$sample = [
  [
    'id' => '1688656447275',
    'nama' => 'Tandon Pusat',
    'status' => 1,
    'flow' => '3m/s',
    'temperatur' => '30',
  ],
  [
    'id' => '1688369699702',
    'nama' => 'Pompa 1',
    'status' => 1,
    'flow' => '3m/s',
    'temperatur' => '30',
  ],
  [
    'id' => '1688375280896',
    'nama' => 'Pompa 2',
    'status' => 1,
    'flow' => '0m/s',
    'temperatur' => '0',
  ],
  [
    'id' => '1688526459262',
    'nama' => 'Katup 1',
    'status' => 1,
    'flow' => '3m/s',
    'temperatur' => '30',
  ],
  [
    'id' => '1688526568795',
    'nama' => 'Katup 2',
    'status' => 0,
    'flow' => '0m/s',
    'temperatur' => '0',
  ],
  [
    'id' => '1688532130825',
    'nama' => 'Sensor',
    'status' => 1,
    'flow' => '3m/s',
    'temperatur' => '30',
  ]
];

echo json_encode([
  'success' => true,
  'data' => $sample,
]);
