<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PortfolioContent;
use Illuminate\Http\Request;

class PortfolioContentController extends Controller
{
    public function show()
    {
        $record = PortfolioContent::query()
            ->where('slug', 'default')
            ->first();

        return response()->json($record?->content ?? []);
    }

    public function update(Request $request)
    {
        \Log::info('as portfolio content update', [
            'payload' => $request->all(),
            'raw' => $request,
        ]);       
         $payload = $request->json()->all();
        if (empty($payload)) {
            $raw = $request->getContent();
            $decoded = json_decode($raw, true);
            $payload = is_array($decoded) ? $decoded : $request->all();
        }
        \Log::info('Received portfolio content update', [
            'payload' => $payload,
            'raw' => $request->getContent(),
            'content_type' => $request->header('Content-Type'),
        ]);
        $content = (isset($payload['content']) && is_array($payload['content']))
            ? $payload['content']
            : $payload;
        \Log::info('Updating portfolio content', ['content' => $content]);
        $record = PortfolioContent::updateOrCreate(
            ['slug' => 'default'],
            ['content' => $content]
        );

        return response()->json($record->content);
    }
}
