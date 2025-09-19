<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('history_updates', function (Blueprint $table) {
            $table->id();
            $table->datetime('waktu_update');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->text('keterangan');
            $table->timestamps();
            
            $table->index('waktu_update');
            $table->index(['user_id', 'waktu_update']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('history_updates');
    }
};