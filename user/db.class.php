<?php
/**
 * 数据库操作类
 */


class DB {
    private $link_id;
    private $handle;    //日志文件句柄
    private $is_log;
    private $time;


    public function __construct() {
        $db_config = array
        (
            'hostname' => 'localhost',
            'username' => 'root',
            'password' => '123456',
            'database' => 'child_games',
            'charset' => 'utf8',
            'pconnect' => 0,                    //是否使用持久连接(0关/1开)
            'log' => 1,                            //是否开启日志(0关/1开)
            'logfilepath' => './'                //日志文件目录
        );
        header("Content-type: text/html; charset=utf-8");
        $this->time = $this->microtime_float();
        $this->connect($db_config["hostname"], $db_config["username"], $db_config["password"], $db_config["database"], $db_config["pconnect"]);
        $this->is_log = $db_config["log"];
        if($this->is_log){
            $this->handle = fopen($db_config["logfilepath"] . "dblog.txt", "a+");
        }
    }

    /**
     * 连接数据库
     */
    public function connect($dbhost, $dbuser, $dbpw, $dbname, $pconnect = 0, $charset ='utf8') {
        if($pconnect == 0){
            $this->link_id = mysql_connect($dbhost, $dbuser, $dbpw, true);
            if(!$this->link_id){
                $this->halt("数据库连接失败");
            }
        }else{
            $this->link_id = mysql_pconnect($dbhost, $dbuser, $dbpw);
            if(!$this->link_id){
                $this->halt("数据库长连接失败");
            }
        }
        if(!mysql_select_db($dbname, $this->link_id)){
            $this->halt("数据库选择失败");
        }
        mysql_query("set names " . $charset);
    }

    /**
     * 查询
     * Enter description here ...
     * param unknown_type $sql
     */
    public function query($sql){
        $this->write_log("查询 " . $sql);
        $query = mysql_query($sql, $this->link_id);
        if(!$query){
            $this->halt("查询失败 " . $sql);
        }
        return $query;
    }

    /**
     * 获取一条记录（MYSQL_ASSOC，MYSQL_NUM，MYSQL_BOTH）
     * Enter description here ...
     * param $sql
     */
    public function get_one($sql, $result_type = MYSQL_ASSOC){
        $query = $this->query($sql);
        $rt = mysql_fetch_array($query, $result_type);
        $this->write_log("获取一条记录 " . $sql);
        return $rt;
    }

    /**
     * 获取全部记录
     * Enter description here ...
     * param unknown_type $sql
     * param unknown_type $result_type
     */
    public function get_all($sql, $is_page = false, $page_num = 10, $result_type = MYSQL_ASSOC){
        if(!$is_page){
            $query = $this->query($sql);
            $i = 0;
            $rt = array();
            while ($row = mysql_fetch_array($query, $result_type))
            {
                $rt[$i++] = $row;
            }
            $this->write_log("获取全部记录（无翻页）" . $sql);
        }else{
            $rt = $this->page($sql, $page_num, $result_type);
        }


        return $rt;
    }

    /**
     * 获取全部数据（带翻页）
     * Enter description here ...
     * param $sql            sql语句
     * param $page_num        每页显示记录条数
     */
    public function page($sql, $page_num, $result_type){
        session_start();
        $query = $this->query($sql);
        $all_num = mysql_num_rows($query);                    //总条数
        $page_all_num = ceil($all_num / $page_num);            //总页数
        $page = empty($_GET['page']) ? 1 : $_GET['page'];    //当前页数
        $page = (int)$page;                                    //安全强制转换
        $limit_str = ($page - 1) * $page_num;                //记录起始数

        $sql .= " limit $limit_str, $page_num";
        $query = $this->query($sql);
        $i = 0;
        $rt = array();
        while ($row = mysql_fetch_array($query, $result_type))
        {
            $rt[$i++] = $row;
        }
        $this->write_log("获取翻页记录（带翻页）" . $sql);
        $_SESSION["page_all_num"] = $page_all_num;
        $_SESSION["next"] = $page >= $page_all_num ? $page_all_num : $page + 1;
        $_SESSION["pre"] = $page <= 1 ? 1 : $page - 1;
        return $rt;
    }

    /**
     * 插入
     * Enter description here ...
     * param unknown_type $table
     * param unknown_type $dataArray
     */
    public function insert($table,$dataArray) {
        $field = "";
        $value = "";
        if( !is_array($dataArray) || count($dataArray) <= 0) {
            $this->halt('没有要插入的数据');
            return false;
        }
        foreach ($dataArray as $key => $val){
            $field .="$key,";
            $value .="'$val',";
        }

        $field = substr( $field,0,-1);
        $value = substr( $value,0,-1);
        $sql = "insert into $table($field) values($value)";
        $this->write_log("插入 ".$sql);
        if(!$this->query($sql)) return false;
        return true;
    }

    /**
     * 更新
     * Enter description here ...
     * param unknown_type $table
     * param unknown_type $dataArray
     * param unknown_type $condition
     */
    public function update( $table,$dataArray,$condition="") {
        if( !is_array($dataArray) || count($dataArray)<=0) {
            $this->halt('没有要更新的数据');
            return false;
        }
        $value = "";
        while( list($key,$val) = each($dataArray))
            $value .= "$key = '$val',";
        $value .= substr( $value,0,-1);
        $sql = "update $table set $value where 1=1 and $condition";
        $this->write_log("更新 ".$sql);
        if(!$this->query($sql)) return false;
        return true;
    }

    /**
     * 删除
     * Enter description here ...
     * param unknown_type $table
     * param unknown_type $condition
     */
    public function delete( $table,$condition="") {
        if( empty($condition) ) {
            $this->halt('没有设置删除的条件');
            return false;
        }
        $sql = "delete from $table where 1=1 and $condition";
        $this->write_log("删除 ".$sql);
        if(!$this->query($sql)) return false;
        return true;
    }

    /**
     * 返回结果集
     * Enter description here ...
     * param unknown_type $query
     * param unknown_type $result_type
     */
    public function fetch_array($query, $result_type = MYSQL_ASSOC){
        $this->write_log("返回结果集");
        return mysql_fetch_array($query, $result_type);
    }

    /**
     * 获取记录条数
     * Enter description here ...
     * param unknown_type $results
     */
    public function num_rows($results) {
        if(!is_bool($results)) {
            $num = mysql_num_rows($results);
            $this->write_log("获取的记录条数为".$num);
            return $num;
        } else {
            return 0;
        }
    }

    /**
     * 获取最后插入的id
     * Enter description here ...
     */
    public function insert_id() {
        $id = mysql_insert_id($this->link_id);
        $this->write_log("最后插入的id为".$id);
        return $id;
    }

    /**
     * 关闭数据库连接
     * Enter description here ...
     */
    public function close() {
        $this->write_log("已关闭数据库连接");
        return @mysql_close($this->link_id);
    }

    /**
     * 错误提示
     */
    private function halt($msg = ''){
        $msg .= "\r\n" . mysql_error();
        $this->write_log($msg);
        die($msg);
    }

    /**
     * 写入日志文件
     */
    public function write_log($msg = ''){
        if($this->is_log){
            $text = date("Y-m-d H:i:s") . " " . $msg . "\r\n";
            fwrite($this->handle, $text);
        }
    }

    /**
     * 获得毫秒数
     */
    public function microtime_float() {
        list($usec, $sec) = explode(" ", microtime());
        return ((float)$usec + (float)$sec);
    }

    /**
     * 析构函数
     * Enter description here ...
     */
    public function __destruct(){
        $use_time = ($this->microtime_float()) - ($this->time);
        $this->write_log("完成整个查询任务，所用时间为 " . $use_time);
        if($this->is_log){
            fclose($this->handle);
        }
    }
}
?>
