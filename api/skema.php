<?php

require 'db.php';
// error_reporting(0);

header('Content-Type', 'application/json; charset=utf-8');
header('Accept', 'application/json');

if (isset($_GET['create'])) {
  $json = file_get_contents('php://input');
  $input = json_decode($json);

  $dataGrid = trim(stripslashes(str_replace('\n', '', json_encode($input->grid))));
  $dataLine = trim(stripslashes(json_encode($input->line)));

  $db->query("UPDATE skema SET grid = '$dataGrid', line = '$dataLine' WHERE id = '1'");

  echo json_encode([
    'success' => true,
    'message' => 'data berhasil disimpan',
  ]);
} else {
  $query = $db->query("SELECT * FROM skema");
  $item = $query->fetch_object();

  $data = (object) [];

  $item->grid = str_replace('="', "='", $item->grid);
  $item->grid = str_replace('" ', "' ", $item->grid);
  $item->grid = str_replace('">', "'>", $item->grid);
  $item->grid = str_replace(":'", ':"', $item->grid);

  $data->grid = json_decode($item->grid);
  $data->line = json_decode($item->line);

  echo json_encode([
    'success' => true,
    'data' => $data,
  ]);
}
