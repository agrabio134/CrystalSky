<?php
    class Auth{
        protected $pdo;
        protected $gm;

        public function __construct(\PDO $pdo)
        {
            $this->pdo = $pdo;
            $this->gm = new GlobalMethods($pdo);
        }

        // password authenticator
        private function check_password($password, $existing_hash){
            $hash = crypt($password, $existing_hash);
            if($hash === $existing_hash){
                return true;
            }
            return false;
        }
        
        // password encryption function
        private function encrypt_password($password_string){
            $hash_format = "$2y$10$";
            $salt_length = 22;
            $salt = $this->generate_salt($salt_length);
            return crypt($password_string, $hash_format . $salt);
        }

        private function generate_salt($length){
            $urs = md5(uniqid(mt_rand(), true));
            $b64_string = base64_encode($urs);
            $mb64_string = str_replace('+', '.', $b64_string);
            return substr($mb64_string, 0, $length);
        }

        // token generation function
        private function generate_token($id){
            $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
            $payload = json_encode(['id' => $id]);
            $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
            $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
            $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, 'abC123!', true);
            $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
            $jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
            return $jwt;
        }

        // register authentication function
        public function register($received_data){
            $received_data->password = $this->encrypt_password($received_data->password);
            $res = $this->gm->insert("ems_credentials", $received_data); 
            if($res['code']==200){
                return $this->gm->returnPayload(null, 'success', 'successfully inserted data', $res['code']);
            }
            return $this->gm->returnPayload(null, 'failed', 'failed to insert data', $res['code']);
        }

        // login authentication function
        
        public function login($received_data){
            // var_dump($received_data);
            $username = $received_data->username; 
            $pword = $received_data->password;
            $sql = "SELECT * FROM ems_credentials WHERE username = ? ";
            $stmt = $this->pdo->prepare($sql);
            try{
                $stmt->execute([$username]);
                if($stmt->rowCount()>0){
                    $res = $stmt->fetchAll()[0];
                    // var_dump($res);
                    // exit;
                    if($this->check_password($pword, $res['password'])){
                       $id = $res['id'];
                       $username = $res['username'];
                       $token = $this->generate_token($res['password']);
                       // $role = $res['stud_role'];
    
                       $code = 200;
                       $remarks = "success";
                       $message = "Logged in successfully.";
                       $payload = array("id"=>$id, "username"=>$username);
                        
                       return $this->gm->returnPayload($payload, $remarks, $message, $code);

                    }
                    else{
                        $code = 401;
                        $remarks = "failed";
                        $message = "Hello";
                        $payload = null;    
                    }
                }
                else {
                    $code = 401;
                    $remarks = "failed";
                    $message = "Invalid username or password.";
                    $payload = null;
                }
            }
            catch(Exception $e){
                $code = 401;
                $remarks = "failed";
                $message = "Invalid username or password.";
                $payload = null;
            }
            return $this->gm->returnPayload($payload, $remarks, $message, $code);
        }
    }
?>