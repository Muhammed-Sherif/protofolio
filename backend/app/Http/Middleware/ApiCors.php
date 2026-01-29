<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiCors
{
    public function handle(Request $request, Closure $next): Response
    {
        $origin = $request->headers->get('Origin');
        $allowed = [
            'http://localhost:5173',
            'http://127.0.0.1:5173',
        ];

        $allowOrigin = in_array($origin, $allowed, true) ? $origin : '*';

        if ($request->getMethod() === 'OPTIONS') {
            return response('', 204)->withHeaders($this->headers($allowOrigin));
        }

        $response = $next($request);
        foreach ($this->headers($allowOrigin) as $key => $value) {
            $response->headers->set($key, $value);
        }

        return $response;
    }

    private function headers(string $origin): array
    {
        return [
            'Access-Control-Allow-Origin' => $origin,
            'Access-Control-Allow-Methods' => 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
            'Access-Control-Allow-Headers' => 'Content-Type, Authorization, Accept',
            'Access-Control-Allow-Credentials' => 'true',
        ];
    }
}
