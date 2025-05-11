<?php

define("MODEL_FILE_ACCESS_ERROR", "Sorry, the required model file is not existed in data repository or it does not under control in current user domain!");
define("RESULT_FILE_ACCESS_ERROR", "Sorry, the required result file is not existed in data repository or it does not under control in current user domain!");

/**
 * The data repository system of biocad.cloud platform
*/
class DataRepository {

    /**
     * @var Table
    */
    public $data_files;

    /**
     * @var DataRepository
    */
    private static $repo;

    function __construct() {
        $this->data_files = new Table("data_files");
    }

    /**
     * get model file info from database record
    */
    public static function getModelData($id, $checkUsr = TRUE) {
        if ($checkUsr) {
            return self::getRepo()->data_files
                ->where([
                    "id" => $id,
                    "user_id" => System::getUserId()
                ])
                ->find();
        } else {
            return self::getRepo()->data_files
                ->where([
                    "id" => $id                   
                ])
                ->find();
        }
    }

    public static function getMyModelFiles($page, $page_size = 25) {
        return self::getRepo()->data_files
            ->where(["user_id" => System::getUserId()])
            ->limit(($page - 1) * $page_size + 1, $page_size)
            ->select();
    }

    /**
     * get file path of the model file
     * 
     * @param string $id the model file id
     * @param string $version the model file version
    */
    public static function getModelFile($id, $version = NULL) {
        $file = self::getModelData($id);

        if (Utils::isDbNull($file)) {
            return NULL;
        } else {
            return $file["uri"] . "/" . (Strings::Empty($version, true) ? $file["current_version"] : $version) . ".json";
        }        
    }

    /**
     * 
     * 
     * @return returns the file id
    */
    public function addFile($name, $file, $info = "") {
        $suffix = end(explode(".", $name));

        return $this->data_files->add([
            "user_id" => System::getUserId(),
            "name" => $name,
            "suffix" => $suffix,
            "content_type" => 1,
            "uri" => $file,
            "size" => filesize($file),
            "upload_time" => Utils::Now(),
            "md5" => md5_file($file),
            "description" => $info
        ]);
    }

    /**
     * save the model file of the logged in user
     * 
     * @param $model the model object in json text
    */
    public function saveUserModel($model, $guid = NULL, $prefix = "flow_", $info = "") {
        $version = Utils::UnixTimeStamp();

        if (Utils::isDbNull($guid) || Strings::Empty($guid, true)) {
            # add new model file
            $dir   = bioCAD::getUserDir();
            $name  = $prefix . Utils::RandomASCIIString(6) . ".json";
            # Utils::RandomASCIIString(6) may generate duplicated id
            $uniqName = Utils::UnixTimeStamp();    
            $filepath = str_replace("//", "/", "{$dir}/{$uniqName}/{$version}.json");

            // due to the reason of write database record needs some file 
            // information, so we write file at first before write into db
            // save versioned model file
            FileSystem::WriteAllText($filepath, $model);

            $guid = $this->data_files->add([
                "user_id" => System::getUserId(),
                "name" => $name,
                "suffix" => "json",
                "content_type" => 1,
                "uri" => dirname($filepath),
                "size" => filesize($filepath),
                "current_version" => $version,
                "upload_time" => Utils::Now(),
                "md5" => md5_file($filepath),
                "description" => $info
            ]);
            $write = $guid;
        } else {
            # update current model version
            $filepath = self::getModelFile($guid);
            $dir = dirname($filepath);
            $filepath = str_replace("//", "/", "{$dir}/{$version}.json");

            // save versioned model file
            FileSystem::WriteAllText($filepath, $model);

            $write = $this->data_files->where(["id" => $guid])->save([
                "size" => filesize($filepath),
                "current_version" => $version,
                "upload_time" => Utils::Now(),
                "md5" => md5_file($filepath)
            ]);
        }              

        return [
            "guid" => $guid,
            "filepath" => $filepath,
            "write" => $write
        ];
    }

    public static function getLastMySql() {
        return self::getRepo()->data_files->getLastMySql();
    }

    /**
     * @return DataRepository
    */
    public static function getRepo() {
        if (Utils::isDbNull(self::$repo)) {
            self::$repo = new DataRepository();
        }

        return self::$repo;
    }

    /**
     * Check user has the acess right to the target file
     * 
     * @param $id the file id
     * 
     * @return boolean
    */
    public static function checkUserAccess($id) {
        if (Utils::isDbNull($id) || $id <= 0) {
            return true;
        } 

        $repo = self::getRepo();
        $file = $repo->data_files->where(["id" => $id])->find();

        if (Utils::isDbNull($file)) {
            return false;
        } else {
            return $file["user_id"] == System::getUserId();
        }
    }
}