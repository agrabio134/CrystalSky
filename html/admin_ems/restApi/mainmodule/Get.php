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

    
    public function editEmployeeDetails($table, $received_data)
    {
        $id = $received_data->id;
        $username = $received_data->username;
        $data = array(
            "username" => $username
        );

        // var_dump($received_data);
        unset($received_data->id);
        unset($received_data->username);

        $query = $this->gm->update($table, $received_data, " WHERE id = '$id'");
        $result = $this->gm->update("ems_credentials", $data, " WHERE employee_id = '$id'");


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
    public function addNewEmployee($table, $received_data)
    {
        
    // $received_data->password = $this->encrypt_password($received_data->password);
        $res = $this->gm->insert("ems_employees", $received_data);

        $sql = "SELECT MAX(id) as id FROM ems_employees";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();
        $res = $stmt->fetchAll()[0];
        $user_id = $res['id'];
        $payload = array(
            "id" => $user_id
        );
        $code = 200;
        return $this->gm->returnPayload($payload, "success", "Image Successfully uploaded!", $code);
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

    public function getEmployeeDetails($table, $received_data)
    {
        $id = $received_data->id;

        $sql = "SELECT $table.*, ems_departments.department_name, ems_credentials.username, ems_credentials.password
                FROM ems_employees
                JOIN ems_departments ON ems_employees.dept_id = ems_departments.id 
                JOIN ems_credentials ON ems_credentials.employee_id = ems_employees.id
                WHERE ems_employees.id = $id 
        ";

        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved student records", $res['code']);
        }

        return $this->gm->returnPayload(null, "failed", "failed to retrieved data", $res['code']);
    }
    public function makeActive($table, $received_data)
    {
        $id = $received_data->id;
        $status = $received_data->status;
        $data = array(
            "status" => $status
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


    public function usernameCheck($table, $received_data)
    {
        $username = $received_data->username;

        $sql = "SELECT * FROM $table WHERE username = '$username'";
        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved student records", $res['code']);
        }

        return $this->gm->returnPayload(null, "failed", "failed to retrieved data", 401);
    }
    
    public function usernameCheckEdit($table, $received_data)
    {
        $username = $received_data->username;
        $id = $received_data->employee_id;

        $sql = "SELECT * FROM $table WHERE username = '$username' and employee_id != $id";
        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved student records", $res['code']);
        }

        return $this->gm->returnPayload(null, "failed", "failed to retrieved data", 401);
    }
    
    public function employeeCheck($table, $received_data)
    {
        $firstname = $received_data->firstname;
        $lastname = $received_data->lastname;
        $gender = $received_data->gender;
        $birthday = $received_data->birthday;

        $sql = "SELECT * FROM $table 
        WHERE firstname = '$firstname' and lastname = '$lastname' and gender = '$gender' and birthday = '$birthday'";
        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retieved student records", $res['code']);
        }

        return $this->gm->returnPayload(null, "failed", "failed to retrieved data", 401);
    }
    public function editDepartment($table, $received_data)
    {
        $id = $received_data->id;
        $department_name = $received_data->department_name;

        $sql = "SELECT department_name FROM ems_departments WHERE department_name = '$department_name'";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();

        if ($stmt->rowCount() == 0) {
            
        $sql = "UPDATE ems_departments SET department_name = '$department_name' WHERE id = '$id'";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();

        $code = 200;
        $remarks = "Success";
        $message = "Successfully Edited Department!";
        $payload = null;

        return $this->gm->returnPayload($payload, $remarks, $message, $code);
    } else {
            $code = 401;
            $remarks = "Failed";
            $message = "There's an already existing department name!";
            $payload = null;
            return $this->gm->returnPayload($payload, $remarks, $message, $code);
        }

    }
    
    
    public function addDepartment($table, $received_data)
    {
        $department_name = $received_data->department_name;

        $sql = "SELECT department_name FROM ems_departments WHERE department_name = '$department_name'";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();

        if ($stmt->rowCount() == 0) {
            $res = $this->gm->insert("ems_departments", $received_data);
            return $this->gm->returnPayload(null, 'success', 'successfully created new department!', $res['code']);
        } else {
            $code = 401;
            $remarks = "Failed";
            $message = "here's an already existing department name!";
            $payload = null;
            return $this->gm->returnPayload($payload, $remarks, $message, $code);
        }
    }

    
    public function getAllInEmployees()
    {

        $sql = "SELECT count(id) as id, 
        (SELECT count(id) from ems_employees where STATUS='Inactive') as inactive, 
        (SELECT count(id) from ems_employees where STATUS='Active') as active 
        FROM ems_employees";

        $res = $this->gm->executeQuery($sql);
        if ($res['code'] == 200) {
            return $this->gm->returnPayload($res['data'], "success", "Succesfully retrieved all departments records", $res['code']);
        }

        return $this->gm->returnPayload(null, "failed", "failed to retrieved data", $res['code']);
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
}