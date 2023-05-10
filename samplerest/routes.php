<?php
require_once "./config/Connection.php";
require_once "./mainmodule/Get.php";
require_once "./mainmodule/Auth.php";
require_once "./mainmodule/Global.php";

$db = new Connection();
$pdo = $db->connect();
$global = new GlobalMethods($pdo);
$get = new Get($pdo);
$auth = new Auth($pdo);

if(isset($_REQUEST['request'])){
    $req = explode('/', rtrim($_REQUEST['request'], '/'));
}
else{
    $req = array("errorcatcher");
}

switch($_SERVER['REQUEST_METHOD']){
    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        switch($req[0]){

            case 'login':
                echo json_encode($auth->login($data));
            break;

            case 'register':
                echo json_encode($auth->register($data));
            break;

            case 'update':
                echo json_encode($global->update($data));
            break;
                
            // example case breaks!

            case 'sample':
                echo json_encode($auth->sample($data));
            break;

            case 'sample':
                echo json_encode($get->sample($data));
            break;

            case 'sample':
                echo json_encode($global->sample($data));
            break;

            default:
                echo "request not found";
            break;
        }
    break;
    case 'GET':
        switch($req[0]){

            case 'mostBookedRooms':
                echo json_encode($get->mostBookedRooms());
            break;

            case 'getTotalSales':
                echo json_encode($get->getTotalSales());
            break;

            case 'getAverageSales':
                echo json_encode($get->getAverageSales());
            break;

            case 'getMostAvailedFoods':
                echo json_encode($get->getMostAvailedFoods());
            break;

            case 'getMostBookedRooms':
                echo json_encode($get->getMostBookedRooms());
            break;

            case 'getPeopleTransacting':
                echo json_encode($get->getPeopleTransacting());
            break;

            case 'getNumberOfEmployees':
                echo json_encode($get->getNumberOfEmployees());
            break;

            case 'getNumberOfMemberships':
                echo json_encode($get->getNumberOfMemberships());
            break;

            default:
            echo "request not found";
            break;
        }
    break;
    default:
        echo "failed request";
    break;

    
}