<?php

$connect = mysqli_connect('127.0.0.1:3306', 'root', '', 'DataBase');

if(!$connect) {
    echo 'Error DB connect';
}

$data = [
    "event_id" => $_POST['eventIdVal'],
    "event_date" => $_POST['eventTimeVal'],
    "ticket_adult_price" => $_POST['adultTickePriceVal'],
    "ticket_adult_quantity" => $_POST['adultTicketCountVal'],
    "ticket_kid_price" => $_POST['kinderTickePriceVal'],
    "ticket_kid_quantity" => $_POST['kinderTicketCountVal'],
    "barcode" => $_POST['barkodeVal'],
    "user_id" => $_POST['userIdVal'],
    "equal_price" => $_POST['allTicketsPriceVal'],
    "created" => $_POST['dateVal']
];


mysqli_query($connect, "INSERT INTO `tickets` (`id`, `event_id`, `event_date`, `ticket_adult_price`, `ticket_adult_quantity`, `ticket_kid_price`, `ticket_kid_quantity`, `barcode`, `user_id`, `equal_price`, `created`) VALUES (NULL, '$data[event_id]', '$data[event_date]', '$data[ticket_adult_price]', '$data[ticket_adult_quantity]', '$data[ticket_kid_price]', '$data[ticket_kid_quantity]', '$data[barcode]', '$data[user_id]', '$data[equal_price]', '$data[created]')");