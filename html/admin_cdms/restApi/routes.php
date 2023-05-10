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

            case 'getReservationList':
                echo json_encode($get->getAllReservations("reservation_appointments"));
                break;

            case 'getUser':
                echo json_encode($get->getUser("cdm_guest", "status = 'Active'"));
                break;

            case 'getUserDetails':
                if(count($req)>1){
                    echo json_encode($get->get_common('cdm_guest', "id = '$req[1]'"));
                }
                else{
                    echo json_encode($get->get_common('cdm_guest'));
                }
            break;

            case 'getAccount':
                // JASPER WAG MO BAGUHIN TANGA
                // echo json_encode($get->get_common('cdm_guest', "id = 1"));
                echo json_encode($get->get_common('cdm_guest', "id = '$req[1]'"));
            break;

            case 'getBannedUser':
                // echo json_encode($get->getBannedUser("cdm_ban"));
                echo json_encode($get->getBannedUser("cdm_guest"));
                break;
            
            case 'getBannedTable':
                echo json_encode($get->get_common('cdm_ban'));
                break;

                
            case 'banningHistory':
                // echo json_encode($get->getBannedUser("cdm_ban"));
                echo json_encode($get->getBanningHistory("cdm_ban", $data));
            break;

            case 'banCustomer':
                echo json_encode($get->banRemark('cdm_ban',$data));
                // echo json_encode($global->updateCancellation('reservation_appointments',$data));
            break;

            case 'updateRole':
                echo json_encode($global->update('cdm_guest', $data, NULL));
            break;

            case 'getFeedback':
                echo json_encode($get->getFeedback("cdm_feedback", $data, NULL));
                break;
            
            case 'getSavedFeedback':
                echo json_encode($get->getSavedFeedback("cdm_feedback", $data, NULL));
                break;
            case 'getPublishFeedback':
                echo json_encode($get->getPublishFeedback("cdm_feedback", $data, NULL));
                break;

            case 'getFeedbackDetails':
                echo json_encode($get->getFeedbackDetails("cdm_feedback", "reservation_appointments_id = '$req[1]'"));
                break;

            // get the ban details of banned account
            case 'getBanDetails':
                echo json_encode($get->getBanDetails("cdm_ban", "cdm_ban.guest_id = '$req[1]'"));
                break;

            case 'banUser':
                echo json_encode($get->banUserAccount('cdm_ban',$data));
                break;

            case 'banningHistoryDetails':
                echo json_encode($get->banningHistoryDetails('cdm_ban',"cdm_ban.id = '$req[1]'"));
                break;

            //  case 'getBanDetails':
            //     echo json_encode($get->getSavedFeedback("cdm_feedback", $data, NULL));
            //     break;

            case 'unbanAccount':
                echo json_encode($get->unbanAccount('cdm_guest', "id = '$req[1]'"));
                // echo json_encode($get->unbanAccount('cdm_ban',$data));
            break;

            // case 'unbanUserAccount':
            //     echo json_encode($get->unbanUserAccount('cdm_guest', "id = '$req[1]'"));
            // break;
           
            case 'saveFeedback':
                echo json_encode($get->saveFeedback('cdm_feedback', "reservation_appointments_id = '$req[1]'"));
            break;

            case 'keepFeedback':
                echo json_encode($get->keepFeedback('cdm_feedback', "reservation_appointments_id = '$req[1]'"));
            break;
            
            case 'publishFeedback':
                echo json_encode($get->publishFeedback('cdm_feedback', "reservation_appointments_id = '$req[1]'"));
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

    case 'PUT':
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