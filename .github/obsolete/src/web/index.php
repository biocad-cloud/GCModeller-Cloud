<?php

include __DIR__ . "/../framework/bootstrap.php";

/**
 * 在这里的所有的页面都不需要进行身份验证	
*/
class app {
	
	/**
	 * bioCAD cloud platform
	 * 
	 * @access *
	 * @uses view
	*/
	public function index() {
		View::Display();
	}

	/**
	 * bioCAD Applications
	 * 
	 * @uses view
	*/
	public function apps() {		
		$breadcrumb = [
			["link" => "{index/apps}", "icon" => "fa-project-diagram", "title" => "Applications"]
		];

		View::Display(["breadcrumb" => $breadcrumb]);
	}

	/**
	 * Introduce Biostack
	 * 
	 * @access *
	 * @uses view
	*/
	public function biostack() {		
		View::Display();
	}

	/**
	 * About bioCAD
	 * 
	 * @access *
	 * @uses view
	*/
	public function about() {
		View::Display();
	}

	/**
	 * Privacy Policy
	 * 
	 * @access *
	 * @uses view
	*/
	public function privacy_policy() {		
		View::Display();
	}

	/**
	 * Terms of Use for bioCAD
	 * 
	 * @access *
	 * @uses view
	*/
	public function terms_of_use() {
		View::Display();
	}

	/**
	 * Search Result
	 * 
	 * @uses view
	*/
	public function search($q) {		
		$result = "";

		if (!$q) {
			$result = "No term provided!";
		} else {
			$result = $this->searchInternal($q);
		}
			
		View::Display([			
			"result" => $result
		]);
	}

	/*
	 * 根据所给定的词条返回在整个网站内的通用的搜索结果
	 */
	private function searchInternal($term) {
		$result_list = "";		
		
		return View::Load("./html/search_result.html", 
			[
				"list" => $result_list, 
				"term" => $term
			]);
	}

	/**
	 * bioCAD changelog
	 * 
	 * @access *
	 * @uses view
	*/
	public function change_log() {		
		View::Display();
	}

	/**
	 * 
	*/
	public function phpinfo() {
		echo \phpinfo();
	}
}