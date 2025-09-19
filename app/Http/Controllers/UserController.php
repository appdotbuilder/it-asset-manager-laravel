<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Only admin can access user management
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }

        $query = User::query();

        // Apply search filter
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('username', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Apply role filter
        if ($request->has('role') && $request->role) {
            $query->where('role', $request->role);
        }

        $users = $query->withCount('assets')
                      ->latest()
                      ->paginate(15);

        return Inertia::render('users/index', [
            'users' => $users,
            'filters' => $request->only(['search', 'role']),
            'roles' => ['admin', 'user'],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Only admin can create users
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }

        return Inertia::render('users/create', [
            'roles' => ['admin', 'user'],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        // Only admin can create users
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }

        $user = User::create($request->validated());

        return redirect()->route('users.show', $user)
            ->with('success', 'User created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        // Only admin can view user details
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }

        $user->load(['assets' => function ($query) {
            $query->with(['kategoriBarang', 'site', 'areaPosisi']);
        }]);

        return Inertia::render('users/show', [
            'user' => $user,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        // Only admin can edit users
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }

        return Inertia::render('users/edit', [
            'user' => $user,
            'roles' => ['admin', 'user'],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        // Only admin can update users
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }

        $validatedData = $request->validated();

        // Only update password if provided
        if (empty($validatedData['password'])) {
            unset($validatedData['password']);
        }

        $user->update($validatedData);

        return redirect()->route('users.show', $user)
            ->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        // Only admin can delete users
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }

        // Don't allow deleting the current user
        if ($user->id === auth()->id()) {
            return redirect()->route('users.index')
                ->with('error', 'You cannot delete your own account.');
        }

        // Check if user has assigned assets
        if ($user->assets()->count() > 0) {
            return redirect()->route('users.index')
                ->with('error', 'Cannot delete user with assigned assets. Please reassign or remove assets first.');
        }

        $user->delete();

        return redirect()->route('users.index')
            ->with('success', 'User deleted successfully.');
    }
}