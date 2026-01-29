<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
class AdminAuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        $token = $user->createToken('admin-token')->plainTextToken;
        return response()->json([
            'token' => $token,
        ]);
    }

    public function profile(Request $request)
    {
        \Log::info('Admin profile request', [
            'bearer' => $request->bearerToken(),
            'user_id' => optional($request->user())->id,
        ]);
        return response()->json($request->user());
    }

    public function updateProfile(Request $request)
    {
        \Log::info('Updating admin profile payload', [
            'payload' => $request->json()->all(),
            'bearer' => $request->bearerToken(),
            'user_id' => optional($request->user())->id,
        ]);
        $user = $request->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($user->id),
            ],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
        ]);

        $user->name = $validated['name'];
        $user->email = $validated['email'];

        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        return response()->json($user);
    }
}
