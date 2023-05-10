<?php

class Get{

    protected $pdo;
    protected $gm;

    public function __construct(\PDO $pdo)
    {
        $this->pdo = $pdo;
        $this->gm = new GlobalMethods($pdo);
    }

    // create your own get functions!!!

    public function get_common($table, $condition = null){
        $sql = "SELECT * FROM $table";
        if($condition!=null){
            $sql .= " WHERE {$condition}";
        }
      
        $res = $this->gm->executeQuery($sql);
        if($res['code']==200){
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved from $table", $res['code']);
        }

        return $this->gm->returnPayload(null, "failed", "failed to retrieve user account details", $res['code']);
    }

    public function getMostBookedRooms()
    {
        $sql = "SELECT category_id, count(category_id) AS totalRooms
        FROM cms_rooms
        WHERE is_published = '0'
        GROUP BY category_id";

        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retrieved sales ID", $res['code']);
        } else {
            return $this->gm->returnPayload(null, "Failed", "There are no current appointments being set.", $res['code']);
        }
    }

    public function getMostAvailedFoods()
    {
        $sql = "SELECT name, count(name) AS totalMostAvailedFoods
        FROM pos_dish
        -- WHERE status = 'Active'
        GROUP by name";

        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retrieved sales ID", $res['code']);
        } else {
            return $this->gm->returnPayload(null, "Failed", "There are no current appointments being set.", $res['code']);
        }
    }

    public function getTotalSales()
    {
        $sql = "SELECT SUM(total_amount) AS totalSales, created_at, count(total_amount) as totalBillsCount  
        FROM billing_invoice 
        -- WHERE is_delivered = 'Completed'
        GROUP BY created_at
        ORDER BY created_at asc
        ";

        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retrieved sales ID", $res['code']);
        } else {
            return $this->gm->returnPayload(null, "Failed", "There are no current appointments being set.", $res['code']);
        }
    }

    public function getAverageSales()
    {
        $sql = "SELECT AVG(total_amount) as averageSales FROM billing_invoice";

        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retrieved sales ID", $res['code']);
        } else {
            return $this->gm->returnPayload(null, "Failed", "There are no current appointments being set.", $res['code']);
        }
    }

    public function getPeopleTransacting()
    {
        $sql = "SELECT role, count(role) * 100.0 / sum(count(role)) over() AS totalPeople, count(role) AS numberOfPeople
        FROM cdm_guest
        WHERE status = 'Active'
        GROUP by role";

        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retrieved sales ID", $res['code']);
        } else {
            return $this->gm->returnPayload(null, "Failed", "There are no current appointments being set.", $res['code']);
        }
    }
    
    public function getNumberOfEmployees()
    {
        $sql = "SELECT status, count(status) * 100.0 / sum(count(status)) over() AS totalEmployees, count(status) as numberOfStatus
        FROM ems_employees
        GROUP by status";

        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retrieved sales ID", $res['code']);
        } else {
            return $this->gm->returnPayload(null, "Failed", "There are no current appointments being set.", $res['code']);
        }
    }

    public function getNumberOfMemberships()
    {
        $sql = "SELECT DATE(created_at) AS dateName, count(role) AS totalMemberships
        FROM cdm_guest
        GROUP by created_at";

        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retrieved sales ID", $res['code']);
        } else {
            return $this->gm->returnPayload(null, "Failed", "There are no current appointments being set.", $res['code']);
        }
    }
}