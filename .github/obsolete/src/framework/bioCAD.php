<?php

imports("Microsoft.VisualBasic.FileIO.FileSystem");

/**
 * A data directory that contains the user files, examples
 * as expression matrix files, system model files which are
 * created by biocad users.
*/
define("DATA_STORE", "/mnt/biocad_cloud/");

class bioCAD {

    /**
     * get the root dir for current user to store data files.
     * 
     * @return the current php session id will be used as unique
     *    id if the user is not login.
    */
    public static function getUserDir() {
        $id = System::getUserId();

        if ($id > 0) {
            // is login user
            // save in ossfs
            $dir = DATA_STORE;
            $dir = "$dir/${id}/";
        } else {
            // is anonymous user, save in /tmp
            // current session id as key
            $ssid = session_id();
            $dir = "/tmp/anonymous/$ssid/";
        }

        FileSystem::CreateDirectory($dir);

        return $dir;
    }
}