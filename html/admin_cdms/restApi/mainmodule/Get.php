<?php

class Get
{

    protected $pdo;
    protected $gm;

    public function __construct(\PDO $pdo)
    {
        $this->pdo = $pdo;
        $this->gm = new GlobalMethods($pdo);
    }
    
    public function getAllReservations($table, $condition = null)
    {
        $sql = "SELECT reservation_appointments.*, cdm_guest.first_name, cdm_guest.last_name, cms_categories.name, cms_rooms.room_number 
        FROM reservation_appointments 
        JOIN cdm_guest ON reservation_appointments.guest_id = cdm_guest.id 
        JOIN cms_categories ON reservation_appointments.room_id = cms_categories.id 
        JOIN cms_rooms ON reservation_appointments.room_id = cms_rooms.id 
        WHERE reservation_appointments.status = 'Complete'";
        // $sql = "SELECT reservation_appointments.*, cms_categories.name from reservation_appointments JOIN cms_categories ON reservation_appointments.room_id = cms_categories.id";
        // $sql = "SELECT * FROM $table";
        if ($condition != null) {
            $sql .= " WHERE {$condition}";
        }

        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retrieved booking history", $res['code']);
        }

        return $this->gm->returnPayload(null, "failed", "failed to retrieve data", $res['code']);
    }


    public function get_common($table, $condition = null)
    {
        $sql = "SELECT * FROM $table";
        if ($condition != null) {
            $sql .= " WHERE {$condition}";
        }

        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retrieved data", $res['code']);
        }

        return $this->gm->returnPayload(null, "failed", "failed to retrieved data", $res['code']);
    }

    public function getEmployees($table, $condition = null)
    {
        $sql = "SELECT $table.*, ems_departments.department_name FROM ems_employees JOIN ems_departments ON ems_employees.dept_id = ems_departments.id";
        if ($condition != null) {
            $sql .= " WHERE {$condition}";
        }

        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retrieved data", $res['code']);
        }

        return $this->gm->returnPayload(null, "failed", "failed to retrieved data", $res['code']);
    }

    public function getUser($table, $condition = null)
    {
        $sql = "SELECT id, first_name, last_name, contact_no, username, role, status FROM $table";
        if ($condition != null) {
            $sql .= " WHERE {$condition}";
        }

        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retrieved data", $res['code']);
        }

        return $this->gm->returnPayload(null, "failed", "failed to retrieved data", $res['code']);
    }

    public function getbanningHistory($table, $condition = null)
    {
        $sql = "SELECT cdm_ban.*, cdm_guest.first_name, cdm_guest.last_name, cdm_guest.contact_no, cdm_guest.username
        FROM cdm_ban
        JOIN cdm_guest ON cdm_ban.guest_id = cdm_guest.id";
        if ($condition != null) {
            $sql .= " WHERE {$condition}";
        }

        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved data", $res['code']);
        }

        return $this->gm->returnPayload(null, "failed", "failed to retrieved data", $res['code']);
    }

    public function banningHistoryDetails($table, $condition = null)
    {
        $sql = "SELECT cdm_ban.*, cdm_guest.first_name, cdm_guest.last_name, cdm_guest.contact_no, cdm_guest.username
        FROM cdm_ban
        JOIN cdm_guest ON cdm_ban.guest_id = cdm_guest.id";
        if ($condition != null) {
            $sql .= " WHERE {$condition}";
        }

        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved data", $res['code']);
        }

        return $this->gm->returnPayload(null, "failed", "failed to retrieved data", $res['code']);
    }


    // ban user
    public function banUserAccount($table, $received_data){
        $id = $received_data->guest_id;
        $reason = $received_data->reason;
        
        // 2-Confirm 1-Tentative 0-Cancel
        $sql = "INSERT INTO $table (guest_id,reason) 
        values ($id,'$reason')";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();  
        
        $sql2 = "UPDATE cdm_guest SET status = 'Banned' WHERE id = $id";
        $stmt2 = $this->pdo->prepare($sql2);
        $stmt2->execute();   

        $code = 200;
                $remarks = "success";
                $message = "Account Banned";
                $payload = null;
        return $this->gm->returnPayload($payload, $remarks, $message, $code);
        
    }

    public function unbanAccount($table, $condition = null,){
        $sql2 = "UPDATE $table SET status = 'Active'";
        if ($condition != null) {
            $sql2 .= " WHERE {$condition}";
        }
        $stmt2 = $this->pdo->prepare($sql2);
        $stmt2->execute();

        $code = 200;
                $remarks = "success";
                $message = "Account Unbanned";
                $payload = null;
        return $this->gm->returnPayload($payload, $remarks, $message, $code);

    }

    public function getFeedback($table, $condition = null)
    {
        $sql = "SELECT cdm_feedback.*, cdm_guest.first_name, cdm_guest.last_name, cdm_guest.contact_no, cdm_guest.username, reservation_appointments.created_at
        FROM cdm_feedback 
        JOIN cdm_guest ON cdm_feedback.reservation_appointments_id = cdm_guest.id 
        JOIN reservation_appointments ON cdm_feedback.reservation_appointments_id = reservation_appointments.id
        WHERE cdm_feedback.status = 'Keep'";

        if ($condition != null) {
            $sql .= " WHERE {$condition}";
        }

        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved data", $res['code']);
        }

        return $this->gm->returnPayload(null, "failed", "failed to retrieved data", $res['code']);
    }

    public function getSavedFeedback($table, $condition = null)
    {
        $sql = "SELECT cdm_feedback.*, cdm_guest.first_name, cdm_guest.last_name, cdm_guest.contact_no, cdm_guest.username, reservation_appointments.created_at
        FROM cdm_feedback 
        JOIN cdm_guest ON cdm_feedback.reservation_appointments_id = cdm_guest.id 
        JOIN reservation_appointments ON cdm_feedback.reservation_appointments_id = reservation_appointments.id
        WHERE cdm_feedback.status = 'Save'";
        if ($condition != null) {
            $sql .= " WHERE {$condition}";
        }

        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved data", $res['code']);
        }

        return $this->gm->returnPayload(null, "failed", "failed to retrieved data", $res['code']);
    }

    public function getPublishFeedback($table, $condition = null)
    {
        $sql = "SELECT cdm_feedback.*, cdm_guest.first_name, cdm_guest.last_name, cdm_guest.contact_no, cdm_guest.username, reservation_appointments.created_at
        FROM cdm_feedback 
        JOIN cdm_guest ON cdm_feedback.reservation_appointments_id = cdm_guest.id 
        JOIN reservation_appointments ON cdm_feedback.reservation_appointments_id = reservation_appointments.id
        WHERE cdm_feedback.status = 'Publish'";
        if ($condition != null) {
            $sql .= " WHERE {$condition}";
        }

        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved data", $res['code']);
        }

        return $this->gm->returnPayload(null, "failed", "failed to retrieved data", $res['code']);
    }

    public function getFeedbackDetails($table, $condition = null)
    {
        $sql = "SELECT cdm_feedback.*, cdm_guest.first_name, cdm_guest.last_name, cdm_guest.contact_no, cdm_guest.username, reservation_appointments.created_at
        FROM cdm_feedback 
        JOIN cdm_guest ON cdm_feedback.reservation_appointments_id = cdm_guest.id 
        JOIN reservation_appointments ON cdm_feedback.reservation_appointments_id = reservation_appointments.id";

        if ($condition != null) {
            $sql .= " WHERE {$condition}";
        }

        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retrieved data", $res['code']);
        }

        return $this->gm->returnPayload(null, "failed", "failed to retrieved data", $res['code']);
    }

    public function banRemark($table, $received_data){
        $id = $received_data->guest_id;
        $reason = $received_data->reason;

        // 2-Confirm 1-Tentative 0-Cancel
        $sql = "INSERT INTO $table (guest_id, reason) 
        values ($id,'$reason')";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();

        $sql2 = "UPDATE cdm_guest SET status = 'Banned' WHERE id = $id";
        $stmt2 = $this->pdo->prepare($sql2);
        $stmt2->execute();

        $code = 200;
                $remarks = "success";
                $message = "Successfully Banned!";
                $payload = null;
        return $this->gm->returnPayload($payload, $remarks, $message, $code);

    }

    public function getBannedUser($table, $condition = null)
    {
        // $sql = "SELECT cdm_ban.*, cdm_guest.first_name, cdm_guest.last_name, cdm_guest.contact_no, cdm_guest.username, cdm_guest.status
        // FROM cdm_ban
        // JOIN cdm_guest ON cdm_ban.guest_id = cdm_guest.id WHERE status = 'BANNED'
        // ";
        $sql = "SELECT id, first_name, last_name, contact_no, username, role, status FROM $table WHERE status = 'Banned'
        ";
        if ($condition != null) {
            $sql .= " WHERE {$condition}";
        }

        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved data", $res['code']);
        }

        return $this->gm->returnPayload(null, "failed", "failed to retrieved data", $res['code']);
    }

    public function getBanRemarks($table, $condition = null)
    {
        $sql = "SELECT cdm_ban.*, first_name, last_name, contact_no, username, role, status FROM $table
        ";
        if ($condition != null) {
            $sql .= " WHERE {$condition}";
        }

        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved data", $res['code']);
        }

        return $this->gm->returnPayload(null, "failed", "failed to retrieved data", $res['code']);
    }

    public function getBanDetails($table, $condition = null)
    {
        $sql = "SELECT cdm_ban.*, cdm_guest.first_name, cdm_guest.last_name, reservation_appointments.created_at FROM cdm_ban
        JOIN cdm_guest ON cdm_ban.guest_id = cdm_guest.id
        JOIN reservation_appointments ON cdm_ban.guest_id = reservation_appointments.id
        ";
        if ($condition != null) {
            $sql .= " WHERE {$condition}";
        }

        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved data", $res['code']);
        }

        return $this->gm->returnPayload(null, "failed", "failed to retrieved data", $res['code']);
    }

    // update feedback status to 'SAVE','KEEP','PUBLISH'
    public function saveFeedback($table, $condition = null){

        $sql = "UPDATE $table SET status = 'Save'";
        if ($condition != null) {
            $sql .= " WHERE {$condition}";
        }
        $stmt2 = $this->pdo->prepare($sql);
        $stmt2->execute();

        $code = 200;
                $remarks = "success";
                $message = "UPDATED";
                $payload = null;
        return $this->gm->returnPayload($payload, $remarks, $message, $code);
    }

    public function keepFeedback($table, $condition = null){

        $sql = "UPDATE $table SET status = 'Keep'";
        if ($condition != null) {
            $sql .= " WHERE {$condition}";
        }
        $stmt2 = $this->pdo->prepare($sql);
        $stmt2->execute();

        $code = 200;
                $remarks = "success";
                $message = "UPDATED";
                $payload = null;
        return $this->gm->returnPayload($payload, $remarks, $message, $code);
    }

    public function publishFeedback($table, $condition = null){

        $sql = "UPDATE $table SET status = 'Publish'";
        if ($condition != null) {
            $sql .= " WHERE {$condition}";
        }
        $stmt2 = $this->pdo->prepare($sql);
        $stmt2->execute();

        $code = 200;
                $remarks = "success";
                $message = "UPDATED";
                $payload = null;
        return $this->gm->returnPayload($payload, $remarks, $message, $code);
    }
}