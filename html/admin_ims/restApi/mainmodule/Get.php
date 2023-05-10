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

    public function get_common($table, $condition = null)
    {
        $sql = "SELECT * FROM $table";
        if ($condition != null) {
            $sql .= " WHERE {$condition}";
        }

        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retrieved all departments records", $res['code']);
        }

        return $this->gm->returnPayload(null, "failed", "failed to retrieved data", $res['code']);
    }

    public function getCommodities($table, $condition = null)
    {
        $sql = "SELECT $table.* FROM inventory_products
        ";
        if ($condition != null) {
            $sql .= " WHERE {$condition}";
        }

        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved student records", $res['code']);
        }

        return $this->gm->returnPayload(null, "failed", "failed to retrieved data", $res['code']);
    }

    // public function getIngredients($table, $condition = null)
    // {
    //     $sql = "SELECT $table.* FROM inventory_products
    //     ";
    //     if ($condition != null) {
    //         $sql .= " WHERE {$condition}";
    //     }

    //     $res = $this->gm->executeQuery($sql);
    //     if ($res['code'] == 200) {
    //         return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved student records", $res['code']);
    //     }

    //     return $this->gm->returnPayload(null, "failed", "failed to retrieved data", $res['code']);
    // }


    public function getIngredients($table, $condition = null){
        $sql = "SELECT * FROM $table";

        if($condition!=null){
            $sql .= " WHERE {$condition}";
        }

        // var_dump($sql);

        // $sql .= "INNER JOIN items_tbl ON transactions_tbl.id = items_tbl.id";

        $res = $this->gm->executeQuery($sql);

        if($res['code'] == 200){
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retrieved from $table", $res['code']);
        }

        return $this->gm->returnPayload(null, "failed", "failed to retrieve data", $res['code']);
    }

    

    public function getPending($table, $condition = null)
    {
        $sql = "SELECT $table.*, inventory_suppliers.name AS supp_name, inventory_products.name AS prod_name, inventory_products.picture, inventory_products.unit, inventory_products.category,inventory_products.price AS product_price FROM inventory_orders
                JOIN inventory_suppliers ON inventory_orders.supp_id = inventory_suppliers.id
                JOIN inventory_products ON inventory_orders.prod_id = inventory_products.id
        ";
        if ($condition != null) {
            $sql .= " WHERE {$condition}";
        }

        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retrieved records", $res['code']);
        }

        return $this->gm->returnPayload(null, "failed", "failed to retrieved data", $res['code']);
    }
    
    public function getForReview($table, $condition = null)
    {
        $sql = "SELECT $table.*, inventory_suppliers.name AS supp_name, inventory_products.name AS prod_name FROM inventory_orders
                JOIN inventory_suppliers ON inventory_orders.supp_id = inventory_suppliers.id
                JOIN inventory_products ON inventory_orders.prod_id = inventory_products.id
        ";
        if ($condition != null) {
            $sql .= " WHERE {$condition}";
        }

        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retrieved records", $res['code']);
        }

        return $this->gm->returnPayload(null, "failed", "failed to retrieved data", $res['code']);
    }

    public function getInProgress($table, $condition = null)
    {
        $sql = "SELECT $table.*, inventory_suppliers.name AS supp_name, inventory_products.name AS prod_name FROM inventory_orders
                JOIN inventory_suppliers ON inventory_orders.supp_id = inventory_suppliers.id
                JOIN inventory_products ON inventory_orders.prod_id = inventory_products.id
        ";
        if ($condition != null) {
            $sql .= " WHERE {$condition}";
        }

        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retrieved records", $res['code']);
        }

        return $this->gm->returnPayload(null, "failed", "failed to retrieved data", $res['code']);
    }

    public function getCompleted($table, $condition = null)
    {
        $sql = "SELECT $table.*, inventory_suppliers.name AS supp_name, inventory_products.name AS prod_name FROM inventory_orders
                JOIN inventory_suppliers ON inventory_orders.supp_id = inventory_suppliers.id
                JOIN inventory_products ON inventory_orders.prod_id = inventory_products.id
        ";
        if ($condition != null) {
            $sql .= " WHERE {$condition}";
        }

        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retrieved records", $res['code']);
        }

        return $this->gm->returnPayload(null, "failed", "failed to retrieved data", $res['code']);
    }

    public function getRequests($table)
    {
        $sql = "SELECT $table.*, inventory_suppliers.name AS supp_name, inventory_products.name AS prod_name FROM inventory_requests
                JOIN inventory_suppliers ON inventory_requests.supplier_id = inventory_suppliers.id
                JOIN inventory_products ON inventory_requests.product_id = inventory_products.id
        ";


        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retrieved records", $res['code']);
        }

        return $this->gm->returnPayload(null, "failed", "failed to retrieved data", $res['code']);
    }

    public function getSuppliers($table, $condition = null)
    {
        $sql = "SELECT * FROM $table";
        if ($condition != null) {
            $sql .= " WHERE {$condition}";
        }

        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retrieved all departments records", $res['code']);
        }

        return $this->gm->returnPayload(null, "failed", "failed to retrieved data", $res['code']);
    }

    public function deleteProduct($table, $received_data){
        $id = $received_data->id;

        $sql = "DELETE FROM $table WHERE id = '$id'";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();

        if ($stmt->rowCount() == 0) {
            $code = 200;
            $remarks = "Ok";
            $message = "Successfully deleted.";
            $payload = null;
            return $this->gm->returnPayload($payload, $remarks, $message, $code);
        } else {
            $code = 401;
            $remarks = "Failed";
            $message = "not deleted";
            $payload = null;
            return $this->gm->returnPayload($payload, $remarks, $message, $code);
        }
    }

    

    public function getEmployees($table, $condition = null)
    {
        $sql = "SELECT $table.*, ems_departments.department_name FROM ems_employees
                JOIN ems_departments ON ems_employees.dept_id = ems_departments.id 
        ";
        if ($condition != null) {
            $sql .= " WHERE {$condition}";
        }

        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved student records", $res['code']);
        }

        return $this->gm->returnPayload(null, "failed", "failed to retrieved data", $res['code']);
    }
    public function makeActive($table, $received_data)
    {
        $id = $received_data->id;
        $data = array(
            "status" => "Active"
        );

        $result = $this->gm->update($table, $data, " WHERE id = '$id'");
        if ($result['code'] == 200) {
            return $this->gm->returnPayload(null, 'success', 'successfully inserted data', $result['code']);
        } else {
            $code = 401;
            $remarks = "failed";
            $message = "Failed adding in user_profiles table";
            $payload = $received_data;
            return $this->gm->returnPayload($payload, $remarks, $message, $code);
        }
    }

    public function addDepartment($table, $received_data){
        $department_name = $received_data->department_name;

        $sql = "SELECT department_name FROM ems_departments WHERE department_name = '$department_name'";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();

        if ($stmt->rowCount() == 0) {
            $res = $this->gm->insert("ems_departments", $received_data);
            return $this->gm->returnPayload(null, 'success', 'successfully inserted data', $res['code']);
        } else {
            $code = 401;
            $remarks = "Failed";
            $message = "Meron ng department na nagawa.";
            $payload = null;
            return $this->gm->returnPayload($payload, $remarks, $message, $code);
        }
    }
}