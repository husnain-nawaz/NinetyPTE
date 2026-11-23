<?php
/**
 * Hostinger Shared MySQL Sharded Connection Pool & Router
 * NinetyPTE API Backend
 * 
 * Routes queries to 10 distinct Hostinger MySQL databases based on entity / user shard.
 */

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

class HostingerDbRouter {
    private static $connections = [];

    // Base Hostinger credentials
    private static $host = 'localhost';
    private static $user = 'u123456_ninetypte_root';
    private static $pass = 'YOUR_HOSTINGER_SECURE_PASSWORD';

    // 10 Sharded Database Names
    private static $databases = [
        'auth'        => 'u123456_ninetypte_auth',
        'speaking'    => 'u123456_ninetypte_qb_speaking',
        'writing'     => 'u123456_ninetypte_qb_writing',
        'reading'     => 'u123456_ninetypte_qb_reading',
        'listening'   => 'u123456_ninetypte_qb_listening',
        'attempts_1'  => 'u123456_ninetypte_attempts_1', // Users 1 to 50,000
        'attempts_2'  => 'u123456_ninetypte_attempts_2', // Users 50,001+
        'mock_tests'  => 'u123456_ninetypte_mock_tests',
        'tools'       => 'u123456_ninetypte_tools_analytics',
        'community'   => 'u123456_ninetypte_community'
    ];

    /**
     * Resolves PDO connection for specific shard
     */
    public static function getConnection($shardKey) {
        if (!isset(self::$databases[$shardKey])) {
            throw new Exception("Invalid DB Shard: " . $shardKey);
        }

        if (!isset(self::$connections[$shardKey])) {
            $dbName = self::$databases[$shardKey];
            $dsn = "mysql:host=" . self::$host . ";dbname=" . $dbName . ";charset=utf8mb4";
            
            self::$connections[$shardKey] = new PDO($dsn, self::$user, self::$pass, [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ]);
        }

        return self::$connections[$shardKey];
    }

    /**
     * Helper to resolve attempts shard by user ID
     */
    public static function getAttemptsConnection($userId) {
        $shard = ($userId <= 50000) ? 'attempts_1' : 'attempts_2';
        return self::getConnection($shard);
    }
}

// Simple Router Example
$action = $_GET['action'] ?? 'health';

try {
    if ($action === 'health') {
        echo json_encode([
            'status' => 'online',
            'provider' => 'Hostinger Shared Hosting (MySQL)',
            'shards' => 10,
            'max_db_size_mb' => 3072,
            'timestamp' => date('c')
        ]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
