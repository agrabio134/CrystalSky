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

if (isset($_REQUEST['request'])) {
    $req = explode('/', rtrim($_REQUEST['request'], '/'));
} else {
    $req = array("errorcatcher");
}

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        switch ($req[0]) {

            case 'login':
                echo json_encode($auth->login($data));
                break;

            case 'getActiveEmployees':
                echo json_encode($get->getEmployees("ems_employees", "status = 'Active'"));
                break;

            case 'getInactiveEmployees':
                echo json_encode($get->getEmployees("ems_employees", "status = 'Inactive'"));
                break;

            case 'getDepartments':
                echo json_encode($get->get_common("ems_departments"));
                break;

            case 'getEmployeeDetails':
                echo json_encode($get->getEmployeeDetails("ems_employees", $data));
                break;
                
            case 'getDepartmentCount':
                echo json_encode($get->get_common("ems_departments"));
                break;

            case 'getAllInEmployees':
                echo json_encode($get->getAllInEmployees());
                break;


            case 'getEmployeeDetails':
                echo json_encode($get->getEmployeeDetails("ems_employees", $data));
                break;

            case 'addNewCredentials':
                echo json_encode($auth->addNewCredentials("ems_credentials", $data));
                break;

            case 'addDepartment':
                echo json_encode($get->addDepartment("ems_departments", $data));
                break;

            case 'addNewEmployee':
                echo json_encode($get->addNewEmployee("ems_employees", $data));
                break;

            case 'editDepartment':
                echo json_encode($get->editDepartment("ems_departments", $data));
                break;

            case 'editEmployeeDetails':
                echo json_encode($get->editEmployeeDetails("ems_employees", $data));
                break;

            case 'makeActive':
                echo json_encode($get->makeActive("ems_employees", $data));
                break;

            case 'usernameCheck':
                echo json_encode($get->usernameCheck("ems_credentials", $data));
                break;

            case 'usernameCheckEdit':
                echo json_encode($get->usernameCheckEdit("ems_credentials", $data));
                break;

            case 'employeeCheck':
                echo json_encode($get->employeeCheck("ems_employees", $data));
                break;

            case 'resetPassword':
                echo json_encode($auth->resetPassword("ems_credentials", $data));
                break;
                
            case 'getNumberOfEmployees':
                echo json_encode($get->getNumberOfEmployees());
            break;


            default:
                echo "request not found";
                break;
        }
        break;

    case 'GET':
        $data = json_decode(file_get_contents("php://input"));
        switch ($req[0]) {



            default:
                echo "request not found";
                break;
        }
        break;


    default:
        echo "failed request";
        break;
}