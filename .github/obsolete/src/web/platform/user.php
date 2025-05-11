<?php

include __DIR__ . "/../../framework/bootstrap.php";

define("CredentialVerifyError", "User not found or invalid credential information provided!");

/**
 * 网站用户API模块
*/
class app {

    /**
     * the user table
     * 
     * @var Table
    */
    private $user;

    function __construct() {
        $this->user = new Table("user");
    }

    /**
     * 用户登录验证
     * 
     * @access *
     * @uses api
     * @method POST
    */ 
    public function login($account, $password) {
        // {account/email, password_md5}
        // account或者account都应该是唯一的，所以在这里查找出来的用户信息也应该是唯一的
        $user = $this->user->where(["email|account" => strtolower($account)])->find();

        if (Utils::isDbNull($user) || $user["password"] != $password) {
            # 没有找到对应的记录
            controller::error(CredentialVerifyError, -1, $this->user->getLastMySql());                  
        } else if ($user["status"] == 0) {
            controller::error("User not actived yet!");            
        } else if ($user["status"] == 403) {
            controller::error("User banned!");            
        } else {
            // 向session之中写入用户的记录信息，然后返回成功消息
            $_SESSION["user"]     = $user;
            $_SESSION["settings"] = self::GetUserSettings($user["id"]);

            controller::success("success");
        }
    }

    /**
     * 从数据库之中读取用户的配置数据信息 
    */ 
    private static function GetUserSettings($user_id) {
        $configs = new Table("user_settings");
        $settings = $configs->where(["user_id" => $user_id])->find();

        if (!$settings) {

            # 没有从数据库之中找到对应的配置信息？？？
            # 则加载默认的用户配置信息数据，然后保存到数据库之中
            $settings = include "../etc/default_user_settings.php";
            $settings["user_id"] = $user_id;

            $configs->add($settings);
        }

        return $settings;
    }
    
    /**
     * User register api
     * 
     * @access *
     * @uses api
     * @method POST
    */
    public function register($username, $email, $password) {
        $id = (new Table("user"))->add([
            "account"     => $username,
            "email"       => $email, 
            "password"    => $password,
            "role"        => 0,
            "status"      => 0,
            "create_time" => Utils::Now()
        ]);

        if (!Utils::isDbNull($id)) {
            controller::success("add=$id!");
        } else {
            controller::error("Not working!");
        }        
    }

    /**
     * User modify password
     * 
     * @uses api
     * @method POST
    */
    public function modifyPassword() {
        $user     = $_SESSION["password"];
        $password = $_POST["password"];

        if (!$user || $user["password"] != $password) {
            controller::error(CredentialVerifyError);
            die;
        } else {
            # 发送电子邮件
            $email = $user["email"];
        }
    }

    // 允许用户进行匿名登陆，使用cookie来记录session的编号而获取服务器的计算资源
    // 在这个函数之中为用户初始化后台的session的数据记录信息
    public function anonymous_login() {

    }

    /**
     * logout
     * 
     * 清除session信息之后对用户进行重定向至首页
     * 
     * @access *
     * @uses api
    */
    public function logout() {    
        $_SESSION["user"]     = NULL;
        $_SESSION["settings"] = NULL;

        unset($_SESSION);
        session_destroy();

        Redirect("/");        
    }

    /**
     * Confirm cookie
     * 
     * @access *
     * @uses api
     * @method POST
    */
    public function dataprotection() {
        $_SESSION["dismiss_banner"] = "true";
        controller::success("dismiss");
    }
}