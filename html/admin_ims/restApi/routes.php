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
            
            case 'getPending':
                echo json_encode($get->getPending("inventory_orders", "status='Pending'"));
                break;
            
            case 'getForReview':
                echo json_encode($get->getPending("inventory_orders", "status='For Review'"));
                break;

            case 'getInProgress':
                echo json_encode($get->getPending("inventory_orders", "status='In Progress'"));
                break;

            case 'getCompleted':
                echo json_encode($get->getPending("inventory_orders", "status='Completed' OR status ='Cancelled'  "));
                break;

            case 'getRequests':
                echo json_encode($get->getRequests("inventory_requests"));
                break;

            case 'getSuppliers':
                echo json_encode($get->getSuppliers("inventory_suppliers"));
                break;

            case 'archiveProduct':
                echo json_encode($global->archiveProduct("inventory_products", $data, NULL));
                break;
            
            case 'cancelOrder':
                echo json_encode($global->cancelOrder("inventory_orders", $data, NULL));
                break;
            
            case 'receiveOrder':
                echo json_encode($global->cancelOrder("inventory_orders", $data, NULL));
                break;

            case 'receiveAddQty':
                echo json_encode($global->receiveAddQty("inventory_products", $data, NULL));
                break;
            case 'approveOrder':
                echo json_encode($global->cancelOrder("inventory_orders", $data, NULL));
                break;

            case 'reviewOrder':
                echo json_encode($global->cancelOrder("inventory_orders", $data, NULL));
                break;

            case 'deleteRequest':
                echo json_encode($global->deleteRequests("inventory_requests", $data));
                break;

            case 'deleteSupplier':
                echo json_encode($global->deleteRequests("inventory_suppliers", $data));
                break;
            
                
    
            case 'restoreProduct':
                echo json_encode($global->restoreProduct("inventory_products", $data, NULL));
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

            case 'addDepartment':
                echo json_encode($get->addDepartment("ems_departments", $data));
                break;

            case 'makeActive':
                echo json_encode($get->makeActive("ems_employees", $data));
                break;

        

            case 'getCommodities':
                echo json_encode($get->getCommodities("inventory_products", "category='Commodity'"));
                break;

            
            case 'addProduct':
                echo json_encode($global->insert("inventory_products", $data));
                break;

            case 'updateProduct':
                echo json_encode($global->update("inventory_products", $data));
                break;

            case 'addRequest':
                echo json_encode($global->insert("inventory_requests", $data));
                break;
            
            case 'addOrder':
                echo json_encode($global->insert("inventory_orders", $data));
                break;

            case 'addSupplier':
                echo json_encode($global->insert("inventory_suppliers", $data));
                break;







            default:
                echo "request not found";
                break;
        }
        break;

    case 'GET':
        $data = json_decode(file_get_contents("php://input"));
        switch ($req[0]) {
            case 'getIngredients':
                echo json_encode($get->get_common('inventory_products', "category='Ingredient'"));
                break;

            case 'getAllActiveIngredients':
                echo json_encode($get->get_common("inventory_products", "is_archived = 0 AND category='Ingredient'"));
                break;

            case 'getAllActiveCommodities':
                echo json_encode($get->get_common("inventory_products", "is_archived = 0 AND category='Commodity'"));
                break;
    
            case 'getAllInactive';
                echo json_encode($get->get_common("inventory_products", "is_archived = 1"));
                break;

            case 'getitem':
                echo json_encode($get->get_common("inventory_products", "id = '$req[1]'"));
                break;

            case 'getSupplierDrop':
                echo json_encode($get->get_common("inventory_suppliers"));
                break;

            case 'getProductDrop':
                echo json_encode($get->get_common("inventory_products"));
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