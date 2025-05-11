<?php

include __DIR__ . "/../framework/bootstrap.php";

/**
 * Module file for handling HTML user interface
*/
class app {

	public function index() {
		Redirect("{index/apps}&test=false");
	}

	/*
		Session之中所保存的临时信息的数据结构大致如下：

		{
			user: {
				uid, name, email, role
			}, 
			settings: {
				anonymous_warning, notify_config
			}
		}
	
	*/

	/**
	 * 获取当前的用户的配置信息
	 * 
	 * @uses api
	*/ 
	public function getMySettings() {
		$config = $_SESSION["settings"];
		$config = json_encode($config);

		echo $config;
	}

	/**
	 * Analysis Projects
	 * 
	 * @uses view
	*/
    public function project($action = null) {		
		# 当前的页面的编号
		$page = $_COOKIE["project_page"];
		# 每一个分页的所显示的项目数量
		$pagen = 3;
		$start = 0;		

		if ($action) {

			if (!$page) {
				$page = 0;
			}

			if (Strings::LCase($action) == "next") {
				$page++;				
			} elseif (Strings::LCase($action) == "previous") {
				$page--;
			}

		} elseif (array_key_exists("page", $_GET)) {
			$page = Conversion::CInt($_GET["page"]);
		} else {
			# display current page
			# page = page
			if (!$page) {
				$page = 0;
			}
		}

		$start = $page * $pagen;
		# echo "$start = $page * $pagen";

		// select limit a,b;
		$projects = (new Table("project"))->select($start, $pagen);

		// 循环显示出来
		$template = View::Load("./html/Application/project_template.html");
		$projectlist = new StringBuilder();

		if ($projects) {
			foreach ($projects as $project) {
				$name = $project["name"];
				$projID = $project["id"];
				$project["name"] = "<a href='/app.php?app=explorer&project_id=$projID'>$name</a>";
				$projectlist->AppendLine(View::InterpolateTemplate($template, $project));
			}
		} else {
			$projectlist->AppendLine("No project avaliable!")
						->AppendLine("Goto your <a href='app.php?app=explorer'>file pool explorer</a>.");
		}

		setcookie("project_page", $page, time() + 1000000);

		$project_types = (new Table("project_types"))->all();

		$vars = ["projects" => $projectlist->ToString()];
		$vars["project_types"] = json_encode($project_types);
		$vars["breadcrumb"] = [
			["link" => "{index/apps}",  "icon" => "fa-project-diagram", "title" => "Applications"],
			["link" => "{app/project}", "icon" => "fa-project-diagram", "title" => "Projects"]
		];

		View::Display($vars);
    }

	/**
	 * File Explorer
	 * 
	 * @uses view
	*/
	public function explorer($project_id = -1) {		
		$user_id    = System::getUserId();	
        $types      = (new Table("content_types"))
            ->left_join("file_class")->on([
                "file_class"    => "classId", 
                "content_types" => "class"
            ])
			->select();
			
		if (!$project_id || $project_id === -1) {
			$project_id    = -1;
			$project_files = (new Table("data_files"))
				->where(["user_id" => $user_id])
				->select();
		} else {
			$project_files = (new Table("project_files"))
				->where(["project_id" => $project_id])
				->select();
			$project_files = Enumerable::Select($project_files, "file_id");
			$project_files = Strings::Join($project_files, ", ");
			$project_files = (new Table("data_files"))
				->where("`id` IN ($project_files)")
				->select();
		}

		$vars = [
			"project_id"   => $project_id,
			"user_id"      => $user_id,
			"files"        => json_encode($project_files),
			"bioClassType" => json_encode($types),
			"breadcrumb" => [
				["link" => "{index/apps}",  "icon" => "fa-project-diagram", "title" => "Applications"],
				["link" => "{app/explorer}", "icon" => "fa-project-diagram", "title" => "File Explorer"]
			]
		];

		View::Display($vars);
	}

	public function imports() {
		$vars = $_GET;
		$vars["title"] = "Imports files";

		View::Display($vars);
	}

	public function upload() {
		View::Display($_GET);
	}


	/**
	 * bioCAD Task
	 * 
	 * @uses view
	*/
    public function task() {
		$breadcrumb = [
			["link" => "{task/index}", "icon" => "fa-project-diagram", "title" => "Web Task"]
		];

        View::Display([
			"totals" => TaskMgr::getTaskTotalNumber(),
			"breadcrumb" => $breadcrumb
		]);
    }

    /**
	 * My Settings
	 * 
	 * @uses view
	*/
	public function me() {
		View::Display();
	}
}