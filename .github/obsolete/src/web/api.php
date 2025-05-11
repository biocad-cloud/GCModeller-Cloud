<?php

include __DIR__ . "/../framework/bootstrap.php";

/**
 * Module file for handling biostack data analysis API
*/
class app {

    const OSS        = "bioCAD_OSS";
    const OSSDefault = "D:/temp/";

    /**
     * @uses api
    */
    public function upload() {
        
        $file      = $_FILES["files"];
        $projID    = Utils::ReadValue($_GET, "project", -1);

        // 所上传的文件都被统一的放置在用户的文件池之中
        $user_id   = System::getUserId();        
        $yy = System\DateTime::year();
        $mm = System\DateTime::month();
        $dd = System\DateTime::day();
        $workspace = "/$user_id/data_files/$yy/$mm/$dd/";
        
        # echo var_dump($_FILES);
        # echo var_dump($workspace);

        # DATA/$workspace/{fileName}      
        $file_name  = $file["name"];
        $source     = $file["tmp_name"];	
        $directory  = DotNetRegistry::Read(api::OSS, api::OSSDefault) . $workspace;
        $uniqueName = Utils::RandomASCIIString(16);
        $suffix     = Utils::GetExtensionSuffix($file_name);
        $path       = "$directory/$uniqueName.dat";        
						
        if (strlen($file_name) == 0) {
            echo dotnet::errorMsg("FileName empty!");
            die;
        }

        if (!file_exists($directory)) {
            mkdir($directory, 0777, true);
        }
        if (file_exists($path)) {
            unlink($path);
        }

        # echo $source . "\n";
        # echo $path . "\n";

        move_uploaded_file($source, $path);

        if (!file_exists($path)) {
            echo dotnet::errorMsg("filesystem write permission denied!");
        } else {

            $uri = "$workspace/$uniqueName.dat"; 
            $uri = Strings::Replace($uri, "//", "/");

            # 文件上传成功了
            # 同时还需要添加数据库记录            
            $file = [
                "user_id"     => $user_id, 
                "name"        => $file_name, 
                "upload_time" => Utils::Now(), 
                "size"        => filesize($path), 
                "md5"         => md5_file($path),
                "uri"         => $uri,
                "suffix"      => $suffix
            ];
            
            $file_id = (new Table("data_files"))->add($file);

            if ($projID > -1) {
                $associate = [
                    "user_id"    => $user_id, 
                    "project_id" => $projID, 
                    "file_id"    => $file_id, 
                    "join_time"  => Utils::Now()
                ]; 
    
                (new Table("project_files"))->add($associate);
            }

            echo dotnet::successMsg("success!");
        }
    }



    
    /**
     * @uses api
    */
    public function new_project() {
        $user_id   = $_SESSION["user"]["id"];
        $project  = $_POST;
        $project["user_id"] = $user_id;
        $project["description"] = $project["note"];
        $project["create_time"] = Utils::Now();
        $project["workspace"] = "/";
        $projects = new Table("project");
        $type = $project["type"];

        $pid = $projects->add($project);
        $project["workspace"] = "/projects/$type/$user_id/$pid/";

        $projects->where(["id" => $pid])->save($project);

        echo dotnet::successMsg("Added!");
    }
}