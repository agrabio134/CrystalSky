<?php

class GlobalMethods
{
    protected $pdo;


    public function __construct(\PDO $pdo)
    {
        $this->pdo = $pdo;
    }
    public function executeQuery($sql)
    {
        $data = array();
        $errmsg = "";
        $code = 0;

        try {
            if ($result = $this->pdo->query($sql)->fetchAll()) {
                foreach ($result as $record) {
                    array_push($data, $record);
                }
                $code = 200;
                return array("code" => $code, "data" => $data);
            } else {
                $errmsg = 'No data found';
                $code = 404;
            }
        } catch (\PDOException $e) {
            $errmsg = $e->getMessage();
            $code = 403;
        }
        return array("code" => $code, "errmsg" => $errmsg);
    }
    public function returnPayload($payload, $remarks, $message, $code)
    {
        $status = array("remarks" => $remarks, "message" => $message);
        http_response_code($code);
        return array("remarks"=> $remarks, "status" => $status, "payload" => $payload, "timestamp" => date_create());
    }


    
    public function insert($table_name, $data)
    {
        $fields = [];
        $values = [];

        foreach ($data as $key => $value) {
            array_push($fields, $key);
            array_push($values, $value);
        }

        try {
            $counter = 0;
            $sql_str = "INSERT INTO $table_name (";

            foreach ($fields as $value) {
                $sql_str .= $value;
                $counter++;
                if ($counter < count($fields)) {
                    $sql_str .= ", ";
                }
            }

            $sql_str .= ") VALUES (" . str_repeat('?, ', count($values) - 1) . "?)";
            $sql = $this->pdo->prepare($sql_str);
            $sql->execute($values);
            return array("code" => 200, "remarks" => "success");
        } catch (Exception $e) {
            $errmsg = $e->getMessage();
            $code = 403;
        }
        return array("code" => $code, "errmsg" => $errmsg);
    }
    public function update($table_name, $data){
        $id=$data->id;
        $fields = [];
        $values = [];

        foreach($data as $key => $value){
            array_push($fields, $key);
            array_push($values, $value);
        }
        try{            
            $counter = 0;
            $sql_str = "UPDATE $table_name SET ";

            foreach($fields as $value){
                $sql_str .= $value . " = '" . $values[$counter]. "'";
                $counter++;
                if($counter < count($fields)){
                    $sql_str .= ", ";
                }
            }

            $sql_str .= "WHERE id='$id'";
            $sql = $this->pdo->prepare($sql_str);
            $sql->execute();
            return array("code"=>200, "remarks"=>"Data updated successfully!");
        }
        catch(Exception $e){
            $errmsg = $e->getMessage();
            $code = 403;
        }
        return array("code"=>$code, "errmsg"=>$errmsg);

    }


    public function pdffile($table_name, $data, $condition_string)
    {
        // so i got bored and copied the insert code..
        // and changed some stuff..
        // some arrays..
        //try
        $book_id = $_GET['book_id'];
        try {

            if ($_FILES['file']['name'] != '') {
                $test = explode('.', $_FILES['file']['name']);
                $extension = end($test);
                $allowedExts = array("gif", "jpeg", "jpg", "png", "pdf");
                if ((($_FILES["file"]["type"] == "image/gif")
                        || ($_FILES["file"]["type"] == "image/jpeg")
                        || ($_FILES["file"]["type"] == "image/jpg")
                        || ($_FILES["file"]["type"] == "image/pjpeg")
                        || ($_FILES["file"]["type"] == "image/x-png")
                        || ($_FILES["file"]["type"] == "image/png")
                        || ($_FILES["file"]["type"] == "application/pdf"))
                    && ($_FILES["file"]["size"] < 200000000)
                    && in_array($extension, $allowedExts)
                )
                    $name = date("Y-m-d") . rand(100, 999999999999) . '.' . $extension;
                $location = '../uploads/' . $name;
                move_uploaded_file($_FILES['file']['tmp_name'], $location);
            }

            $sql_str = "UPDATE $table_name SET book_location = '$location' WHERE book_id = '$book_id'";
            // prepare sql stmts
            $sql = $this->pdo->prepare($sql_str);
            // var_dump($sql);
            // execute em..
            $sql->execute();
            // if worked ..
            return array("Successfully uploaded!");
        }
        // if not..
        catch (Exception $e) {
            $errmsg = $e->getMessage();
            $code = 403;
        }
        // return whatever..
        return array("code" => $code, "errmsg" => $errmsg);
    }

    public function delete($table_name, $condition_string){

        $sql = "DELETE FROM $table_name ";

        if($condition_string!=null){
            $sql .= " WHERE {$condition_string}";
        }
        try {
            $sql = $this->pdo->prepare($sql);
            $sql->execute();
            return array("status code"=>200, "remarks"=>"deleted successfully!");
        }
        catch(Exception $e){
            $errmsg = $e->getMessage();
            $code = 403;
        }
        return array("code"=>$code, "errmsg"=>$errmsg);
    }

    public function deleteRequests($table_name, $data){

        $sql = "DELETE FROM $table_name ";

        if($data!=null){
            $sql .= " WHERE id='{$data->item_id}'";
        }
        try {
            $sql = $this->pdo->prepare($sql);
            $sql->execute();
            return array("status code"=>200, "remarks"=>"deleted successfully!");
        }
        catch(Exception $e){
            $errmsg = $e->getMessage();
            $code = 403;
        }
        return array("code"=>$code, "errmsg"=>$errmsg);
    }

    public function archiveProduct($table_name, $data, $condition_string){

        $sql = "UPDATE $table_name SET is_archived = '$data->is_archived' WHERE id = '$data->item_id' ";         
        
        try{
            $sql = $this->pdo->prepare($sql);
            $sql->execute();
            return array("code"=>200, "remarks"=>"success");
        }
        catch(Exception $e){
            $errmsg = $e->getMessage();
            $code = 403;
        }
        return array("code"=>$code, "errmsg"=>$errmsg);
    }

    public function cancelOrder($table_name, $data, $condition_string){

        $sql = "UPDATE $table_name SET status = '$data->status' WHERE id = '$data->item_id' ";         
        
        try{
            $sql = $this->pdo->prepare($sql);
            $sql->execute();
            return array("code"=>200, "remarks"=>"success");
        }
        catch(Exception $e){
            $errmsg = $e->getMessage();
            $code = 403;
        }
        return array("code"=>$code, "errmsg"=>$errmsg);
    }

    public function receiveAddQty($table_name, $data, $condition_string){

        $sql = "UPDATE $table_name SET qty = qty + $data->quantity WHERE id = '$data->item_id' ";         
        
        try{
            $sql = $this->pdo->prepare($sql);
            $sql->execute();
            return array("code"=>200, "remarks"=>"success");
        }
        catch(Exception $e){
            $errmsg = $e->getMessage();
            $code = 403;
        }
        return array("code"=>$code, "errmsg"=>$errmsg);
    }

    public function restoreProduct($table_name, $data, $condition_string){

        $sql = "UPDATE $table_name SET is_archived = '$data->is_archived' WHERE id = '$data->item_id' ";         

        try{
            $sql = $this->pdo->prepare($sql);
            $sql->execute();
            return array("code"=>200, "remarks"=>"success");
        }
        catch(Exception $e){
            $errmsg = $e->getMessage();
            $code = 403;
        }
        return array("code"=>$code, "errmsg"=>$errmsg);
    }
}


